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

import borders from "@/assets/theme-dark/base/borders";
import colors from "@/assets/theme-dark/base/colors";
import typography from "@/assets/theme-dark/base/typography";
import pxToRem from "@/assets/theme-dark/functions/pxToRem";
import rgba from "@/assets/theme-dark/functions/rgba";

const { dark, white } = colors;
const { borderRadius } = borders;
const { size } = typography;

type Types = any;

const menuItem: Types = {
  styleOverrides: {
    root: {
      minWidth: pxToRem(160),
      minHeight: "unset",
      padding: `${pxToRem(4.8)} ${pxToRem(16)}`,
      borderRadius: borderRadius.md,
      fontSize: size.sm,
      color: rgba(white.main, 0.8),
      transition: "background-color 300ms ease, color 300ms ease",

      "&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus":
        {
          backgroundColor: dark.main,
          color: white.main,
        },
    },
  },
};

export default menuItem;
