import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    
    if (!token) {
      return NextResponse.json({ error: 'Token requis' });
    }
    
    // Essayer d'abord de vérifier si c'est un token de test
    let testResult = null;
    try {
      const testResponse = await fetch(`${url.origin}/api/test-onboarding-token?token=${token}`);
      testResult = await testResponse.json();
    } catch (testError) {
      console.error('Erreur lors de la vérification du token de test:', testError);
    }
    
    return NextResponse.json({
      token,
      testTokenResult: testResult,
      requestUrl: request.url,
      origin: url.origin,
      testApiUrl: `${url.origin}/api/test-onboarding-token?token=${token}`
    });
  } catch (error) {
    console.error('Erreur lors du débogage du token:', error);
    return NextResponse.json({ 
      error: 'Erreur lors du débogage du token',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
