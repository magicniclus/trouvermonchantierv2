import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface SiteCreationStatusProps {
  className?: string;
  customDomain?: string;
  siteIsOk?: boolean;
}

export function SiteCreationStatus({
  className = "",
  customDomain,
  siteIsOk
}: SiteCreationStatusProps) {
  // Si siteIsOk est false, ne rien afficher
  if (!siteIsOk) {
    return null;
  }

  // Si le domaine existe, afficher juste le lien
  if (customDomain && customDomain.length > 0) {
    return (
      <div className={`max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm ${className}`}>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-700 text-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Votre site est disponible à l&apos;adresse :
          </p>
          <a
            href={customDomain.startsWith('http') ? customDomain : `https://${customDomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium mt-1 block"
          >
            {customDomain}
          </a>
        </div>
      </div>
    );
  }

  // Sinon afficher la card de création
  return (
    <div className={`max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="h-6 w-6 text-green-500" />
        <h2 className="text-xl font-semibold">
          Site en cours de création
        </h2>
      </div>
      <div className="space-y-6">
        <p className="text-gray-600">
          Votre site est actuellement en cours de création. Il sera disponible sous 24 heures
          ouvrées (hors week-ends et jours fériés). Un email vous sera envoyé à finalisation
          avec le lien de votre site.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-blue-700 text-sm">
            Note : Si des informations complémentaires sont nécessaires, notre équipe de
            développement vous contactera directement pour finaliser la mise en place de votre site.
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-medium mb-2">
            Prochaines étapes :
          </h3>
          <ul className="space-y-1 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-green-500">1.</span>
              Vérification des informations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">2.</span>
              Création et optimisation du site
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">3.</span>
              Tests et optimisations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">4.</span>
              Mise en ligne de votre site
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
