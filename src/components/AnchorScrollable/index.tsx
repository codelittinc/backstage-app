import React, { useEffect, useMemo, useRef, useState } from "react";

function scrollToElement(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  }
}

const AnchorScrollable: React.FC = () => {
  const getCurrentHash = useMemo(
    () => () =>
      typeof window !== "undefined"
        ? window.location.hash.replace(/^#!?/, "")
        : "",
    []
  );

  const elementId = getCurrentHash();
  const observerRef = useRef<MutationObserver | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (hasScrolled) {
      return;
    }

    const observerCallback: MutationCallback = (mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          const element = document.getElementById(elementId);
          if (element) {
            scrollToElement(elementId);
            setHasScrolled(true);
            observer.disconnect();
            break;
          }
        }
      }
    };

    const observerOptions: MutationObserverInit = {
      childList: true,
      attributes: true,
      subtree: true,
    };

    observerRef.current = new MutationObserver(observerCallback);
    observerRef.current.observe(document.body, observerOptions);

    return () => observerRef.current?.disconnect();
  }, [elementId, hasScrolled]);

  return null;
};

export default AnchorScrollable;
