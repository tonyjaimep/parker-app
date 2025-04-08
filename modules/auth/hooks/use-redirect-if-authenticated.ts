import { Href, useRouter } from "expo-router";
import { useIsAuthenticated } from "../context/auth-context";
import { useEffect } from "react";

export const useRedirectIfAuthenticated = (target?: Href) => {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(target || "/");
    }
  }, [isAuthenticated, router]);
};
