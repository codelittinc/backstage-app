import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface PropCustomParams {
  defaultValue?: string | number;
  key: string;
  value?: string | number;
}

const updateQueryParams = (
  customParams: PropCustomParams[],
  params: any,
  router: any
) => {
  const currentParams = new URLSearchParams(params.toString());

  customParams.forEach((param) => {
    const { value } = param;
    if (value !== undefined) {
      currentParams.set(param.key, value.toString());
    }
  });

  router.replace(`?${currentParams.toString()}`, { scroll: false });
};

export default function useQueryParamController(
  customParams: PropCustomParams[] = []
) {
  const router = useRouter();
  const params = useSearchParams();

  const [customParamState, setCustomParamState] = useState<PropCustomParams[]>(
    customParams.map((param) => {
      return {
        key: param.key,
        value: params.get(param.key) || param.defaultValue,
      };
    })
  );

  return {
    getCustomParamValue: (key: string, defaultValue: string | number) => {
      const param = customParamState.find((param) => param.key === key);
      return param?.value || defaultValue;
    },
    getCustomParams: () => {
      const params: { [key: string]: string | number } = {};

      customParamState.forEach((param) => {
        params[param.key] =
          param.value !== undefined && isNaN(param.value as number)
            ? param.value
            : Number(param.value);
      });

      return params;
    },
    customParams: customParamState,
    setCustomParams: (customParams: PropCustomParams[]) => {
      const newState: PropCustomParams[] = [...customParamState];

      customParams.forEach((param) => {
        const { key, value } = param;
        const index = newState.findIndex((param) => param.key === key);

        if (index !== -1) {
          newState[index].value = value;
        } else {
          newState.push(param);
        }
      });

      updateQueryParams(customParams, params, router);
      setCustomParamState(newState);
    },
  };
}
