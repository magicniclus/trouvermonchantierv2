import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const { userId, email, isTest = false } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'ID utilisateur requis' }, { status: 400 });
    }

    // Générer un token unique
    const token = randomUUID();
    
    // Calculer la date d'expiration (7 jours) en timestamp Unix
    const now = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(now.getDate() + 7);
    
    // Stocker le token dans Firestore avec un minimum de champs
    // pour éviter les problèmes de type
    const tokenRef = doc(db, 'onboardingTokens', token);
    await setDoc(tokenRef, {
      userId: String(userId),
      email: String(email || ''),
      createdAt: now.getTime(),
      expiryDate: expiryDate.getTime(),
      used: false
    });
    
    // Générer l'URL d'onboarding
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const onboardingUrl = `${baseUrl}/onboarding/${token}`;
    
    return NextResponse.json({ 
      token,
      onboardingUrl,
      expiryDate: expiryDate.toISOString()
    });
  } catch (error) {
    console.error('Erreur lors de la génération du token:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la génération du token',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
