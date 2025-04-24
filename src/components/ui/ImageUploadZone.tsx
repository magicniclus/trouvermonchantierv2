import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { deleteImage, uploadImage } from "@/services/storage.service";

interface ImageUploadZoneProps {
  // Type d'upload : "single" pour un seul fichier (comme le logo) ou "multiple" pour plusieurs fichiers
  uploadType: "single" | "multiple";
  // Dossier dans Firebase Storage
  storageFolder: "logo" | "company";
  // Label à afficher au-dessus de la zone
  label: string;
  // Description optionnelle sous le label
  description?: string;
  // Images actuellement affichées
  currentImages: string[];
  // ID de l'utilisateur pour le stockage
  userId: string;
  // Callback appelé quand les images changent (upload ou suppression)
  onImagesChange: (urls: string[]) => void;
  // Callback pour la gestion des erreurs
  onError: (error: string) => void;
}

export default function ImageUploadZone({
  uploadType,
  storageFolder,
  label,
  description,
  currentImages,
  userId,
  onImagesChange,
  onError,
}: ImageUploadZoneProps) {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = Array.from(event.target.files || []);
      if (files.length === 0 || !userId) return;

      setLoading(true);

      // Si c'est un upload single, on ne garde que le premier fichier
      const filesToUpload = uploadType === "single" ? [files[0]] : files;

      console.log(`Début de l'upload de ${filesToUpload.length} image(s)...`);
      
      const uploadPromises = filesToUpload.map((file) =>
        uploadImage(userId, file, storageFolder)
      );
      
      const imageUrls = await Promise.all(uploadPromises);
      console.log("Images uploadées avec succès:", imageUrls);

      if (uploadType === "single") {
        // Pour un upload single, on remplace l'image existante
        onImagesChange([imageUrls[0]]);
      } else {
        // Pour un upload multiple, on ajoute aux images existantes
        onImagesChange([...currentImages, ...imageUrls]);
      }
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      onError("Erreur lors de l'upload. Vérifiez le format et la taille des fichiers.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageUrl: string) => {
    try {
      await deleteImage(imageUrl);
      console.log("Image supprimée avec succès");
      
      const updatedImages = currentImages.filter((url) => url !== imageUrl);
      onImagesChange(updatedImages);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      onError("Erreur lors de la suppression de l'image");
    }
  };

  return (
    <div className="col-span-full">
      <label className="block text-sm/6 font-medium text-gray-900">
        {label}
        {description && (
          <span className="text-gray-600 text-xs ml-1">({description})</span>
        )}
      </label>
      <div className="mt-2">
        {/* Affichage des images */}
        {currentImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {currentImages.map((imageUrl, index) => (
              <div
                key={index}
                className="relative group w-[50] h-[50] overflow-hidden"
              >
                <Image
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  width={70}
                  height={70}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(imageUrl)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Zone de dépôt */}
        <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm/6 text-gray-600">
              <label
                htmlFor={`${storageFolder}-upload`}
                className="relative cursor-pointer rounded-md bg-white font-semibold text-slate-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-slate-500"
              >
                <span>
                  {loading
                    ? "Upload en cours..."
                    : `Ajouter ${uploadType === "single" ? "une image" : "des images"}`}
                </span>
                <input
                  id={`${storageFolder}-upload`}
                  name={`${storageFolder}-upload`}
                  type="file"
                  multiple={uploadType === "multiple"}
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileUpload}
                  disabled={loading}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
