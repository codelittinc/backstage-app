import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import Autocomplete from "@/components/Autocomplete";

import useBackstageAutoCompleteController from "../../controllers/useBackstageAutocompleteController";

const BackstageAutocomplete = () => {
  const { routes } = useBackstageAutoCompleteController();
  const router = useRouter();
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "f") {
        event.preventDefault();
        if (autocompleteRef.current) {
          autocompleteRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Autocomplete
      ref={autocompleteRef}
      label=""
      placeholder="Search"
      value={null}
      getOptionLabel={(option) => option.name}
      options={routes}
      onChange={({ route }) => {
        router.push(route);
      }}
      showArrows={false}
    />
  );
};

export default BackstageAutocomplete;
