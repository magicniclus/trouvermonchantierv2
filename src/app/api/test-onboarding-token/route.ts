import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// Stockage temporaire en mémoire pour les tokens de test
// Note: Ce stockage est perdu à chaque redémarrage du serveur
const testTokens = new Map<string, {
  userId: string;
  email: string;
  createdAt: number;
  expiryDate: number;
  used: boolean;
}>();

// Ajouter quelques tokens de test par défaut pour éviter les problèmes de perte de données au redémarrage
const defaultToken = randomUUID();
testTokens.set(defaultToken, {
  userId: 'test_default_user',
  email: 'test@example.com',
  createdAt: Date.now(),
  expiryDate: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 jours
  used: false
});

console.log('Token de test par défaut créé:', defaultToken);
console.log('URL d\'onboarding de test par défaut:', `http://localhost:3000/onboarding/${defaultToken}`);

export async function POST(request: Request) {
  try {
    const { userId, email } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'ID utilisateur requis' }, { status: 400 });
    }

    // Générer un token unique
    const token = randomUUID();
    
    // Calculer la date d'expiration (7 jours)
    const now = Date.now();
    const expiryDate = now + (7 * 24 * 60 * 60 * 1000); // 7 jours en millisecondes
    
    // Stocker le token en mémoire
    testTokens.set(token, {
      userId: String(userId),
      email: String(email || ''),
      createdAt: now,
      expiryDate,
      used: false
    });
    
    // Afficher les tokens disponibles pour le débogage
    console.log('Tokens de test disponibles:', Array.from(testTokens.keys()));
    
    // Générer l'URL d'onboarding
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const onboardingUrl = `${baseUrl}/onboarding/${token}`;
    
    return NextResponse.json({ 
      token,
      onboardingUrl,
      expiryDate: new Date(expiryDate).toISOString(),
      isTest: true
    });
  } catch (error) {
    console.error('Erreur lors de la génération du token de test:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la génération du token de test',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// Fonction pour vérifier un token de test
export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  
  if (!token) {
    return NextResponse.json({ valid: false, error: 'Token requis' });
  }
  
  console.log('Vérification du token de test:', token);
  console.log('Tokens disponibles:', Array.from(testTokens.keys()));
  
  const tokenData = testTokens.get(token);
  
  if (!tokenData) {
    console.log('Token non trouvé dans la mémoire');
    return NextResponse.json({ valid: false, error: 'Token invalide' });
  }
  
  const now = Date.now();
  
  if (tokenData.expiryDate < now) {
    return NextResponse.json({ valid: false, error: 'Token expiré' });
  }
  
  if (tokenData.used) {
    return NextResponse.json({ valid: false, error: 'Token déjà utilisé' });
  }
  
  console.log('Token valide, données:', tokenData);
  
  return NextResponse.json({ 
    valid: true,
    userId: tokenData.userId,
    email: tokenData.email,
    isTest: true
  });
}

// Fonction pour marquer un token comme utilisé
export async function PUT(request: Request) {
  const { token } = await request.json();
  
  if (!token) {
    return NextResponse.json({ error: 'Token requis' }, { status: 400 });
  }
  
  const tokenData = testTokens.get(token);
  
  if (!tokenData) {
    return NextResponse.json({ success: false, error: 'Token invalide' });
  }
  
  // Marquer le token comme utilisé
  tokenData.used = true;
  testTokens.set(token, tokenData);
  
  return NextResponse.json({ success: true });
}
