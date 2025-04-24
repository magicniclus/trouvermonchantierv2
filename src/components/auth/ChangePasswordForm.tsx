"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/firebase.config";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error("Utilisateur non connecté");

      // Réauthentifier l'utilisateur avec son mot de passe actuel
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Mettre à jour le mot de passe
      await updatePassword(user, newPassword);

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");

      // Déconnexion après 2 secondes
      setTimeout(() => {
        auth.signOut();
      }, 2000);
    } catch (error: any) {
      if (error.code === "auth/wrong-password") {
        setError("Le mot de passe actuel est incorrect");
      } else {
        setError("Une erreur est survenue lors du changement de mot de passe");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mot de passe actuel
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nouveau mot de passe
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <p className="text-sm text-green-600">
          Mot de passe modifié avec succès. Déconnexion en cours...
        </p>
      )}
      <Button
        type="submit"
        disabled={loading || success}
        className="w-full"
      >
        {loading ? "Modification en cours..." : "Modifier mon mot de passe"}
      </Button>
    </form>
  );
}
