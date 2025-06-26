import { adminDb } from "@/firebase/firebase.admin";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données
    const { prenom, nom, email, entreprise, message } = body;
    
    if (!prenom || !nom || !email || !message) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires" },
        { status: 400 }
      );
    }
    
    // Utiliser l'Admin SDK pour écrire dans Firestore
    const messageData = {
      prenom,
      nom,
      email,
      entreprise: entreprise || "",
      message,
      status: "new",
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    };

    await adminDb.collection("public_messages").add(messageData);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error submitting contact message:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
