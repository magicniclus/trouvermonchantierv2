import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialiser Stripe avec la clé secrète
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, email, metadata } = body;

    if (!amount || !email) {
      return NextResponse.json(
        { error: "Le montant et l'email sont requis" },
        { status: 400 }
      );
    }

    // Créer ou récupérer le client Stripe
    const customers = await stripe.customers.list({ email });
    let customer = customers.data[0];

    if (!customer) {
      customer = await stripe.customers.create({
        email,
        metadata: {
          name: metadata?.name || "",
          companyName: metadata?.companyName || "",
        },
      });
    }

    // Créer l'intention de paiement
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir en centimes
      currency: "eur",
      customer: customer.id,
      metadata: {
        ...metadata,
        type: "client_payment",
      },
      description: `Paiement pour ${metadata?.companyName || email} - ${metadata?.tier || "Abonnement"}`,
      receipt_email: email,
      payment_method_types: ["card"],
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error("Erreur lors de la création de l'intention de paiement:", error);
    return NextResponse.json(
      {
        error: error.message || "Une erreur est survenue lors de la création de l'intention de paiement",
      },
      { status: 500 }
    );
  }
}
