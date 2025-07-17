"use client";

import { useParams } from 'next/navigation';

export default function TestPage() {
  // Type the params object and handle potential null/undefined
  const params = useParams<{ id: string }>();
  const id = params?.id || 'Aucun ID trouvé';
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Test Route Fonctionne !</h1>
        <p className="text-gray-600 mb-6">
          Paramètre ID : {id}
        </p>
      </div>
    </div>
  );
}
