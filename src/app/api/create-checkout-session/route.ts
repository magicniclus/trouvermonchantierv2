import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request) {
  try {
    // Vérifier si le corps de la requête est vide
    const text = await req.text();
    if (!text) {
      return NextResponse.json(
        { error: "Le corps de la requête est vide" },
        { status: 400 }
      );
    }

    // Parser le JSON avec gestion d'erreur
    let body;
    try {
      body = JSON.parse(text);
    } catch (e) {
      return NextResponse.json(
        { error: "Format JSON invalide" },
        { status: 400 }
      );
    }

    // Vérifier si priceId est présent
    const { priceId } = body;
    if (!priceId) {
      return NextResponse.json(
        { error: "priceId est requis" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/pricing`,
      automatic_tax: { enabled: true },
      billing_address_collection: "required",
      customer_email: undefined, // L'email sera fourni par le client dans le formulaire Stripe
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Erreur lors de la création de la session:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}