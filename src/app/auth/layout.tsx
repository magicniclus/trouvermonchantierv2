"use client";

import Footer from "@/components/perso/footer/Footer";
import Nav from "@/components/tailwindui/nav/Nav";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav withMenu={false} />
      <div className="flex min-h-[calc(100vh-80px)] flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Accéder à votre espace
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
