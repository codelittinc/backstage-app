import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const updateQueryParams = (
  key: string,
  value: string | number,
  params: any,
  router: any
) => {
  const currentParams = new URLSearchParams(params.toString());
  currentParams.set(key, value.toString());
  router.replace(`?${currentParams.toString()}`, { scroll: false });
};

export default function useQueryParamController(
  paramKey: string,
  defaultValue: any
) {
  const router = useRouter();
  const params = useSearchParams();
  const paramValue = params.get(paramKey);
  const [paramState, setParamState] = useState(paramValue ?? defaultValue);

  return {
    paramValue: paramState,
    setParamValue: (value: string | number) => {
      setParamState(value);
      updateQueryParams(paramKey, value, params, router);
    },
  };
}
