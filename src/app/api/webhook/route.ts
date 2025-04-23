import { headers } from "next/headers";
import Stripe from "stripe";
import { createFirebaseUser } from "@/utils/auth";
import { sendEmail, generateInvoiceEmail, generateCredentialsEmail } from "@/utils/email";
import { createClientInDatabase } from "@/utils/database";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      // Créer l'utilisateur dans Firebase
      const { user, password, success, error } = await createFirebaseUser(session.customer_email!);
      
      if (!success) {
        throw new Error(error);
      }

      // Créer les données du client dans la base de données
      const dbResult = await createClientInDatabase(user!.uid, session.customer_email!);
      
      if (!dbResult.success) {
        throw new Error(dbResult.error);
      }

      // Générer le numéro de facture
      const invoiceNumber = `TMC-${Date.now()}`;
      
      // Envoyer l'email de facture
      await sendEmail({
        to: session.customer_email!,
        subject: "Votre facture Trouver Mon Chantier",
        html: generateInvoiceEmail({
          name: session.customer_details?.name || "",
          amount: session.amount_total! / 100,
          date: new Date().toLocaleDateString("fr-FR"),
          invoiceNumber,
        }),
      });

      // Envoyer l'email avec les identifiants
      await sendEmail({
        to: session.customer_email!,
        subject: "Vos identifiants de connexion - Trouver Mon Chantier",
        html: generateCredentialsEmail({
          name: session.customer_details?.name || "",
          email: session.customer_email!,
          password: password!,
        }),
      });

      return new Response(JSON.stringify({ received: true }), { status: 200 });
    } catch (error: any) {
      console.error("Error processing webhook:", error);
      return new Response(
        JSON.stringify({ error: "Error processing webhook" }),
        { status: 500 }
      );
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
