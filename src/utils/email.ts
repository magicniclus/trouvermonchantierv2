import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY!);

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailData) {
  try {
    await sgMail.send({
      to,
      from: 'contact@trouvermonchantier.fr',
      subject,
      html,
    });
    return { success: true };
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return { success: false, error: error.message };
  }
}

export function generateInvoiceEmail(data: {
  name: string;
  amount: number;
  date: string;
  invoiceNumber: string;
}) {
  return `
    <h1>Facture - Trouver Mon Chantier</h1>
    <p>Bonjour ${data.name},</p>
    <p>Merci pour votre achat. Voici votre facture :</p>
    <div style="margin: 20px 0; padding: 20px; border: 1px solid #ddd;">
      <p><strong>Numéro de facture :</strong> ${data.invoiceNumber}</p>
      <p><strong>Date :</strong> ${data.date}</p>
      <p><strong>Montant :</strong> ${data.amount}€</p>
    </div>
    <p>Nous vous remercions de votre confiance.</p>
    <p>L'équipe Trouver Mon Chantier</p>
  `;
}

export function generateCredentialsEmail(data: {
  name: string;
  email: string;
  password: string;
}) {
  return `
    <h1>Vos identifiants de connexion - Trouver Mon Chantier</h1>
    <p>Bonjour ${data.name},</p>
    <p>Voici vos identifiants de connexion à votre espace personnel :</p>
    <div style="margin: 20px 0; padding: 20px; border: 1px solid #ddd;">
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Mot de passe temporaire :</strong> ${data.password}</p>
    </div>
    <p>Pour des raisons de sécurité, nous vous conseillons de changer votre mot de passe dès votre première connexion.</p>
    <p>Vous recevrez prochainement un email pour réinitialiser votre mot de passe.</p>
    <p>L'équipe Trouver Mon Chantier</p>
  `;
}
