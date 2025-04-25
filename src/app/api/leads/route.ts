import { database } from "@/firebase/firebase.config";
import { push, ref, set } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log('Début de la route API leads');
    const data = await request.json();
    console.log('Données reçues:', data);

    const { name, companyName, email, phone, metier } = data;

    // Validation des données
    if (!name || !companyName || !email || !phone || !metier) {
      console.error('Données manquantes:', { name, companyName, email, phone, metier });
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    console.log('Connexion à Firebase...');
    console.log('Database instance:', database);

    // Créer une référence à /Leads dans Firebase
    const leadsRef = ref(database, "Leads");
    console.log('Référence Firebase créée:', leadsRef);
    
    // Préparer les données avec un timestamp
    const leadData = {
      name,
      companyName,
      email,
      phone,
      metier,
      createdAt: new Date().toISOString(),
      status: "nouveau"
    };

    console.log('Données à sauvegarder:', leadData);

    try {
      // Créer un nouvel ID unique
      const newLeadRef = push(leadsRef);
      console.log('Nouvelle référence créée:', newLeadRef.key);

      // Utiliser set au lieu de push pour plus de contrôle
      await set(newLeadRef, leadData);
      console.log('Données sauvegardées avec succès à:', newLeadRef.toString());

      return NextResponse.json(
        { 
          success: true, 
          message: "Lead enregistré avec succès",
          leadId: newLeadRef.key
        },
        { status: 200 }
      );
    } catch (innerError: any) {
      console.error('Erreur lors de la sauvegarde Firebase:', innerError);
      throw innerError;
    }

  } catch (error: any) {
    console.error("Erreur lors de l'enregistrement du lead:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Erreur lors de l'enregistrement du lead",
        details: error?.message 
      },
      { status: 500 }
    );
  }
}
