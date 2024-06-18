/* eslint-disable @next/next/no-img-element */
"use client";
import { Input } from "@/components/ui/input";
import {
  createFirebaseUser,
  transferProspectToClient,
} from "@/firebase/database"; // Import the Firebase utilities
import { database } from "@/firebase/firebase.config"; // Import the initialized Firebase services
import { LockClosedIcon } from "@heroicons/react/20/solid";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { ref, set } from "firebase/database";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const priceIds = {
  "tier-starter": {
    mois: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_MOIS,
    an: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_ANNEE,
  },
  "tier-scale": {
    mois: process.env.NEXT_PUBLIC_STRIPE_PRICE_SCALE_MOIS,
    an: process.env.NEXT_PUBLIC_STRIPE_PRICE_SCALE_ANNEE,
  },
  "tier-growth": {
    mois: process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH_MOIS,
    an: process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH_ANNEE,
  },
};

type TierKey = keyof typeof priceIds;
type FrequencyKey = keyof (typeof priceIds)[TierKey];

const CheckoutForm = ({
  tier,
  frequency,
  price,
  email,
  setEmail,
  metier,
  address,
}: {
  tier: TierKey;
  frequency: FrequencyKey;
  price: number;
  email: string;
  setEmail: (email: string) => void;
  metier: string;
  address: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    try {
      setLoading(true);

      // Create a payment method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement!,
        billing_details: {
          email,
        },
      });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: priceIds[tier][frequency],
          email,
          paymentMethodId: paymentMethod?.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server response", data);

      if (data.error) {
        throw new Error(data.error);
      }

      // Handle successful payment and subscription creation
      await handleSuccessfulPayment(searchParams?.get("uid")!, email);
    } catch (error) {
      console.error("Payment failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessfulPayment = async (uid: string, email: string) => {
    try {
      const user = await createFirebaseUser(email, "defaultPassword");

      await transferProspectToClient(uid);
      console.log("Prospect transferred to client");

      await set(ref(database, `clients/${user.uid}`), {
        email,
        metier,
        address,
        tier,
        frequency,
      });

      console.log("Client data saved");
      // Redirect to client's profile page
      router.push(`/pricing/connexion`);
    } catch (error) {
      console.error("Error handling successful payment: ", error);
    }
  };

  return (
    <form className="mt-6" onSubmit={handlePayment}>
      <div className="grid grid-cols-12 gap-x-4 gap-y-6">
        <div className="col-span-full">
          <label
            htmlFor="email-address"
            className="block text-sm font-medium text-gray-700"
          >
            Adresse email
          </label>
          <div className="mt-1 flex flex-col items-center">
            <Input
              type="email"
              id="email-address"
              name="email-address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-[40%] h-0.5 bg-gray-300 mx-auto mt-10" />
        </div>

        <div className="col-span-full">
          <label
            htmlFor="card-number-element"
            className="block text-sm font-medium text-gray-700"
          >
            Numéro de carte
          </label>
          <div className="mt-1">
            <CardNumberElement
              id="card-number-element"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="col-span-6">
          <label
            htmlFor="card-expiry-element"
            className="block text-sm font-medium text-gray-700"
          >
            Date d&apos;expiration
          </label>
          <div className="mt-1">
            <CardExpiryElement
              id="card-expiry-element"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="col-span-6">
          <label
            htmlFor="card-cvc-element"
            className="block text-sm font-medium text-gray-700"
          >
            CVC
          </label>
          <div className="mt-1">
            <CardCvcElement
              id="card-cvc-element"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        disabled={loading}
      >
        {loading ? "Processing..." : `Payer ${price?.toFixed(2)}€`}
      </button>
      <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
        <LockClosedIcon
          className="mr-1.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        Paiement securisé SSL par STRIPE
      </p>

      <img src="/logos/paiement.svg" alt="Paiement" className="mt-5 mx-auto" />
    </form>
  );
};

export default CheckoutForm;
