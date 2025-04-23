"use client";

import { Input } from "@/components/ui/input";
import { auth } from "@/firebase/firebase.config";
import {
  getCustomization,
  subscribeToCustomization,
  updateCustomization,
} from "@/services/customization.service";
import { Customization } from "@/types/client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function CustomizationForm() {
  const [customization, setCustomization] = useState<Customization | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    console.log("Setting up auth listener");
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", user?.uid);
      setUser(user);
      setAuthChecked(true);
    });

    // Si l'authentification n'est pas encore vérifiée après 5 secondes,
    // on considère qu'il y a un problème
    const timeout = setTimeout(() => {
      if (!authChecked) {
        console.error("Auth check timeout");
        setAuthChecked(true);
      }
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [authChecked]);

  useEffect(() => {
    console.log("User effect triggered:", user?.uid);
    if (!user) {
      console.log("No user, returning");
      return;
    }

    // Créer les données par défaut si elles n'existent pas
    const createDefaultData = async () => {
      console.log("Creating default data for user:", user.uid);
      const defaultData = {
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

        contact: {
          email: "",
          phone: "",
          address: "",
          siret: "",
          company_type: ""
        },

        logo_url: "",
        has_logo: false,

        colors: {
          primary: "",
          secondary: ""
        },

        images_uploaded: [],
        link_comment: "",

        certifications: [],

        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        siteIsOk: false
      };
      await updateCustomization(user.uid, defaultData);
    };

    // Charger les données initiales
    const loadInitialData = async () => {
      console.log("Loading initial data for user:", user.uid);
      try {
        const data = await getCustomization(user.uid);
        console.log("Initial data received:", data);
        if (data) {
          setCustomization(data);
        } else {
          console.log("No data found, creating default data...");
          await createDefaultData();
          const newData = await getCustomization(user.uid);
          if (newData) {
            setCustomization(newData);
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    // S'abonner aux mises à jour en temps réel
    console.log("Setting up real-time listener");
    const unsubscribe = subscribeToCustomization(user.uid, (data) => {
      console.log("Real-time update received:", data);
      if (data) setCustomization(data);
    });

    loadInitialData();

    return () => unsubscribe();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !customization) return;

    // Vérifier si tous les champs requis sont remplis
    const isFormComplete = Boolean(
      customization.company_name &&
      customization.legal_name &&
      customization.activity_sector &&
      customization.description &&
      customization.zone_intervention.postal_code &&
      customization.contact.email &&
      customization.contact.phone
    );

    const updatedCustomization = {
      ...customization,
      siteIsOk: isFormComplete
    };

    const success = await updateCustomization(user.uid, updatedCustomization);
    if (success) {
      console.log("Mise à jour réussie");
    }
  };

  const handleChange = (field: string, value: string | number) => {
    if (!customization) return;

    // Gestion des champs imbriqués (ex: zone_intervention.city)
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      if (customization && parent in customization) {
        setCustomization({
          ...customization,
          [parent]: {
            ...(customization[parent as keyof Customization] as Record<
              string,
              any
            >),
            [child]: value,
          },
        });
      }
    } else if (customization) {
      setCustomization({
        ...customization,
        [field]: value,
      });
    }
  };

  if (!authChecked)
    return <div>Vérification de l&apos;authentification...</div>;
  if (!user)
    return <div>Vous devez être connecté pour accéder à cette page.</div>;
  if (loading) return <div>Chargement des données...</div>;
  if (
    !customization ||
    !customization.zone_intervention ||
    !customization.contact ||
    !customization.colors
  ) {
    // Réinitialiser avec la structure complète
    const defaultData: Customization = {
      company_name: "",
      legal_name: "",
      activity_sector: "",
      description: "",

      zone_intervention: {
        city: "",
        postal_code: "",
        radius_km: 0,
      },

      domain: {
        custom_domain: "",
        ssl_status: "",
      },

      contact: {
        email: "",
        phone: "",
        address: "",
        siret: "",
        company_type: "",
      },

      logo_url: "",
      has_logo: false,

      colors: {
        primary: "",
        secondary: "",
      },

      images_uploaded: [],
      link_comment: "",

      certifications: [],

      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      siteIsOk: false,
    };
    setCustomization(defaultData);
    return <div>Initialisation des données...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Informations de l&apos;entreprise
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom de l&apos;entreprise (que souhaitez faire apparaitre sur votre
            site)
          </label>
          <Input
            value={customization.company_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("company_name", e.target.value)
            }
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom légal (Obligatoire pour les pages légales)
          </label>
          <Input
            value={customization.legal_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("legal_name", e.target.value)
            }
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Secteur d&apos;activité (une activité par site)
          </label>
          <Input
            value={customization.activity_sector}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("activity_sector", e.target.value)
            }
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description de l&apos;entreprise (plus nous aurons
            d&apos;information, plus nous pourrons réaliser un site performant)
          </label>
          <textarea
            value={customization.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange("description", e.target.value)
            }
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
            rows={4}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Zone d&apos;intervention</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Code postal d&apos;intervention
          </label>
          <Input
            value={customization.zone_intervention?.postal_code || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("zone_intervention.postal_code", e.target.value)
            }
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rayon d&apos;intervention au tour de votre ville(km) Plus le secteur
            sera large, plus vous aurez de leads
          </label>
          <Input
            type="number"
            min="0"
            value={customization.zone_intervention?.radius_km || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value === "" ? 0 : parseInt(e.target.value);
              handleChange("zone_intervention.radius_km", value);
            }}
            className="mt-1"
          />
        </div>
      </div>

      {/* Logo upload section à venir */}
      {/* Images upload section à venir */}

      <Button
        type="submit"
        className="w-full rounded-lg bg-yellow-500 hover:bg-yellow-400"
      >
        Enregistrer les modifications
      </Button>
    </form>
  );
}
