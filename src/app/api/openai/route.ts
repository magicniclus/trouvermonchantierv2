import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialiser l'API OpenAI seulement si la clé est disponible
let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function POST(request: Request) {
  try {
    const { text, type } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Le texte est requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'API OpenAI est disponible
    if (!openai || !process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Service OpenAI non disponible' },
        { status: 503 }
      );
    }

    let prompt = '';
    
    // Différents prompts selon le type de texte à améliorer
    switch (type) {
      case 'description':
        prompt = `Reformule et améliore cette description d'entreprise de manière professionnelle, 
                 en gardant les informations clés mais en rendant le texte plus attractif et bien structuré : "${text}"`;
        break;
      case 'distinction':
        prompt = `Reformule et améliore cette description des éléments distinctifs de l'entreprise 
                 de manière professionnelle et persuasive, en mettant en avant les avantages concurrentiels : "${text}"`;
        break;
      default:
        prompt = `Reformule et améliore ce texte de manière professionnelle : "${text}"`;
    }

    // Appel à l'API OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en communication d'entreprise qui reformule et améliore les textes pour les rendre plus professionnels et attractifs."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const improvedText = response.choices[0].message.content;

    return NextResponse.json({ improvedText });
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la reformulation du texte' },
      { status: 500 }
    );
  }
}
