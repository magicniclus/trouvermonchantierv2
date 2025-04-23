export default function CRMPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-center h-full">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🛠️ CRM en maintenance
          </h2>
          <p className="text-gray-600 mb-4">
            Notre CRM fait peau neuve pour vous offrir une meilleure expérience !
          </p>
          <p className="text-gray-500 text-sm">
            De nouvelles fonctionnalités seront bientôt disponibles.
            Merci de votre patience.
          </p>
        </div>
      </div>
    </div>
  );
}
