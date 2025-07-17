import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { token, formData } = await request.json();

    if (!token || !formData) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Vérifier d'abord si c'est un token de test
    let isTestToken = false;
    let userId = '';
    let email = '';

    try {
      const url = new URL(request.url);
      const testResponse = await fetch(`${url.origin}/api/test-onboarding-token?token=${token}`);
      const testData = await testResponse.json();
      
      if (testData.valid) {
        isTestToken = true;
        userId = testData.userId;
        email = testData.email;

        // Marquer le token de test comme utilisé
        await fetch(`${url.origin}/api/test-onboarding-token`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token })
        });
      }
    } catch (testError) {
      console.log('Ce n\'est pas un token de test, vérification dans Firestore...');
    }

    // Si ce n'est pas un token de test, vérifier dans Firestore
    if (!isTestToken) {
      // Vérifier le token
      const tokenRef = doc(db, 'onboardingTokens', token);
      const tokenDoc = await getDoc(tokenRef);

      if (!tokenDoc.exists()) {
        return NextResponse.json({ error: 'Token invalide' }, { status: 404 });
      }

      const tokenData = tokenDoc.data();

      // Vérifier si le token est expiré ou déjà utilisé
      const now = new Date();
      if (tokenData.expiryDate.toDate() < now || tokenData.used) {
        return NextResponse.json({ error: 'Token invalide ou déjà utilisé' }, { status: 403 });
      }

      // Récupérer l'ID utilisateur associé au token
      userId = tokenData.userId;
      email = tokenData.email;

      // Marquer le token comme utilisé
      await updateDoc(tokenRef, {
        used: true
      });
    }

    // Pour les tokens de test, on peut soit:
    // 1. Sauvegarder dans Firestore avec un préfixe spécial pour l'ID
    // 2. Simuler la sauvegarde sans réellement écrire dans la base
    // 3. Écrire dans une collection séparée pour les tests
    
    // Option 1: Sauvegarder dans Firestore avec un préfixe pour l'ID
    if (isTestToken) {
      const testUserRef = doc(db, 'testUsers', userId);
      await setDoc(testUserRef, {
        ...formData,
        email,
        onboardingCompleted: true,
        onboardingDate: new Date(),
        isTestData: true
      });
    } else {
      // Mettre à jour les données de l'utilisateur réel
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...formData,
        onboardingCompleted: true,
        onboardingDate: new Date()
      });
    }

    return NextResponse.json({ 
      success: true,
      isTest: isTestToken
    });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la sauvegarde des données',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
