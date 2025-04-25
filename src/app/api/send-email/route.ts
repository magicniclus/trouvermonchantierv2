import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

// Initialiser l'API SendGrid avec la clé API
const apiKey = process.env.SENDGRID_API_KEY || "";
sgMail.setApiKey(apiKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, companyName, email, phone, metier } = body;

    // Validation des données
    if (!name || !companyName || !email || !phone || !metier) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Enregistrer les informations dans les logs pour s'assurer que les données sont capturées
    console.log("Informations du prospect:", {
      timestamp: new Date().toISOString(),
      name,
      companyName,
      email,
      phone,
      metier,
    });

    // Définir les adresses email
    const fromEmail = "contact@maprimerenov-info.org";
    const toEmails = ["casteranicolas.contact@gmail.com"];

    // Créer le contenu de l'email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h1 style="color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Nouveau prospect - Trouver Mon Chantier</h1>
        
        <div style="margin: 20px 0;">
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Entreprise :</strong> ${companyName}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone}</p>
          <p><strong>Métier :</strong> ${metier}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p style="margin: 0; color: #666;">Ce prospect a été enregistré le ${new Date().toLocaleDateString(
            "fr-FR"
          )} à ${new Date().toLocaleTimeString("fr-FR")}.</p>
        </div>
      </div>
    `;

    try {
      // Essayer d'envoyer l'email avec l'adresse d'expéditeur spécifiée
      const msg = {
        to: toEmails,
        from: fromEmail,
        subject: `Nouveau prospect: ${name} - ${metier}`,
        html: htmlContent,
        text: `Nouveau prospect - Nom: ${name}, Entreprise: ${companyName}, Email: ${email}, Téléphone: ${phone}, Métier: ${metier}`,
      };

      await sgMail.send(msg);
      console.log(
        "Email envoyé avec succès depuis",
        fromEmail,
        "vers",
        toEmails
      );

      return NextResponse.json(
        { success: true, message: "Email envoyé avec succès" },
        { status: 200 }
      );
    } catch (sendError: any) {
      console.error("Erreur SendGrid:", sendError?.response?.body || sendError);

      // Afficher les détails complets de l'erreur pour le débogage
      if (sendError?.response?.body) {
        console.error(
          "Détails de l'erreur SendGrid:",
          JSON.stringify(sendError.response.body, null, 2)
        );
      }

      // Même en cas d'erreur, retourner un succès pour ne pas bloquer l'utilisateur
      // Les données sont déjà enregistrées dans les logs
      return NextResponse.json(
        { success: true, message: "Informations enregistrées avec succès" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Erreur lors du traitement de la requête:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors du traitement de la requête",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
