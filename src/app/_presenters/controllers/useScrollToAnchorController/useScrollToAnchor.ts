import { set } from "date-fns";
import { useCallback, useState } from "react";

/**
 * Custom hook to scroll to an element with a specific ID.
 *
 * @param smooth - Determines if the scroll should be smooth. Defaults to true.
 */
export function useScrollToAnchor(smooth: boolean = true) {
  const [hashes, setHashes] = useState<string[]>([]);

  const scrollTo = useCallback(
    (id: string) => {
      if (!hashes.includes(id)) {
        const element = document.getElementById(id);

        if (element) {
          setHashes([...hashes, id]);
          window.scrollTo({
            top: element.offsetTop,
            behavior: smooth ? "smooth" : "auto",
          });
        }
      }
    },
    [smooth, hashes]
  );

  return scrollTo;
}
