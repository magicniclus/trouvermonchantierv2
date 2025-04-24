"use client";

import { auth } from "@/firebase/firebase.config";
import { getCustomization } from "@/services/customization.service";
import { Customization } from "@/types/client";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function ParametresPage() {
  const [user, setUser] = useState(auth.currentUser);
  const [customization, setCustomization] = useState<Customization | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const data = await getCustomization(user.uid);
        setCustomization(data);
      } catch (error) {
        console.error("Error loading customization:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Veuillez vous connecter pour accéder à vos paramètres.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et vos préférences
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Informations du compte */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Informations du compte</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="mt-1">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Date d&apos;inscription
                </label>
                <p className="mt-1">
                  {user.metadata.creationTime
                    ? format(
                        new Date(user.metadata.creationTime),
                        "d MMMM yyyy",
                        {
                          locale: fr,
                        }
                      )
                    : "Non disponible"}
                </p>
              </div>
              <div className="border-t pt-4 mt-4">
                <h4 className="text-base font-medium mb-4">
                  Changer mon mot de passe
                </h4>
                <ChangePasswordForm />
              </div>
            </div>
          </div>
        </div>

        {/* Informations d'abonnement */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">
              Informations d&apos;abonnement
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Forfait actuel
                </label>
                <p className="mt-1">Premium</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Date de souscription
                </label>
                <p className="mt-1">
                  {customization?.created_at
                    ? format(
                        new Date(customization.created_at),
                        "d MMMM yyyy",
                        {
                          locale: fr,
                        }
                      )
                    : "Non disponible"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Prochaine facturation
                </label>
                <p className="mt-1">
                  {/* À remplacer par la vraie date de Stripe */}
                  {format(
                    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    "d MMMM yyyy",
                    { locale: fr }
                  )}
                </p>
              </div>
              <div className="pt-4">
                <a
                  href="https://billing.stripe.com/p/login/test_28o5kQ3Yf8Qf3GE288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Gérer mon abonnement sur Stripe
                  <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
