import { useEffect, useState } from "react";
import { loadPortfolioData } from "../data/content";
import type { PortfolioData } from "../types/portfolio";

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    loadPortfolioData()
      .then((content) => {
        if (active) setData(content);
      })
      .catch((reason: unknown) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : "Unable to load portfolio content.");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { data, error };
};

