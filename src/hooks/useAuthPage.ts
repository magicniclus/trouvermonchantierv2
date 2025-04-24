import { auth } from "@/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuthPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return { isLoading };
};
