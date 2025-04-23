"use client";

import { CheckBadgeIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { SiMastercard, SiVisa } from "react-icons/si";

export function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [cardComplete, setCardComplete] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // Créer un PaymentMethod avec les détails de la carte
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardNumberElement)!,
          billing_details: {
            email: email,
          },
        });

      if (paymentMethodError) {
        setError(paymentMethodError.message || "Une erreur est survenue.");
        return;
      }

      // Créer le paiement unique et l'abonnement
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          email: email,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.requiresAction) {
        // Gérer l'authentification 3D Secure si nécessaire
        const { error: confirmationError } = await stripe.confirmCardPayment(
          data.clientSecret
        );
        if (confirmationError) {
          setError(confirmationError.message || "Une erreur est survenue.");
          return;
        }
      }

      // Rediriger vers le dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Une erreur est survenue lors du paiement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Formulaire de paiement */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Informations de paiement
          </h3>
          <input
            type="email"
            placeholder="Adresse email"
            className="w-full p-3 border border-slate-200 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Détails du paiement</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="mb-4">
                  <CardNumberElement
                    onChange={(e) =>
                      setCardComplete((prev) => ({
                        ...prev,
                        number: e.complete,
                      }))
                    }
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                          iconColor: "#fcd34d",
                        },
                        invalid: {
                          color: "#9e2146",
                          iconColor: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
                <div className="border-t border-slate-200 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <CardExpiryElement
                    onChange={(e) =>
                      setCardComplete((prev) => ({
                        ...prev,
                        expiry: e.complete,
                      }))
                    }
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                          iconColor: "#fcd34d",
                        },
                        invalid: {
                          color: "#9e2146",
                          iconColor: "#9e2146",
                        },
                      },
                    }}
                  />
                  <CardCvcElement
                    onChange={(e) =>
                      setCardComplete((prev) => ({
                        ...prev,
                        cvc: e.complete,
                      }))
                    }
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                          iconColor: "#fcd34d",
                        },
                        invalid: {
                          color: "#9e2146",
                          iconColor: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <div className="flex items-start mb-4">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-yellow-300"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                J&apos;accepte les{" "}
                <a
                  href="/cgv"
                  target="_blank"
                  className="text-slate-700 underline"
                >
                  conditions générales de vente
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={
                loading ||
                !stripe ||
                !acceptedTerms ||
                !email ||
                !cardComplete.number ||
                !cardComplete.expiry ||
                !cardComplete.cvc
              }
              className={`w-full bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold border transition ease-in-out duration-300 ${
                loading ||
                !stripe ||
                !acceptedTerms ||
                !email ||
                !cardComplete.number ||
                !cardComplete.expiry ||
                !cardComplete.cvc
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white hover:text-yellow-500 hover:border-yellow-500"
              }`}
            >
              {loading ? "Traitement en cours..." : "Payer maintenant"}
            </button>
            <div className="mt-4 space-y-3">
              <div className="flex justify-center space-x-4">
                <SiVisa className="w-12 h-12 text-blue-600" />
                <SiMastercard className="w-12 h-12 text-red-500" />
              </div>
              <div className="flex items-center justify-center text-sm text-gray-600 space-x-2">
                <LockClosedIcon className="w-4 h-4" />
                <span>Paiement sécurisé SSL</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Récapitulatif de la commande */}
      <div className="bg-slate-50 p-6 rounded-xl space-y-6 w-full">
        <h3 className="text-lg font-semibold">Récapitulatif de la commande</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-start pb-4 border-b border-slate-200">
            <div>
              <h4 className="font-medium">Création du site web</h4>
              <p className="text-sm text-slate-600">Paiement unique</p>
            </div>
            <span className="font-medium">99€</span>
          </div>

          <div className="flex justify-between items-start pb-4 border-b border-slate-200">
            <div>
              <h4 className="font-medium">Maintenance mensuelle</h4>
              <p className="text-sm text-slate-600">
                Premier mois offert, puis 29€/mois{" "}
                <span className="text-slate-400 text-xs">
                  (sans engagement)
                </span>
              </p>
            </div>
            <div className="text-right">
              <span className="font-medium line-through text-gray-400">
                29€
              </span>
              <span className="font-medium text-green-600 ml-2">OFFERT</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <span className="font-semibold">Total initial</span>
            <span className="font-semibold">99€</span>
          </div>

          <div className="text-sm text-slate-600">
            <p>Puis 29€/mois pour la maintenance à partir du 2ème mois</p>
          </div>
        </div>

        <div className="">
          <h4 className="font-medium mb-2">Avantages</h4>
          <ul className=" mt-4 space-y-4 text-sm text-lg">
            <li className="flex items-center gap-2">
              <CheckBadgeIcon className="w-6 h-6 text-yellow-500" />
              Livraison sous 24h
              <span className="text-xs text-gray-600">*</span>
            </li>
            <li className="flex items-center text-sm gap-2">
              <CheckBadgeIcon className="w-6 h-6 text-yellow-500" />
              400€ de pub Google offerts à l&apos;ouverture de votre compte
              <span className="text-xs text-gray-600">*</span>
            </li>
            <li className="flex items-cente text-sm gap-2">
              <CheckBadgeIcon className="w-6 h-6 text-yellow-500" />
              Résiliable à tout moment
            </li>
            <li className="flex items-center text-sm gap-2">
              <CheckBadgeIcon className="w-6 h-6 text-yellow-500" />
              Jusqu&apos;à 10 demandes de devis par jour
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
