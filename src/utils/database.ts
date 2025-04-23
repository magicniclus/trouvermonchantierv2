import { database } from "@/firebase/firebase.config";
import { ref, set } from "firebase/database";

interface ZoneIntervention {
  city: string;
  postal_code: string;
  radius_km: number;
}

interface Domain {
  custom_domain: string;
  ssl_status: string;
}

interface Colors {
  primary: string;
  secondary: string;
}

interface Customization {
  company_name: string;
  legal_name: string;
  activity_sector: string;
  description: string;
  zone_intervention: ZoneIntervention;
  domain: Domain;
  logo_url: string;
  has_logo: boolean;
  colors: Colors;
  images_uploaded: string[];
  certifications: string[];
  created_at: string;
  updated_at: string;
}

interface ClientData {
  email: string;
  payment_status: string;
  created_at: string;
  subscription_active: boolean;
  subscription_start: string;
  subscription_end: string;
  site_status: string;
  google_ads_status: string;
  onboarding_completed: boolean;
  last_update: string;
  contact_support_needed: boolean;
}

export async function createClientInDatabase(clientId: string, email: string) {
  const now = new Date().toISOString();
  
  // Données du client
  const clientData: ClientData = {
    email,
    payment_status: "completed",
    created_at: now,
    subscription_active: true,
    subscription_start: now,
    subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // +30 jours
    site_status: "pending",
    google_ads_status: "pending",
    onboarding_completed: false,
    last_update: now,
    contact_support_needed: false
  };

  // Données de personnalisation initiales
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
      ssl_status: "pending"
    },
    logo_url: "",
    has_logo: false,
    colors: {
      primary: "#0B1424",
      secondary: "#BF522A"
    },
    images_uploaded: [],
    certifications: [],
    created_at: now,
    updated_at: now
  };

  try {
    // Créer les données du client
    const clientRef = ref(database, `clients/${clientId}`);
    await set(clientRef, clientData);

    // Créer les données de personnalisation
    const customizationRef = ref(database, `clients/${clientId}/customizations/initial`);
    await set(customizationRef, customizationData);

    return { success: true };
  } catch (error: any) {
    console.error("Erreur lors de la création des données client:", error);
    return { success: false, error: error.message };
  }
}
