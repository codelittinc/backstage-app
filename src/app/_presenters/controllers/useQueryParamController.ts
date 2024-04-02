import { add } from "date-fns";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter, useSearchParams } from "next/navigation";

class Singleton {
  private static instance: Singleton;
  public readonly id: number;
  private router?: AppRouterInstance;
  private searchParams: URLSearchParams;
  private customParams: PropCustomParams[] = [];

  private constructor(searchParams: URLSearchParams) {
    this.id = Math.floor(Math.random() * 10000);
    this.searchParams = searchParams;
    this.initializeUrlParams();
  }

  public static getInstance(urlSearchParams: URLSearchParams): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(urlSearchParams);
    }
    return Singleton.instance;
  }

  public setRouter(router: AppRouterInstance): void {
    this.router = router;
  }

  public addParams(newParams: PropCustomParams[]): void {
    this.customParams = [...this.customParams, ...newParams].flat();

    const allParamsHash = this.customParams.reduce((acc, param) => {
      acc[param.key] = param.value;
      return acc;
    }, {});

    const urlSearchParams = new URLSearchParams();
    const newCustomParams: PropCustomParams[] = [];
    Object.keys(allParamsHash).forEach((key: string) => {
      urlSearchParams.set(key, allParamsHash[key] ?? "");
      newCustomParams.push({ key, value: allParamsHash[key] ?? "" });
    });

    this.customParams = newCustomParams;

    this.router?.replace(`?${urlSearchParams.toString()}`, { scroll: false });
  }

  public initializeUrlParams(): void {
    const urlParams = Array.from(this.searchParams.entries()).map(
      ([key, value]) => ({
        key,
        value,
      })
    );
    this.addParams(urlParams);
  }

  public getParams(): PropCustomParams[] {
    return this.customParams;
  }

  public getParamValue(
    key: string,
    defaultValue?: string | number
  ): string | number | undefined {
    const foundParam = this.customParams.find(
      (param: PropCustomParams) => param.key == key
    )?.value;

    if (foundParam != "" && foundParam != undefined) {
      return foundParam;
    }

    return defaultValue;
  }
}

interface PropCustomParams {
  defaultValue?: string | number;
  key: string;
  value?: string | number;
}

export default function useQueryParamController() {
  const router = useRouter();
  const params = useSearchParams();

  const singletonInstance1 = Singleton.getInstance(params);
  singletonInstance1.setRouter(router);

  return {
    getCustomParamValue: (key: string, defaultValue?: string | number) => {
      return singletonInstance1.getParamValue(key, defaultValue);
    },
    setCustomParams: (customParams: PropCustomParams[]) => {
      singletonInstance1.addParams(customParams);
    },
  };
}
