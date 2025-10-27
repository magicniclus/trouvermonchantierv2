import { database } from "@/firebase/firebase.config";
import { push, ref, set } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log('Début de la route API demandes de chantier');
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

    // Créer une référence à /DemandesChantier dans Firebase
    const leadsRef = ref(database, "DemandesChantier");
    console.log('Référence Firebase créée:', leadsRef);
    
    // Préparer les données avec un timestamp
    const demandeChantierData = {
      name,
      companyName,
      email,
      phone,
      metier,
      createdAt: new Date().toISOString(),
      status: "nouveau"
    };

    console.log('Données à sauvegarder:', demandeChantierData);

    try {
      // Créer un nouvel ID unique
      const newDemandeChantierRef = push(leadsRef);
      console.log('Nouvelle référence créée:', newDemandeChantierRef.key);

      // Utiliser set au lieu de push pour plus de contrôle
      await set(newDemandeChantierRef, demandeChantierData);
      console.log('Données sauvegardées avec succès à:', newDemandeChantierRef.toString());

      return NextResponse.json(
        { 
          success: true, 
          message: "Demande de chantier enregistrée avec succès",
          demandeChantierId: newDemandeChantierRef.key
        },
        { status: 200 }
      );
    } catch (innerError: any) {
      console.error('Erreur lors de la sauvegarde Firebase:', innerError);
      throw innerError;
    }

  } catch (error: any) {
    console.error("Erreur lors de l'enregistrement de la demande de chantier:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Erreur lors de l'enregistrement de la demande de chantier",
        details: error?.message 
      },
      { status: 500 }
    );
  }
}
