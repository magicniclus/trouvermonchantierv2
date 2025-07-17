"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import OnboardingLinkGenerator from '@/components/admin/OnboardingLinkGenerator';

interface User {
  id: string;
  email: string;
  onboardingCompleted: boolean;
  onboardingDate?: Date;
  companyName?: string;
}

export default function AdminOnboardingPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'completed' | 'pending'>('pending');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        
        const fetchedUsers: User[] = [];
        
        snapshot.forEach((doc) => {
          const userData = doc.data();
          fetchedUsers.push({
            id: doc.id,
            email: userData.email || '',
            onboardingCompleted: userData.onboardingCompleted || false,
            onboardingDate: userData.onboardingDate?.toDate(),
            companyName: userData.companyName || '',
          });
        });
        
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const completedUsers = users.filter(user => user.onboardingCompleted);
  const pendingUsers = users.filter(user => !user.onboardingCompleted);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Onboardings</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-b-2 border-yellow-500 text-yellow-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              En attente ({pendingUsers.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-b-2 border-yellow-500 text-yellow-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Complétés ({completedUsers.length})
            </button>
          </nav>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'pending' ? (
            pendingUsers.length > 0 ? (
              pendingUsers.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{user.email}</h3>
                    <p className="text-sm text-gray-500 mb-4">ID: {user.id}</p>
                    <div className="mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        En attente d'onboarding
                      </span>
                    </div>
                    <OnboardingLinkGenerator userId={user.id} email={user.email} />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                Aucun utilisateur en attente d'onboarding.
              </div>
            )
          ) : (
            completedUsers.length > 0 ? (
              completedUsers.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">
                      {user.companyName || user.email}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">Email: {user.email}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Complété le: {user.onboardingDate?.toLocaleDateString() || 'N/A'}
                    </p>
                    <div className="mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Onboarding complété
                      </span>
                    </div>
                    <button
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        // Rediriger vers la page de détail de l'onboarding
                        window.location.href = `/admin/onboarding/${user.id}`;
                      }}
                    >
                      Voir les détails
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                Aucun utilisateur n'a complété l'onboarding.
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
