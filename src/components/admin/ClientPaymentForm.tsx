"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";

interface ClientData {
  email: string;
  name: string;
  companyName: string;
  telephone: string;
  metier: string;
  address: string;
  tier: string;
  frequency: string;
  token: string;
}

interface ClientPaymentFormProps {
  clientData: ClientData;
  price: number;
}

export default function ClientPaymentForm({ clientData, price }: ClientPaymentFormProps) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  // Gérer les changements dans le composant CardElement
  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setCardError(event.error ? event.error.message : "");
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setProcessing(true);
    setCardError("");

    try {
      // 1. Créer l'intention de paiement
      const paymentResponse = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: price,
          email: clientData.email,
          metadata: {
            name: clientData.name,
            companyName: clientData.companyName,
            telephone: clientData.telephone,
            metier: clientData.metier,
            address: clientData.address,
            tier: clientData.tier,
            frequency: clientData.frequency,
          },
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Erreur lors de la création de l'intention de paiement");
      }

      const { clientSecret } = await paymentResponse.json();

      // 2. Confirmer le paiement avec Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: clientData.name,
            email: clientData.email,
          },
        },
      });

      if (error) {
        setCardError(error.message || "Une erreur est survenue lors du paiement");
        setProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
        
        // 3. Créer l'utilisateur dans Firebase
        try {
          const createUserResponse = await fetch("/api/create-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: clientData.email,
              role: "client",
              userData: {
                name: clientData.name,
                companyName: clientData.companyName,
                telephone: clientData.telephone,
                metier: clientData.metier,
                address: clientData.address,
                subscription: {
                  tier: clientData.tier,
                  frequency: clientData.frequency,
                  paymentIntentId: paymentIntent.id,
                  amount: price,
                  status: "active",
                  startDate: new Date().toISOString(),
                },
              },
            }),
          });

          if (!createUserResponse.ok) {
            throw new Error("Erreur lors de la création de l'utilisateur");
          }

          const userData = await createUserResponse.json();
          setUserCreated(true);
          
          // Rediriger vers la page de confirmation après 3 secondes
          setTimeout(() => {
            router.push(`/admin/payment-success?email=${encodeURIComponent(clientData.email)}`);
          }, 3000);
        } catch (userError) {
          console.error("Erreur lors de la création de l'utilisateur:", userError);
        }
      }
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      setCardError("Une erreur est survenue lors du traitement du paiement");
    } finally {
      setProcessing(false);
    }
  };

  // Styles pour le composant CardElement
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {paymentSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Paiement réussi</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Votre paiement a été traité avec succès.</p>
                {userCreated ? (
                  <p className="mt-1">Votre espace client a été créé. Vous allez recevoir vos identifiants par email.</p>
                ) : (
                  <p className="mt-1">Création de votre espace client en cours...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div>
              <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-1">
                Carte bancaire
              </label>
              <div className="border border-gray-300 rounded-md p-3 bg-white">
                <CardElement 
                  id="card-element"
                  options={cardElementOptions} 
                  onChange={handleCardChange}
                />
              </div>
              {cardError && (
                <p className="mt-2 text-sm text-red-600">{cardError}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={!stripe || processing}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                processing ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors`}
            >
              {processing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement en cours...
                </>
              ) : (
                `Payer ${price.toFixed(2)}€`
              )}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
