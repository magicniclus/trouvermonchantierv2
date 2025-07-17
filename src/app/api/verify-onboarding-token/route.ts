import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    
    if (!token) {
      return NextResponse.json({ valid: false, error: 'Token requis' });
    }
    
    // Essayer d'abord de vérifier si c'est un token de test
    try {
      const testResponse = await fetch(`${url.origin}/api/test-onboarding-token?token=${token}`);
      const testData = await testResponse.json();
      
      if (testData.valid) {
        return NextResponse.json({ 
          valid: true,
          userId: testData.userId,
          email: testData.email,
          isTest: true
        });
      }
    } catch (testError) {
      console.log('Ce n\'est pas un token de test, vérification dans Firestore...');
    }
    
    // Si ce n'est pas un token de test, vérifier dans Firestore
    const tokenRef = doc(db, 'onboardingTokens', token);
    const tokenDoc = await getDoc(tokenRef);
    
    if (!tokenDoc.exists()) {
      return NextResponse.json({ valid: false, error: 'Token invalide' });
    }
    
    const tokenData = tokenDoc.data();
    const now = new Date();
    
    // Vérifier si le token a expiré
    if (tokenData.expiryDate.toDate() < now) {
      return NextResponse.json({ valid: false, error: 'Token expiré' });
    }
    
    // Vérifier si le token a déjà été utilisé
    if (tokenData.used) {
      return NextResponse.json({ valid: false, error: 'Token déjà utilisé' });
    }
    
    return NextResponse.json({ 
      valid: true,
      userId: tokenData.userId,
      email: tokenData.email,
      isTest: tokenData.isTest || false
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return NextResponse.json({ valid: false, error: 'Erreur lors de la vérification du token' });
  }
}
