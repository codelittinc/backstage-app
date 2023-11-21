import { useRouter } from "next/navigation";

import Autocomplete from "@/components/Autocomplete";

import useBackstageAutoCompleteController from "../../controllers/useBackstageAutocompleteController";

const BackstageAutocomplete = () => {
  const { routes } = useBackstageAutoCompleteController();
  const router = useRouter();

  return (
    <Autocomplete
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
