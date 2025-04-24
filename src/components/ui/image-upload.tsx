"use client";

import { Loader } from "@/components/ui/loader";
import { uploadImage } from "@/services/storage.service";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
  userId: string;
  type: "logo" | "company";
  images: string[];
  maxImages: number;
  onImagesChange: (urls: string[]) => void;
  onError: (error: string) => void;
}

export function ImageUpload({
  userId,
  type,
  images,
  maxImages,
  onImagesChange,
  onError,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    console.log('Début du processus d\'upload...', {
      userId,
      type,
      filesCount: files.length,
      currentImagesCount: images.length,
      maxImages
    });

    if (images.length + files.length > maxImages) {
      const error = `Vous ne pouvez pas ajouter plus de ${maxImages} image${
        maxImages > 1 ? "s" : ""
      }`;
      console.error(error);
      onError(error);
      return;
    }

    setUploading(true);
    try {
      console.log('Début de l\'upload des fichiers...');
      const uploadPromises = Array.from(files).map(async (file) => {
        console.log('Upload du fichier:', file.name);
        try {
          const url = await uploadImage(userId, file, type);
          console.log('Fichier uploadé avec succès:', file.name);
          return url;
        } catch (error) {
          console.error('Erreur lors de l\'upload du fichier:', file.name, error);
          throw error;
        }
      });

      const newUrls = await Promise.all(uploadPromises);
      console.log('Tous les fichiers ont été uploadés:', newUrls);
      onImagesChange([...images, ...newUrls]);
    } catch (error: any) {
      console.error('Erreur globale lors de l\'upload:', error);
      onError(error.message || 'Une erreur est survenue lors de l\'upload');
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const handleDelete = async (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-yellow-500">
          <div className="text-center">
            <div className="text-4xl">+</div>
            <div className="text-sm text-gray-600">
              {type === "logo" ? "Ajouter un logo" : "Ajouter une image"}
            </div>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            multiple={type === "company"}
            onChange={handleFileChange}
            disabled={uploading || images.length >= maxImages}
          />
        </label>
        {uploading && (
          <div className="flex items-center gap-2">
            <Loader size="sm" />
            <span className="text-sm text-gray-600">Upload en cours...</span>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((url, index) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={url}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute right-2 top-2 rounded-full bg-white p-1 opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
              >
                <TrashIcon className="h-4 w-4 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
