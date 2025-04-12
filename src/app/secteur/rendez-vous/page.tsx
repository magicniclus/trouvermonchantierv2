"use client";

import Nav from "@/components/tailwindui/nav/Nav";
import { useEffect } from "react";

const Page = () => {
  // Dynamically load Calendly script when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <Nav withMenu={false} />
      <main className="min-h-[calc(100vh-80px)]">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-7 md:px-0 pt-10 pb-8">
          <h1 className="mx-auto max-w-4xl text-center text-4xl md:text-5xl font-bold tracking-tight text-slate-700 mt-7 mb-10">
            Échangez avec <span className="text-yellow-500">Khalid</span>, votre
            responsable partenaire France
          </h1>

          {/* Calendly inline widget */}
          <div className="mt-8">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/contact-kjsystemes/30min"
              style={{ minWidth: "320px", height: "700px" }}
            ></div>
            {/* Script is loaded via useEffect */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
