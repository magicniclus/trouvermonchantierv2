export interface Client {
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

export interface ZoneIntervention {
  city: string;
  postal_code: string;
  radius_km: number;
}

export interface Domain {
  custom_domain: string;
  ssl_status: string;
}

export interface Colors {
  primary: string;
  secondary: string;
}

export interface Customization {
  company_name: string;
  legal_name: string;
  activity_sector: string;
  description: string;

  zone_intervention: {
    city: string;
    postal_code: string;
    radius_km: number;
  };

  domain: {
    custom_domain: string;
    ssl_status: string;
  };

  contact: {
    email: string;
    phone: string;
    address: string;
    siret: string;
    company_type: string;
  };

  logo_url: string;
  has_logo: boolean;

  colors: {
    primary: string;
    secondary: string;
  };

  images_uploaded: string[];
  link_comment: string;

  certifications: string[];

  created_at: string;
  updated_at: string;
  
  siteIsOk: boolean;
}
