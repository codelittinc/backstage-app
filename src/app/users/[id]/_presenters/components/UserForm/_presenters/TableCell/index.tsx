/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { ReactNode } from "react";

import MDBox from "@/components/Box";
import MDTypography from "@/components/Typography";

interface Props {
  align?: string | any;
  children: ReactNode;
  noBorder?: boolean;
  padding?: number[];
  width?: string;
}

function TableCell({
  width,
  align,
  padding,
  noBorder,
  children,
}: Props): JSX.Element {
  return (
    <MDBox
      component="th"
      width={width}
      pt={padding[0]}
      pr={padding[1]}
      pb={padding[2]}
      pl={padding[3]}
      textAlign={align}
      sx={{
        border: ({ borders: { borderWidth }, palette: { light } }) =>
          noBorder ? 0 : `${borderWidth[1]} solid ${light.main}`,
      }}
    >
      <MDTypography component="div" variant="body2" color="text">
        {children}
      </MDTypography>
    </MDBox>
  );
}

TableCell.defaultProps = {
  width: "auto",
  align: "left",
  padding: [],
  noBorder: false,
};

export default TableCell;
