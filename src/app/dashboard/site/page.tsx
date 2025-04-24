"use client";

import CustomizationForm from "@/components/perso/CustomizationForm";
import { SiteCreationStatus } from "@/components/ui/SiteCreationStatus";
import { auth } from "@/firebase/firebase.config";
import { getCustomization } from "@/services/customization.service";
import { useEffect, useState } from "react";

export default function SitePage() {
  const [siteIsOk, setSiteIsOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customDomain, setCustomDomain] = useState<string>();

  useEffect(() => {
    const loadSiteStatus = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const customization = await getCustomization(user.uid);
        setSiteIsOk(customization?.siteIsOk || false);
        setCustomDomain(customization?.custom_domain || "");
      } catch (error) {
        console.error("Error loading site status:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSiteStatus();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (siteIsOk) {
    return (
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <SiteCreationStatus customDomain={customDomain} siteIsOk={siteIsOk} />
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Pour accéder à votre dashboard, veuillez remplir toutes les
              informations nécessaires ci-dessous.
            </p>
          </div>
        </div>
      </div>
      <CustomizationForm />
    </div>
  );
}
