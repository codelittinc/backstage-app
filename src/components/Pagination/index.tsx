import {
  ReactNode,
  FC,
  forwardRef,
  createContext,
  useContext,
  useMemo,
} from "react";

import Box from "@/components/Box";
import PaginationItemRoot from "./PaginationItemRoot";
const Context = createContext<any>(null);

interface Props {
  item?: boolean;
  variant?: "gradient" | "contained";
  color?:
    | "white"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  size?: "small" | "medium" | "large";
  active?: boolean;
  children: ReactNode;
  [key: string]: any;
}

const Pagination: FC<Props | any> = forwardRef(
  (
    {
      item,
      variant = "gradient",
      color = "info",
      size = "medium",
      active,
      children,
      ...rest
    },
    ref
  ) => {
    const context: any = useContext(Context);
    const paginationSize = context ? context.size : undefined;

    const providerValue = useMemo(
      () => ({
        variant,
        color,
        size,
      }),
      [variant, color, size]
    );

    return (
      <Context.Provider value={providerValue}>
        {item ? (
          <PaginationItemRoot
            {...rest}
            ref={ref}
            variant={active ? context.variant : "outlined"}
            color={active ? context.color : "secondary"}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}
          >
            {children}
          </PaginationItemRoot>
        ) : (
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ listStyle: "none" }}
          >
            {children}
          </Box>
        )}
      </Context.Provider>
    );
  }
);

Pagination.displayName = "Pagination";

export default Pagination;
