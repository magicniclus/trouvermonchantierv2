import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { generateSecurePassword } from "@/utils/passwordGenerator";
import { sendCredentialsEmail } from "@/utils/sendEmail";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(request: Request) {
  try {
    const { paymentMethodId, email } = await request.json();

    // Créer ou récupérer le client
    const customers = await stripe.customers.list({ email });
    let customer = customers.data[0];

    if (!customer) {
      customer = await stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    // Attacher la méthode de paiement au client (clé !)
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // S'assurer que la méthode est bien par défaut
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Créer un paiement unique de 99€
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 9900,
      currency: "eur",
      customer: customer.id,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
      description: "Création du site web",
    });

    // Créer l'abonnement avec 30 jours d'essai
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: "price_1RH43wGSRUSi3pCUgwepYiJ9" }],
      trial_period_days: 30,
      default_payment_method: paymentMethodId,
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      collection_method: "charge_automatically",
      metadata: {
        type: "abonnement_mensuel_starter",
      },
    });

    // Générer un mot de passe sécurisé
    const password = generateSecurePassword();

    // Créer le compte Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Envoyer les identifiants par email
    try {
      await sendCredentialsEmail(email, password);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      // On continue même si l'email échoue
    }

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      requiresAction:
        paymentIntent.status === "requires_action" ||
        paymentIntent.status === "requires_confirmation",
      // Envoyer les identifiants au client
      credentials: {
        email,
        password,
        uid: userCredential.user.uid
      }
    });
  } catch (error: any) {
    console.error("Erreur lors de la création de l'abonnement:", error);
    return NextResponse.json(
      {
        error:
          error.message ||
          "Une erreur est survenue lors de la création de l'abonnement.",
      },
      { status: 500 }
    );
  }
}
