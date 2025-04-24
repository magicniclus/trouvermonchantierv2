"use client";

import { SiteCreationStatus } from "@/components/ui/SiteCreationStatus";
import { auth } from "@/firebase/firebase.config";
import { getCustomization } from "@/services/customization.service";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [user, setUser] = useState(auth.currentUser);
  const [customDomain, setCustomDomain] = useState<string>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("Auth state changed:", user ? user.uid : "no user");
      setUser(user);

      if (user) {
        try {
          const customization = await getCustomization(user.uid);
          console.log("Customization:", JSON.stringify(customization, null, 2));
          console.log("Custom domain:", customization?.custom_domain);
          console.log("siteIsOk:", customization?.siteIsOk);
          setIsProfileComplete(Boolean(customization?.siteIsOk));
          if (customization?.custom_domain) {
            console.log("Setting custom domain to:", customization.custom_domain);
            setCustomDomain(customization.custom_domain);
          }
        } catch (error) {
          console.error("Error getting customization:", error);
          setIsProfileComplete(false);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600">Chargement de vos informations...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isProfileComplete) {
    return (
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
            <div className="mb-6 flex justify-center">
              <svg
                className="h-12 w-12 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Profil incomplet
            </h2>
            <p className="text-gray-600 mb-6">
              Pour accéder à votre dashboard, veuillez finaliser votre profil en
              remplissant toutes les informations nécessaires dans la section
              site.
            </p>
            <Link
              href="/dashboard/site"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Compléter mon profil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="space-y-6">
        <SiteCreationStatus customDomain={customDomain} siteIsOk={isProfileComplete} />
      </div>
    </div>
  );
}
