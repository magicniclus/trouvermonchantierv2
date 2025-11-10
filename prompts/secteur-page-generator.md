# 🏗️ Prompt Générateur de Pages Secteur - Trouver Mon Chantier

## 🎯 Instructions Générales
Tu es un expert SEO et développeur React/Next.js spécialisé dans la création de pages secteur pour artisans. Tu crées des pages optimisées pour le référencement local et la conversion.

## 📋 Template de Prompt

```
Crée une page secteur complète pour le métier : "[MÉTIER]" sur le site trouver-mon-chantier.fr

🎯 OBJECTIF : Créer une landing page SEO optimisée pour générer des leads qualifiés pour les [MÉTIER]

📊 SPÉCIFICATIONS TECHNIQUES :
- Framework : Next.js 14 App Router
- Langage : TypeScript React
- Styling : TailwindCSS
- Composants : Lucide React icons
- Structure : Identique aux pages blog (cards, hover effects)

🏷️ MÉTADONNÉES REQUISES :
```typescript
export const metadata: Metadata = {
  title: 'Trouver des Chantiers en [MÉTIER_MAJUSCULE] | Solutions SEO pour [MÉTIER_PLURIEL]',
  description: 'Découvrez les meilleures stratégies pour trouver des chantiers [métier] : référencement local optimisé, zones à forte demande. Devis gratuit.',
  keywords: 'trouver chantiers [métier], clients [métier], prospection [métier], leads [métier], SEO [métier], chantiers [spécialité]',
  openGraph: {
    title: 'Trouver des Chantiers en [MÉTIER_MAJUSCULE] - Guide Complet 2024',
    description: 'Stratégies éprouvées pour générer des clients [métier] avec le référencement naturel et le SEO local.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://trouvermonchantier.com/secteurs/[slug]' },
};
```

🏗️ STRUCTURE DE PAGE OBLIGATOIRE :

## 1. Hero Section
```tsx
<section className="bg-white pt-16 pb-12">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
    <div className="max-w-4xl">
      {/* Badge métier */}
      <div className="inline-flex items-center gap-1 rounded-full border border-[couleur]-200/70 bg-[couleur]-50/80 px-3 py-1 text-xs font-medium text-[couleur]-700 shadow-sm/10 mb-6">
        [EMOJI] [Métier]
      </div>
      
      {/* H1 optimisé */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
        Trouver des Chantiers en <span className="text-yellow-500">[MÉTIER_MAJUSCULE]</span>
      </h1>
      
      {/* Description persuasive */}
      <p className="text-xl text-slate-500/85 leading-relaxed max-w-3xl">
        Découvrez comment générer un flux constant de clients [métier] grâce au référencement naturel (SEO), 
        du [service urgent] aux gros chantiers de [spécialité]. Solutions adaptées à votre spécialité.
      </p>
      
      {/* Double CTA */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link href="/tarifs" className="[STYLE_CTA_PRIMAIRE]">
          Créer mon site maintenant
        </Link>
        <Link href="/contact" className="[STYLE_CTA_SECONDAIRE]">
          Demander un devis gratuit
        </Link>
      </div>
    </div>
  </div>
</section>
```

## 2. Section Stratégies (4 stratégies)
```tsx
const strategies = [
  {
    title: '[Stratégie 1 spécifique au métier]',
    description: '[Description détaillée 100-150 mots]',
    icon: [IconeRelevante],
    color: 'text-[couleur]-500',
    bgColor: 'bg-[couleur]-50'
  },
  // ... 3 autres stratégies
];
```

**Structure card identique au blog :**
```tsx
<article className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 overflow-hidden hover:shadow-2xl/10 hover:-translate-y-1 transition-all duration-200 ease-out group">
  <div className="aspect-video overflow-hidden">
    <img src="[URL_UNSPLASH]" alt="[ALT_OPTIMISÉ]" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
  </div>
  <div className="p-6">
    <div className="inline-flex items-center px-2 py-1 rounded-md bg-[couleur]-50 text-[couleur]-700 text-xs font-medium mb-3">
      ✅ Stratégie
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200">
      {strategy.title}
    </h3>
    <p className="text-slate-600 leading-relaxed line-clamp-3">
      {strategy.description}
    </p>
  </div>
</article>
```

## 3. Section Coûts SEO
```tsx
<section className="bg-slate-50 py-20">
  {/* Titre + Description */}
  <h2>Combien coûte le référencement pour un [métier] ?</h2>
  
  {/* Grid 2 colonnes : Coûts + Article lié */}
  <div className="grid lg:grid-cols-2 gap-12">
    <div>
      {/* Fourchettes de prix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-xl">
          <span>[Service 1]</span>
          <span className="text-blue-600 font-bold">[Prix]/mois</span>
        </div>
        // ... autres services
      </div>
      
      {/* Conseil d'expert */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl">
        <h4>💡 Conseil d'expert</h4>
        <p>[Conseil spécifique au métier]</p>
      </div>
    </div>
    
    {/* Lien vers article blog */}
    <Link href="/blog/[article-lié]" className="block group">
      <div className="bg-white rounded-2xl shadow-xl p-8 group-hover:shadow-2xl transition-shadow">
        {/* Contenu article lié */}
      </div>
    </Link>
  </div>
</section>
```

## 4. Section Zones Géographiques
```tsx
const zones = [
  { ville: 'Paris & Île-de-France', demande: 'Très forte', difficulte: 'Élevée' },
  { ville: 'Lyon & Rhône-Alpes', demande: 'Forte', difficulte: 'Moyenne' },
  // ... autres zones
];

{/* Grid responsive avec cards zones */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {zones.map((zone, index) => (
    <article key={index} className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 p-6">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-5 h-5 text-blue-500" />
        <h3 className="font-bold text-slate-900">{zone.ville}</h3>
      </div>
      {/* Métriques zone */}
    </article>
  ))}
</div>
```

## 5. Section Témoignages (3 témoignages)
```tsx
const temoignages = [
  {
    nom: '[Prénom] [Initiale].',
    ville: '[Ville]',
    metier: '[Métier spécialisé]',
    resultat: '[Résultat SEO concret]',
    commentaire: '[Témoignage authentique 100-150 mots]'
  },
  // ... 2 autres témoignages
];

{/* Cards témoignages SANS photos (format simple) */}
<div className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 p-8">
  <div className="flex items-center gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
    ))}
  </div>
  <blockquote className="text-slate-700 mb-6 leading-relaxed">
    "{temoignage.commentaire}"
  </blockquote>
  <div className="flex items-center justify-between">
    <div>
      <div className="font-bold text-slate-900">{temoignage.nom}</div>
      <div className="text-sm text-slate-600">{temoignage.metier} • {temoignage.ville}</div>
    </div>
    <div className="text-right">
      <div className="font-bold text-green-600 text-sm">{temoignage.resultat}</div>
    </div>
  </div>
</div>
```

## 6. CTA Final
```tsx
<section className="bg-slate-900 py-20">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
      Prêt à développer votre activité de [métier] ? ⚡
    </h2>
    <p className="text-xl text-slate-300 mb-8">
      Rejoignez les centaines de [métier_pluriel] qui génèrent déjà leurs propres clients 
      grâce à notre solution SEO spécialisée [métier].
    </p>
    
    {/* Double CTA */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/tarifs" className="[CTA_PRIMAIRE]">Créer mon site maintenant</Link>
      <Link href="/contact" className="[CTA_SECONDAIRE]">Audit gratuit de mon potentiel</Link>
    </div>
  </div>
</section>
```

## 7. Maillage Interne
```tsx
<section className="bg-white py-16">
  <div className="text-center mb-12">
    <h3 className="text-2xl font-bold text-slate-900 mb-4">
      Découvrez aussi nos solutions pour d'autres métiers
    </h3>
  </div>
  
  <div className="grid md:grid-cols-3 gap-6">
    {/* 3 liens vers autres secteurs + 1 lien blog */}
    <Link href="/secteurs/[autre-métier]" className="group">
      <div className="bg-[couleur]-50 border border-[couleur]-200 rounded-xl p-6 group-hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <[IconeMetier] className="w-6 h-6 text-[couleur]-500" />
          <h4 className="font-bold text-slate-900 group-hover:text-[couleur]-600 transition-colors">
            [Autre Métier]
          </h4>
        </div>
        <p className="text-slate-600 text-sm">Solutions spécialisées pour les [métier_pluriel]</p>
      </div>
    </Link>
  </div>
</section>
```

🔗 IMPORTS REQUIS :
```typescript
import { Metadata } from 'next';
import Link from 'next/link';
import { SecondaryNav } from '@/components/navigation';
import { SecondaryFooter } from '@/components/footer';
import { 
  [IconeMetier], 
  MapPin, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Star,
  Target
} from 'lucide-react';
```

📊 DONNÉES SPÉCIFIQUES À FOURNIR :

**[MÉTIER]** : plombier, électricien, menuisier, etc.
**[SPÉCIALITÉ]** : plomberie, électricité, menuiserie, etc.
**[EMOJI]** : 🔧, ⚡, 🔨, 🎨, etc.
**[COULEUR]** : blue, yellow, amber, purple, etc.
**[SERVICES]** : 3-4 services principaux du métier
**[ZONES]** : 6 zones géographiques avec métriques
**[STRATÉGIES]** : 4 stratégies SEO spécifiques au métier
**[TÉMOIGNAGES]** : 3 témoignages authentiques avec résultats SEO

📸 IMAGES UNSPLASH REQUISES :
- 4 images stratégies (professionnelles métier)
- Alt tags optimisés SEO
- Format 1200x800px minimum
- Cohérence visuelle professionnelle

🎨 STYLE COHÉRENT :
- Cards identiques au blog
- Hover effects uniformes
- Couleurs thématiques par métier
- Typography cohérente
- Responsive mobile-first
```

## 🔄 Variables à Personnaliser

**[MÉTIER]** : Le métier ciblé (singulier)
**[MÉTIER_PLURIEL]** : Le métier au pluriel
**[MÉTIER_MAJUSCULE]** : Le métier en majuscules
**[SPÉCIALITÉ]** : Le domaine d'expertise
**[SLUG]** : L'URL slug (métier en minuscules)

## 📝 Exemples d'Utilisation

### Exemple 1 : Couvreur
```
[MÉTIER] = "couvreur"
[MÉTIER_PLURIEL] = "couvreurs"
[MÉTIER_MAJUSCULE] = "Couverture"
[SPÉCIALITÉ] = "toiture"
[SLUG] = "couvreur"
[EMOJI] = "🏠"
[COULEUR] = "red"
```

### Exemple 2 : Chauffagiste
```
[MÉTIER] = "chauffagiste"
[MÉTIER_PLURIEL] = "chauffagistes"
[MÉTIER_MAJUSCULE] = "Chauffage"
[SPÉCIALITÉ] = "chauffage"
[SLUG] = "chauffagiste"
[EMOJI] = "🔥"
[COULEUR] = "orange"
```

## ✅ Checklist de Validation

- [ ] Métadonnées SEO complètes
- [ ] Structure hero optimisée
- [ ] 4 stratégies avec cards blog-style
- [ ] Section coûts avec conseils
- [ ] 6 zones géographiques
- [ ] 3 témoignages sans photos
- [ ] CTA final double
- [ ] Maillage interne (4+ liens)
- [ ] Images Unsplash professionnelles
- [ ] Responsive design
- [ ] Hover effects cohérents
- [ ] Typography uniforme
