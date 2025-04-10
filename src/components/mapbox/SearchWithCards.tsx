/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Input } from "@/components/ui/input";
import { updateProspect } from "@/firebase/database";
import mapboxgl, { Map } from "mapbox-gl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

interface Suggestion {
  id: string;
  place_name: string;
  geometry: {
    coordinates: [number, number];
  };
}

const SearchWithCards: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [metier, setMetier] = useState<string>("");
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [2.213749, 46.227638],
        zoom: 5,
        interactive: false,
      });

      mapRef.current.on("load", () => {
        const mapboxLogo = document.querySelector(".mapboxgl-ctrl-logo");
        const mapboxAttribution = document.querySelector(
          ".mapboxgl-ctrl-attrib-inner"
        );
        if (mapboxLogo) mapboxLogo.remove();
        if (mapboxAttribution) mapboxAttribution.remove();
      });
    }

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    const metierParam = searchParams?.get("metier");
    if (metierParam) {
      setMetier(metierParam);
    }
    const uidParam = searchParams?.get("uid");
    if (uidParam) {
      setUid(uidParam);
    }
  }, [searchParams]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 2) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${mapboxgl.accessToken}&country=fr&types=place`
      );
      const data = await response.json();

      const citySuggestions = data.features.filter((feature: any) =>
        feature.place_type.includes("place")
      );

      setSuggestions(citySuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setCoordinates(suggestion.geometry.coordinates);
    setInput(suggestion.place_name);
    setSuggestions([]);

    const generateRandomNumber = () => {
      const min = 8;
      const max = 18;
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      setRandomNumber(random);
    };
    generateRandomNumber();

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: suggestion.geometry.coordinates,
        zoom: 10,
        essential: true,
      });
    }
  };

  const handleContinueClick = async () => {
    if (!uid || !coordinates) return;

    const data = {
      address: input,
      lat: coordinates[1],
      lng: coordinates[0],
    };

    try {
      await updateProspect(uid, data);
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("address", input);
      queryParams.set("lat", coordinates[1].toString());
      queryParams.set("lng", coordinates[0].toString());
      router.push(`/secteur/rendez-vous?${queryParams.toString()}`);
    } catch (error) {
      console.error("Failed to update prospect: ", error);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] max-w-5xl mx-auto px-4 md:px-0">
      <div className="absolute top-10 left-10 z-10 w-1/2">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Saisir une ville"
          className="w-full px-4 py-3 border rounded-md shadow-sm"
        />
        <ul className="absolute top-full left-0 w-full max-w-[200px] bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto z-20">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      </div>
      <div ref={mapContainerRef} className="w-full h-full min-h-[500px]" />
      {randomNumber !== null && coordinates && (
        <>
          <div className="text-center">
            Aujourd&apos;hui,{" "}
            <span className="text-yellow-500 font-semibold">
              {randomNumber} personnes
            </span>{" "}
            recherche un professionnel dans votre secteur dans le domaine:{" "}
            <span className="text-yellow-500 font-semibold">{metier}</span> !
          </div>
          <div className="w-full flex justify-end items-end mt-10">
            <button
              onClick={handleContinueClick}
              className="py-2 px-3 rounded-md bg-yellow-500 text-white w-max"
              disabled={!coordinates}
            >
              Continuer
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchWithCards;
