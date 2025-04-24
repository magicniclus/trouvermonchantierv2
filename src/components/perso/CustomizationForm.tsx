/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { auth } from "@/firebase/firebase.config";
import {
  getCustomization,
  subscribeToCustomization,
  updateCustomization,
} from "@/services/customization.service";
import { Customization } from "@/types/client";
import { REGEX } from "@/utils/regex";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { uploadImage, deleteImage } from "@/services/storage.service";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function CustomizationForm() {
  const [customization, setCustomization] = useState<Customization | null>(
    null
  );
  const [showOtherActivityInput, setShowOtherActivityInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(auth.currentUser);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadInitialData = async () => {
      try {
        const data = await getCustomization(user.uid);
        if (data) {
          setCustomization(data);
        } else {
          const defaultData: Customization = {
            company_name: "",
            legal_name: "",
            activity_sector: "",
            description: "",
            zone_intervention: {
              city: "",
              postal_code: "",
              radius_km: 0,
            },
            custom_domain: "",
            ssl_status: "",
            google_ads_tag: "",
            contact: {
              email: "",
              phone: "",
              address: "",
              siret: "",
              company_type: "",
            },
            logo_url: "",
            has_logo: false,
            colors: {
              primary: "",
              secondary: "",
            },
            images_uploaded: [],
            link_comment: "",
            certifications: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            siteIsOk: false,
          };
          await updateCustomization(user.uid, defaultData);
          setCustomization(defaultData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = subscribeToCustomization(user.uid, (data) => {
      if (data) setCustomization(data);
    });

    loadInitialData();
    return () => unsubscribe();
  }, [user]);

  // Validation functions
  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const isValidPhone = (phone: string) => {
    const regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return regex.test(phone);
  };

  const isValidSiret = (siret: string) => {
    const regex = /^\d{14}$/;
    return regex.test(siret);
  };

  const isValidPostalCode = (postalCode: string) => {
    const regex = /^\d{5}$/;
    return regex.test(postalCode);
  };

  const isValidGoogleAdsTag = (tag: string) => {
    return REGEX.GOOGLE_ADS_TAG.test(tag);
  };

  const isFormValid = useCallback(() => {
    if (!customization) return false;
    return Boolean(
      customization.company_name &&
        customization.legal_name &&
        customization.activity_sector &&
        customization.description &&
        customization.zone_intervention?.postal_code &&
        isValidPostalCode(customization.zone_intervention?.postal_code || "") &&
        customization.contact?.email &&
        isValidEmail(customization.contact?.email || "") &&
        customization.contact?.phone &&
        isValidPhone(customization.contact?.phone || "") &&
        customization.contact?.address &&
        customization.contact?.siret &&
        isValidSiret(customization.contact?.siret || "") &&
        customization.contact?.company_type &&
        customization.google_ads_tag &&
        isValidGoogleAdsTag(customization.google_ads_tag)
    );
  }, [customization]);

  const handleImageError = (error: string) => {
    setError(error);
  };

  const handleImagesChange = async (urls: string[], type: "logo" | "company") => {
    if (!customization || !user) return;

    // Trouver les images qui ont été supprimées
    const currentImages = type === "logo" 
      ? [customization.logo_url].filter(Boolean)
      : customization.images_uploaded || [];
    const deletedImages = currentImages.filter(url => !urls.includes(url));

    // Supprimer les images du storage
    try {
      await Promise.all(deletedImages.map(url => deleteImage(url)));
    } catch (error) {
      console.error("Erreur lors de la suppression des images:", error);
    }

    // Mettre à jour le customization
    const updatedData = {
      ...customization,
      updated_at: new Date().toISOString(),
      ...(type === "logo" 
        ? { 
            logo_url: urls[0] || "",
            has_logo: urls.length > 0
          }
        : { images_uploaded: urls }
      )
    };

    setCustomization(updatedData);
    try {
      await updateCustomization(user.uid, updatedData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customization || !user || !isFormValid()) return;

    try {
      const updatedData = {
        ...customization,
        siteIsOk: true,
        updated_at: new Date().toISOString(),
      };

      await updateCustomization(user.uid, updatedData);
      setCustomization(updatedData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Fonction de sauvegarde avec debounce
  const save = async (
    isFormComplete: boolean = false,
    updateSiteStatus: boolean = false
  ) => {
    try {
      if (!user || !customization) return;

      const updatedData: Customization = {
        company_name: customization.company_name || "",
        legal_name: customization.legal_name || "",
        activity_sector: customization.activity_sector || "",
        description: customization.description || "",
        zone_intervention: {
          city: customization.zone_intervention?.city || "",
          postal_code: customization.zone_intervention?.postal_code || "",
          radius_km: customization.zone_intervention?.radius_km || 0,
        },
        custom_domain: customization.custom_domain || "",
        ssl_status: customization.ssl_status || "",
        contact: {
          email: customization.contact?.email || "",
          phone: customization.contact?.phone || "",
          address: customization.contact?.address || "",
          siret: customization.contact?.siret || "",
          company_type: customization.contact?.company_type || "",
        },
        logo_url: customization.logo_url || "",
        has_logo: customization.has_logo || false,
        colors: {
          primary: customization.colors?.primary || "",
          secondary: customization.colors?.secondary || "",
        },
        images_uploaded: customization.images_uploaded || [],
        link_comment: customization.link_comment || "",
        certifications: customization.certifications || [],
        created_at: customization.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
        siteIsOk: updateSiteStatus
          ? isFormComplete
          : customization.siteIsOk || false,
        google_ads_tag: customization.google_ads_tag,
        other_activity_sector: customization.other_activity_sector,
      };

      await updateCustomization(user.uid, updatedData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const debouncedSave = useCallback(
    debounce((data: Customization) => {
      if (!user) return;

      const save = async () => {
        try {
          const isFormComplete = Boolean(
            data.company_name &&
              data.legal_name &&
              data.activity_sector &&
              data.description &&
              data.zone_intervention?.postal_code &&
              data.contact?.email &&
              data.contact?.phone
          );

          const updatedData = {
            ...data,
            siteIsOk: isFormComplete,
            updated_at: new Date().toISOString(),
          };

          await updateCustomization(user.uid, updatedData);
        } catch (error) {
          console.error("Error saving data:", error);
        }
      };
      save();
    }, 1000),
    [user]
  );

  const handleChange = async (field: string, value: any) => {
    if (!customization) return;

    if (field === "activity_sector") {
      setShowOtherActivityInput(value === "autre");
      if (value !== "autre" && customization.other_activity_sector) {
        const { other_activity_sector, ...rest } = customization;
        const updatedData = rest as Customization;
        setCustomization(updatedData);
        try {
          if (!user) return;
          await updateCustomization(user.uid, {
            ...updatedData,
            updated_at: new Date().toISOString(),
            siteIsOk: customization.siteIsOk,
          });
        } catch (error) {
          console.error("Error saving data:", error);
        }
        return;
      }
    }

    const updateNestedField = (obj: any, path: string[], value: any): any => {
      if (path.length === 1) {
        return { ...obj, [path[0]]: value };
      }
      const [current, ...rest] = path;
      return {
        ...obj,
        [current]: updateNestedField(obj[current] || {}, rest, value),
      };
    };

    const fieldPath = field.split(".");
    const updatedData = updateNestedField(customization, fieldPath, value);

    setCustomization(updatedData);

    try {
      if (!user) return;
      await updateCustomization(user.uid, {
        ...updatedData,
        updated_at: new Date().toISOString(),
        siteIsOk: customization.siteIsOk, // Garde la valeur existante de siteIsOk
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  if (!user)
    return <div>Vous devez être connecté pour accéder à cette page.</div>;
  if (loading) return <div>Chargement des données...</div>;
  if (!customization) return <div>Initialisation des données...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Informations de l&apos;entreprise
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Ces informations sont nessaissaires pour que votre site soit
            optimisé et respecte les droits européens.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="company_name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nom de l&apos;entreprise*{" "}
                <span className="text-gray-600 text-xs">
                  (Le nom qui apparaitra en premier sur votre site)
                </span>
              </label>
              <div className="mt-2">
                <input
                  id="company_name"
                  name="company_name"
                  type="text"
                  value={customization?.company_name || ""}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                  className="block w-full border border-input rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="legal_name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nom légal*{" "}
                <span className="text-gray-600 text-xs">
                  (Le nom legal de votre entreprise)
                </span>
              </label>
              <div className="mt-2">
                <input
                  id="legal_name"
                  name="legal_name"
                  type="text"
                  value={customization?.legal_name || ""}
                  onChange={(e) => handleChange("legal_name", e.target.value)}
                  className="block w-full border border-input rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="activity_sector"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Secteur d&apos;activité*{" "}
                <span className="text-gray-600 text-xs">
                  (Un secteur par site entreprise)
                </span>
              </label>
              <div className="mt-2">
                <Select
                  value={customization?.activity_sector || ""}
                  onValueChange={(value) =>
                    handleChange("activity_sector", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="couvreur_charpentier">
                        Couvreur - Charpentier
                      </SelectItem>
                      <SelectItem value="cuisiniste">Cuisiniste</SelectItem>
                      <SelectItem value="decorateur_architecte">
                        Décorateur - Architecte d&apos;intérieur
                      </SelectItem>
                      <SelectItem value="demenageur">Déménageur</SelectItem>
                      <SelectItem value="diagnostiqueur">
                        Diagnostiqueur (immobilier, traitement, bureau
                        d&apos;études)
                      </SelectItem>
                      <SelectItem value="ebeniste">Ébéniste</SelectItem>
                      <SelectItem value="electricien">Électricien</SelectItem>
                      <SelectItem value="entreprise_generale">
                        Entreprise générale
                      </SelectItem>
                      <SelectItem value="facade">Façadier</SelectItem>
                      <SelectItem value="fermetures">
                        Fermetures (portes, fenêtres, volets)
                      </SelectItem>
                      <SelectItem value="isolation">Isolation</SelectItem>
                      <SelectItem value="maconnerie">Maçonnerie</SelectItem>
                      <SelectItem value="menuisier">Menuisier</SelectItem>
                      <SelectItem value="metallier">
                        Métallier - Serrurier
                      </SelectItem>
                      <SelectItem value="peintre">Peintre</SelectItem>
                      <SelectItem value="pisciniste">Pisciniste</SelectItem>
                      <SelectItem value="platrier">Plâtrier</SelectItem>
                      <SelectItem value="plombier">
                        Plombier - Chauffagiste
                      </SelectItem>
                      <SelectItem value="revetements">
                        Revêtements sols et murs
                      </SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {showOtherActivityInput && (
                <div className="mt-2">
                  <input
                    type="text"
                    id="other_activity_sector"
                    name="other_activity_sector"
                    placeholder="Précisez votre activité"
                    value={customization?.other_activity_sector || ""}
                    onChange={(e) =>
                      handleChange("other_activity_sector", e.target.value)
                    }
                    className={`block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${
                      !customization?.other_activity_sector &&
                      showOtherActivityInput
                        ? "border-red-500"
                        : "border-input outline-gray-300"
                    } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6`}
                  />
                  {!customization?.other_activity_sector &&
                    showOtherActivityInput && (
                      <p className="mt-1 text-sm text-red-500">
                        La précision de votre activité est obligatoire
                      </p>
                    )}
                </div>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description de l&apos;entreprise*{" "}
                <span className="text-gray-600 text-xs">
                  (Une description de votre entreprise nous permettra
                  d&apos;optimiser au mieux votre site)
                </span>
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={customization?.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="block w-full border border-input rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="logo" className="block text-sm/6 font-medium text-gray-900">
                Logo de l&apos;entreprise
              </label>
              <div className="mt-2">
                {customization?.logo_url ? (
                  <div className="flex items-center gap-x-4">
                    <Image
                      src={customization.logo_url}
                      alt="Logo de l'entreprise"
                      width={48}
                      height={48}
                      className="size-12 object-contain"
                    />
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={async () => {
                        try {
                          if (!user) return;
                          await deleteImage(customization.logo_url);
                          console.log("Logo supprimé avec succès");
                          handleChange("logo_url", "");
                          handleChange("has_logo", false);
                        } catch (error) {
                          console.error("Erreur lors de la suppression du logo:", error);
                          setError("Erreur lors de la suppression du logo");
                        }
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm/6 text-gray-600">
                        <label
                          htmlFor="logo-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-slate-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-slate-500"
                        >
                          <span>Ajouter un logo</span>
                          <input
                            id="logo-upload"
                            name="logo-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={async (e) => {
                              try {
                                const file = e.target.files?.[0];
                                if (!file || !user) return;

                                console.log("Début de l'upload du logo...");
                                const logoUrl = await uploadImage(user.uid, file, "logo");
                                console.log("Logo uploadé avec succès:", logoUrl);

                                handleChange("logo_url", logoUrl);
                                handleChange("has_logo", true);
                              } catch (error) {
                                console.error("Erreur lors de l'upload du logo:", error);
                                setError("Erreur lors de l'upload du logo. Vérifiez le format et la taille du fichier.");
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="images" className="block text-sm/6 font-medium text-gray-900">
                Images de l&apos;entreprise{" "}
                <span className="text-gray-600 text-xs">
                  (Suivant la qualité, les images fournis ne seront pas forcément affichées)
                </span>
              </label>
              <div className="mt-2">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {customization?.images_uploaded?.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={async () => {
                          try {
                            if (!user) return;
                            await deleteImage(imageUrl);
                            console.log(`Image ${index + 1} supprimée avec succès`);
                            const updatedImages = customization.images_uploaded.filter(url => url !== imageUrl);
                            handleChange("images_uploaded", updatedImages);
                          } catch (error) {
                            console.error("Erreur lors de la suppression de l'image:", error);
                            setError("Erreur lors de la suppression de l'image");
                          }
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="images-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-slate-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-slate-500"
                      >
                        <span>Ajouter des images</span>
                        <input
                          id="images-upload"
                          name="images-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          onChange={async (e) => {
                            try {
                              const files = Array.from(e.target.files || []);
                              if (files.length === 0 || !user) return;

                              console.log(`Début de l'upload de ${files.length} images...`);
                              const uploadPromises = files.map(file => uploadImage(user.uid, file, "company"));
                              const imageUrls = await Promise.all(uploadPromises);
                              console.log("Images uploadées avec succès:", imageUrls);

                              const existingImages = customization?.images_uploaded || [];
                              handleChange("images_uploaded", [...existingImages, ...imageUrls]);
                            } catch (error) {
                              console.error("Erreur lors de l'upload des images:", error);
                              setError("Erreur lors de l'upload des images. Vérifiez le format et la taille des fichiers.");
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="custom_domain" className="block text-sm/6 font-medium text-gray-900">
                Nom de domaine personnalisé
              </label>
              <div className="mt-2">
                <input
                  id="custom_domain"
                  name="custom_domain"
                  type="text"
                  value={customization?.custom_domain || ""}
                  onChange={(e) => handleChange("custom_domain", e.target.value)}
                  className="block w-full border border-input rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Zone d&apos;intervention
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Définissez votre zone géographique d&apos;intervention
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="city"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Ville ou région ou département*
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={customization?.zone_intervention?.city || ""}
                  onChange={(e) =>
                    handleChange("zone_intervention.city", e.target.value)
                  }
                  className="block w-full border border-input rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="postal_code"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Code postal*{" "}
                <span className="text-gray-600 text-xs">
                  (Le code postal de l&apos;épicentre de votre activité)
                </span>
              </label>
              <div className="mt-2">
                <input
                  id="postal_code"
                  name="postal_code"
                  type="text"
                  value={customization?.zone_intervention?.postal_code || ""}
                  onChange={(e) =>
                    handleChange(
                      "zone_intervention.postal_code",
                      e.target.value
                    )
                  }
                  className={`block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${
                    customization?.zone_intervention?.postal_code &&
                    !isValidPostalCode(
                      customization.zone_intervention.postal_code
                    )
                      ? "border-red-500"
                      : "border-input outline-gray-300"
                  } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6`}
                  placeholder="ex: 75001"
                />
                {customization?.zone_intervention?.postal_code &&
                  !isValidPostalCode(
                    customization.zone_intervention.postal_code
                  ) && (
                    <p className="mt-1 text-sm text-red-500">
                      Le code postal doit contenir 5 chiffres
                    </p>
                  )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="radius_km"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Rayon d&apos;intervention (km)*
              </label>
              <div className="mt-2">
                <input
                  id="radius_km"
                  name="radius_km"
                  type="number"
                  min="0"
                  value={customization?.zone_intervention?.radius_km || 0}
                  onChange={(e) =>
                    handleChange(
                      "zone_intervention.radius_km",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="block w-full border border-input rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Contact</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Ces informations seront affichées sur votre site
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="contact_email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email*
              </label>
              <div className="mt-2">
                <input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  value={customization?.contact?.email || ""}
                  onChange={(e) =>
                    handleChange("contact.email", e.target.value)
                  }
                  className={`block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${
                    customization?.contact?.email &&
                    !isValidEmail(customization.contact.email)
                      ? "border-red-500"
                      : "border-input outline-gray-300"
                  } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6`}
                />
                {customization?.contact?.email &&
                  !isValidEmail(customization.contact.email) && (
                    <p className="mt-1 text-sm text-red-500">
                      Format d&apos;email invalide
                    </p>
                  )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="contact_phone"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Téléphone*
              </label>
              <div className="mt-2">
                <input
                  id="contact_phone"
                  name="contact_phone"
                  type="tel"
                  value={customization?.contact?.phone || ""}
                  onChange={(e) =>
                    handleChange("contact.phone", e.target.value)
                  }
                  className={`block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${
                    customization?.contact?.phone &&
                    !isValidPhone(customization.contact.phone)
                      ? "border-red-500"
                      : "border-input outline-gray-300"
                  } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6`}
                  placeholder="ex: 0612345678"
                />
                {customization?.contact?.phone &&
                  !isValidPhone(customization.contact.phone) && (
                    <p className="mt-1 text-sm text-red-500">
                      Format de téléphone invalide (ex: 0612345678)
                    </p>
                  )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="contact_address"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Adresse*
              </label>
              <div className="mt-2">
                <input
                  id="contact_address"
                  name="contact_address"
                  type="text"
                  value={customization?.contact?.address || ""}
                  onChange={(e) =>
                    handleChange("contact.address", e.target.value)
                  }
                  className="block w-full border border-input rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="contact_siret"
                className="block text-sm/6 font-medium text-gray-900"
              >
                SIRET*
              </label>
              <div className="mt-2">
                <input
                  id="contact_siret"
                  name="contact_siret"
                  type="text"
                  value={customization?.contact?.siret || ""}
                  onChange={(e) =>
                    handleChange("contact.siret", e.target.value)
                  }
                  className={`block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${
                    customization?.contact?.siret &&
                    !isValidSiret(customization.contact.siret)
                      ? "border-red-500"
                      : "border-input outline-gray-300"
                  } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6`}
                  placeholder="14 chiffres"
                />
                {customization?.contact?.siret &&
                  !isValidSiret(customization.contact.siret) && (
                    <p className="mt-1 text-sm text-red-500">
                      Le SIRET doit contenir exactement 14 chiffres
                    </p>
                  )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="company_type"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Type d&apos;entreprise*
              </label>
              <div className="mt-2">
                <Select
                  value={customization?.contact?.company_type || ""}
                  onValueChange={(value) =>
                    handleChange("contact.company_type", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Auto-entrepreneur">
                        Auto-entrepreneur
                      </SelectItem>
                      <SelectItem value="Artisan">
                        Artisan (entreprise individuelle)
                      </SelectItem>
                      <SelectItem value="EIRL">
                        EIRL (Entreprise Individuelle à Responsabilité Limitée)
                      </SelectItem>
                      <SelectItem value="SARL">
                        SARL (Société à Responsabilité Limitée)
                      </SelectItem>
                      <SelectItem value="EURL">
                        EURL (Entreprise Unipersonnelle à Responsabilité
                        Limitée)
                      </SelectItem>
                      <SelectItem value="SAS">
                        SAS (Société par Actions Simplifiée)
                      </SelectItem>
                      <SelectItem value="SASU">
                        SASU (Société par Actions Simplifiée Unipersonnelle)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 mt-10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Google Ads
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 mb-4">
            Ajoutez votre balise Google Ads si vous souhaitez suivre les
            conversions.
          </p>
          <a
            href="/dashboard/google-ads"
            className="text-gray-700 text-sm inline mt-4 underline"
          >
            Comment trouver la balise Google Ads ?
          </a>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div>
              <label
                htmlFor="google_ads_tag"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Balise Google Ads <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    AW-
                  </span>
                  <input
                    type="text"
                    id="google_ads_tag"
                    name="google_ads_tag"
                    value={(customization?.google_ads_tag || "").replace(
                      "AW-",
                      ""
                    )}
                    onChange={(e) => {
                      // Ne garder que les chiffres et limiter à 9 chiffres
                      const numbersOnly = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 9);
                      handleChange("google_ads_tag", `AW-${numbersOnly}`);
                    }}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="123456789"
                    inputMode="numeric"
                    pattern="\d*"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Exemple : AW-123456789 (format requis)
                </p>
                {customization?.google_ads_tag &&
                  !isValidGoogleAdsTag(customization.google_ads_tag) && (
                    <p className="mt-2 text-sm text-red-600">
                      La balise doit être au format AW-123456789 (exactement 9
                      chiffres)
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Certifications{" "}
            <span className="text-gray-600 text-xs">(RGE, RNCP, etc.)</span>
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Ajoutez vos certifications professionnelles si vous en avez.
          </p>
          <div className="mt-4 space-y-2">
            {customization?.certifications?.map((certification, index) => (
              <div key={index} className="flex items-center gap-x-2">
                <input
                  type="text"
                  value={certification}
                  onChange={(e) => {
                    const newCertifications = [
                      ...(customization?.certifications || []),
                    ];
                    newCertifications[index] = e.target.value;
                    handleChange("certifications", newCertifications);
                  }}
                  className="block w-full border border-input rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-900 sm:text-sm/6"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newCertifications = [
                      ...(customization?.certifications || []),
                    ];
                    newCertifications.splice(index, 1);
                    handleChange("certifications", newCertifications);
                  }}
                  className="rounded-md bg-red-500 px-2 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-red-400"
                >
                  Supprimer
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newCertifications = [
                  ...(customization?.certifications || []),
                  "",
                ];
                handleChange("certifications", newCertifications);
              }}
              className="mt-2 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-400"
            >
              Ajouter une certification
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-x-6">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 ${
              isFormValid()
                ? "bg-yellow-500 hover:bg-yellow-400"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {customization?.siteIsOk
              ? "Informations validées"
              : "Soumettre mes informations"}
          </button>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-x-6">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 ${
              isFormValid()
                ? "bg-yellow-500 hover:bg-yellow-400"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {customization?.siteIsOk
              ? "Informations validées"
              : "Soumettre mes informations"}
          </button>
        </div>
      </div>
    </form>
  );
}

