import { useEffect, useState } from "react";
import { loadPrototypeLimits } from "../services/ligandhubApi";

export function usePrototypeLimits() {
  const [limits, setLimits] = useState(null);
  const [notes, setNotes] = useState([]);
  const [serviceMode, setServiceMode] = useState("");
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadPrototypeLimits()
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setLimits(data?.limits || null);
        setNotes(data?.notes || []);
        setServiceMode(data?.service_mode || "");
        setLoading(false);
        setLoaded(true);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setLimits(null);
        setNotes([]);
        setServiceMode("");
        setLoading(false);
        setLoaded(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { limits, notes, serviceMode, loading, loaded };
}
