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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [cardComplete, setCardComplete] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState<{
    percentage: number;
    amount: number;
  } | null>(null);
  const basePrice = 99;

  const calculateDiscount = (code: string) => {
    switch (code.toUpperCase()) {
      case "CHANTIER99":
        const discount99Amount = Number((basePrice * 0.99).toFixed(2)); // Calculer 99% du prix
        setDiscount({
          percentage: 99,
          amount: discount99Amount, // C'est le montant à réduire
        });
        break;
      case "CHANTIER20":
        const discount20 = 20;
        setDiscount({
          percentage: Math.round((discount20 / basePrice) * 100),
          amount: Number(discount20.toFixed(2)),
        });
        break;
      default:
        setDiscount(null);
    }
  };

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setPromoCode(code);
    calculateDiscount(code);
  };

  const finalPrice = Number(
    (discount ? basePrice - discount.amount : basePrice).toFixed(2)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

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
          amount: finalPrice,
          promoCode: promoCode,
          discount: discount
            ? {
                percentage: discount.percentage,
                amount: discount.amount,
              }
            : null,
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

      // Générer un token d'onboarding après le paiement réussi
      try {
        const tokenResponse = await fetch("/api/generate-onboarding-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: data.userId || data.customerId, // Selon ce que renvoie l'API create-subscription
            email: email,
          }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
          console.error("Erreur lors de la génération du token:", tokenData.error);
          // Fallback en cas d'erreur
          window.location.href = "/auth?message=email_sent";
          return;
        }

        // Rediriger vers la page d'onboarding avec le token
        window.location.href = tokenData.onboardingUrl;
      } catch (tokenError) {
        console.error("Erreur lors de la génération du token:", tokenError);
        // Fallback en cas d'erreur
        window.location.href = "/auth?message=email_sent";
      }
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
        </div>{" "}
        <div>
          <h3 className="text-lg font-semibold mb-4">Code promo</h3>
          <input
            type="text"
            placeholder="Code promo"
            className="w-full p-3 border border-slate-200 rounded-lg"
            value={promoCode}
            onChange={handlePromoCodeChange}
          />
          {discount && (
            <p className="mt-2 text-green-600 font-medium">
              Réduction appliquée : {discount.percentage}% (-{discount.amount}€)
            </p>
          )}
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
              <h4 className="font-medium">Generateur de chantier</h4>
              <p className="text-sm text-slate-600">Paiement unique</p>
            </div>
            <span className="font-medium">99€</span>
          </div>

          <div className="flex justify-between items-start border-slate-200">
            <div>
              <h4 className="font-medium">Hébergement mensuelle</h4>
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

          <div className="mt-6 space-y-2">
            {discount && (
              <p className="text-xl font-semibold flex justify-between border-t pt-2">
                <span>Prix initial :</span>
                <span>{basePrice}€</span>
              </p>
            )}
            {discount && (
              <p className="text-green-600 font-medium flex justify-between">
                <span>Réduction ({discount.percentage}%) :</span>
                <span>-{discount.amount}€</span>
              </p>
            )}
            <p className="text-xl font-bold flex justify-between border-t pt-2">
              <span>Total :</span>
              <span>{finalPrice}€</span>
            </p>
            <div className="text-sm text-slate-600 mt-2">
              <p>Puis 29€/mois pour la maintenance à partir du 2ème mois</p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-medium mb-4">Avantages</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2">
                <CheckBadgeIcon className="min-w-6 h-6 w-6 min-h-6 h-6 w-6 text-yellow-500" />
                Livraison sous 24h
                <span className="text-xs text-gray-600">*</span>
              </li>
              <li className="flex items-center text-sm gap-2">
                <CheckBadgeIcon className="min-w-6 h-6 w-6 min-h-6 h-6 w-6 text-yellow-500" />
                400€ de pub Google offerts à l&apos;ouverture de votre compte
                <span className="text-xs text-gray-600">*</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckBadgeIcon className="min-w-6 h-6 w-6 min-h-6 h-6 w-6 text-yellow-500" />
                Résiliable à tout moment
              </li>
              <li className="flex items-center gap-2">
                <CheckBadgeIcon className="min-w-6 h-6 w-6 min-h-6 h-6 w-6 text-yellow-500" />
                Jusqu&apos;à 10 demandes de devis par jour
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
