/**
 * Type pour les données du prospect
 */
export type ProspectData = {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  postalCode: string;
  metier: string;
};

/**
 * Envoie un email de notification pour un nouveau prospect en utilisant l'API route
 * @param data Les données du prospect
 * @returns Promise<boolean> Indique si l'email a été envoyé avec succès
 */
export const sendProspectNotification = async (data: ProspectData): Promise<boolean> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Erreur lors de l\'envoi de l\'email:', result.error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
};
