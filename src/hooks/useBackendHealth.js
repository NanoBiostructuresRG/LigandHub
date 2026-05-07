import { useEffect, useState } from "react";
import { checkBackendHealth } from "../services/ligandhubApi";

export function useBackendHealth() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let isMounted = true;

    checkBackendHealth()
      .then(() => {
        if (isMounted) {
          setStatus("online");
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus("unavailable");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return status;
}
