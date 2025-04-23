"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "./PaymentForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Pricing = () => {
  const options = {
    mode: "subscription" as const,
    currency: "eur",
    amount: 2900,
  };

  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Finaliser votre commande
            </h2>
            <p className="text-slate-600 text-lg">
              Plus qu&apos;une étape pour lancer votre site web professionnel
            </p>
          </div>

          <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
