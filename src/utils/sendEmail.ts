import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendCredentialsEmail(userEmail: string, password: string) {
  const msg = {
    to: userEmail,
    from: {
      email: 'contact@maprimerenov-info.org',
      name: 'trouver-mon-chantier.fr'
    },
    subject: 'Vos identifiants de connexion - trouver-mon-chantier.fr',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb; margin-bottom: 24px;">Bienvenue sur trouver-mon-chantier.fr !</h1>
        
        <p style="margin-bottom: 16px;">Votre compte a été créé avec succès. Voici vos identifiants de connexion :</p>
        
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
          <p style="margin: 8px 0;"><strong>Email :</strong> ${userEmail}</p>
          <p style="margin: 8px 0;"><strong>Mot de passe :</strong> ${password}</p>
        </div>
        
        <p style="margin-bottom: 16px; color: #ef4444;">Important : Pour des raisons de sécurité, nous vous recommandons de changer votre mot de passe dès votre première connexion.</p>
        
        <p style="margin-bottom: 24px;">Pour vous connecter, rendez-vous sur <a href="https://trouver-mon-chantier.fr/login" style="color: #2563eb;">notre page de connexion</a>.</p>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; color: #6b7280; font-size: 14px;">
          <p>Si vous n'êtes pas à l'origine de cette demande, veuillez nous contacter immédiatement.</p>
          <p style="margin-top: 8px;">L'équipe trouver-mon-chantier.fr</p>
        </div>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }
}
