"use client";

import { auth } from "@/firebase/firebase.config";
import { getCustomization } from "@/services/customization.service";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(true);

  useEffect(() => {
    const checkCustomization = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const customization = await getCustomization(user.uid);
      setIsProfileComplete(Boolean(customization?.siteIsOk));
      setLoading(false);
    };

    checkCustomization();
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
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        {/* Contenu du dashboard ici */}
      </div>
    </div>
  );
}
