import { useCallback } from "react";
import { useBffClient } from "../../bff/context/bff-client-context";

export const useGetEmailAvailability = () => {
  const bffClient = useBffClient();

  return useCallback(
    async function getEmailAvailability(email: string) {
      const response = await bffClient.get("/auth/email/check", {
        params: {
          email,
        },
      });

      if (response.status !== 200) {
        console.error(response.data);
        throw new Error("couldn't get email availability");
      }

      return {
        isAvailable: response.data.isAvailable,
      };
    },
    [bffClient],
  );
};
