import { storage, auth } from "@/firebase/firebase.config";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const cleanFileName = (fileName: string): string => {
  return fileName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-zA-Z0-9.-]/g, '_') // Remplace les caractères spéciaux par des underscores
    .replace(/_{2,}/g, '_'); // Remplace les underscores multiples par un seul
};

export class ImageValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageValidationError";
  }
}

export const validateImage = (file: File) => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new ImageValidationError(
      "Format d'image non supporté. Utilisez JPG, PNG ou WEBP."
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new ImageValidationError(
      "L'image est trop volumineuse. Taille maximum : 5MB"
    );
  }
};

export const uploadImage = async (
  userId: string,
  file: File,
  type: "logo" | "company"
): Promise<string> => {
  try {
    // Validation
    validateImage(file);

    // Préparer le nom du fichier
    const timestamp = Date.now();
    const cleanedFileName = cleanFileName(file.name);
    const fileName = `${timestamp}-${cleanedFileName}`;

    // Créer le chemin de stockage
    const storagePath = `users/${userId}/${type}/${fileName}`;
    const storageRef = ref(storage, storagePath);

    // Convertir le File en ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    // Upload vers Storage
    const metadata = {
      contentType: file.type,
      customMetadata: {
        uploadedBy: userId,
        uploadType: type
      }
    };

    // Upload le fichier
    const uploadResult = await uploadBytes(storageRef, fileBuffer, metadata);
    
    // Récupérer l'URL
    const url = await getDownloadURL(uploadResult.ref);
    
    return url;
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    throw error;
  }
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    if (!auth.currentUser) throw new Error("Non authentifié");

    // Extraire le chemin du fichier de l'URL
    const url = new URL(imageUrl);
    const pathFromUrl = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);

    // Créer une référence au fichier
    const fileRef = ref(storage, pathFromUrl);

    // Supprimer le fichier
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    throw error;
  }
};
