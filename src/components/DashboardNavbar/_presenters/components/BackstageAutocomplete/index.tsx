import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import Autocomplete from "@/components/Autocomplete";

import useBackstageAutoCompleteController from "../../controllers/useBackstageAutocompleteController";

const BackstageAutocomplete = () => {
  const { routes } = useBackstageAutoCompleteController();
  const router = useRouter();
  const autocompleteRef = useRef<HTMLInputElement>(null);

  return (
    <Autocomplete
      ref={autocompleteRef}
      label=""
      placeholder="Search"
      value={null}
      getOptionLabel={(option: { name: string }) => option.name}
      options={routes}
      onChange={({ route }) => {
        router.push(route);
      }}
      showArrows={false}
    />
  );
};

export default BackstageAutocomplete;
