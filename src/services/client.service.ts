import { db } from "@/firebase/firebase.config";
import { Client, Customization } from "@/types/client";
import { collection, doc, setDoc } from "firebase/firestore";

export const initializeClientData = async (userId: string, email: string) => {
  console.log("Starting initializeClientData with:", { userId, email });
  try {
    const now = new Date().toISOString();

    // Initialize client document
    const clientData: Client = {
      email,
      payment_status: "completed",
      created_at: now,
      subscription_active: true,
      subscription_start: now,
      subscription_end: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ).toISOString(), // +1 mois
      site_status: "pending",
      google_ads_status: "pending",
      onboarding_completed: false,
      last_update: now,
      contact_support_needed: false,
    };

    // Initialize customization document
    const customizationData: Customization = {
      company_name: "",
      legal_name: "",
      activity_sector: "",
      description: "",

      zone_intervention: {
        city: "",
        postal_code: "",
        radius_km: 0
      },

      domain: {
        custom_domain: "",
        ssl_status: ""
      },

      logo_url: "",
      has_logo: false,

      colors: {
        primary: "",
        secondary: ""
      },
      images_uploaded: [],
      certifications: [],
      created_at: now,
      updated_at: now,
    };

    console.log("Client data prepared:", clientData);
    console.log("Customization data prepared:", customizationData);

    // Créer le document client
    console.log("Creating client document...");
    const clientRef = doc(db, "clients", userId);
    await setDoc(clientRef, clientData);
    console.log("Client document created successfully");

    // Créer le document de personnalisation
    console.log("Creating customization document...");
    const customizationsRef = collection(db, "clients", userId, "customizations");
    await setDoc(doc(customizationsRef, "default"), customizationData);
    console.log("Customization document created successfully");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'initialisation des données client:", error);
    console.error("Stack trace:", error instanceof Error ? error.stack : "No stack trace");
    return { success: false, error };
  }
};
