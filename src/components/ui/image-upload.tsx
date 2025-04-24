"use client";

import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";
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

  const { user } = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      const error = `Vous ne pouvez pas ajouter plus de ${maxImages} image${
        maxImages > 1 ? "s" : ""
      }`;
      onError(error);
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await user?.getIdToken()}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'upload");
        }

        const data = await response.json();
        return data.url;
      });

      const newUrls = await Promise.all(uploadPromises);
      onImagesChange([...images, ...newUrls]);
    } catch (error: any) {
      console.error("Erreur lors de l'upload:", error);
      onError(error.message || "Une erreur est survenue lors de l'upload");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (index: number) => {
    try {
      // Supprimer l'image de Firebase Storage
      const imageUrl = images[index];
      await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user?.getIdToken()}`,
        },
        body: JSON.stringify({ url: imageUrl }),
      });

      // Mettre à jour le state local
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error);
      onError(error.message || "Une erreur est survenue lors de la suppression");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 hover:border-yellow-500">
          <div className="text-center">
            <div className="text-2xl">+</div>
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
        <div className="grid grid-cols-6 gap-1 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
          {images.map((url, index) => (
            <div
              key={url}
              className="group relative w-10 h-10 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center"
            >
              <Image
                src={url}
                alt={`Image ${index + 1}`}
                width={32}
                height={32}
                className="object-contain max-w-[32px] max-h-[32px]"
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute right-0.5 top-0.5 rounded-full bg-white p-0.5 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
              >
                <TrashIcon className="h-2.5 w-2.5 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
