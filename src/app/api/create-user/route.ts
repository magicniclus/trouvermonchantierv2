import { adminDb } from "@/firebase/firebase.admin";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { sendCredentialsEmail } from "@/utils/sendEmail";
import { generateSecurePassword } from "@/utils/passwordGenerator";
import { initializeClientData } from "@/services/client.service";

// Interface pour la requête
interface CreateUserRequest {
  email: string;
  password?: string; // Optionnel, un mot de passe sera généré si non fourni
  role?: string; // Rôle de l'utilisateur (par défaut: 'client')
  userData?: Record<string, any>; // Données supplémentaires pour l'utilisateur
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserRequest = await request.json();
    const { email, password: providedPassword, role = 'client', userData = {} } = body;

    // Validation des données
    if (!email) {
      return NextResponse.json(
        { error: "L'email est requis" },
        { status: 400 }
      );
    }

    // Générer un mot de passe si non fourni
    const password = providedPassword || generateSecurePassword();

    // Créer l'utilisateur avec Firebase Admin SDK
    const auth = getAuth();
    const userRecord = await auth.createUser({
      email,
      password,
      emailVerified: false,
    });

    // Créer les données utilisateur dans Firestore
    const userDocRef = adminDb.collection("users").doc(userRecord.uid);
    
    const userDataToSave = {
      email,
      role,
      ...userData,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      createdBy: 'admin',
      status: 'active',
    };

    await userDocRef.set(userDataToSave);
    
    // Initialiser les données client si le rôle est 'client'
    if (role === 'client') {
      try {
        // Utiliser le service existant pour initialiser les données client
        const initResult = await initializeClientData(userRecord.uid, email);
        if (!initResult.success) {
          console.error("Erreur lors de l'initialisation des données client:", initResult.error);
        }
      } catch (initError) {
        console.error("Erreur lors de l'initialisation des données client:", initError);
        // On continue même si l'initialisation échoue
      }
    }

    // Envoyer les identifiants par email
    try {
      await sendCredentialsEmail(email, password);
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email:", emailError);
      // On continue même si l'envoi d'email échoue
    }

    return NextResponse.json({
      success: true,
      message: "Utilisateur créé avec succès",
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        role,
      },
      // Inclure le mot de passe dans la réponse pour l'administrateur
      credentials: {
        email,
        password,
      }
    });
  } catch (error: any) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    
    // Gérer les erreurs spécifiques de Firebase Auth
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json(
        { error: "Un utilisateur avec cet email existe déjà" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: "Erreur lors de la création de l'utilisateur",
        details: error.message || error.toString()
      },
      { status: 500 }
    );
  }
}
