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
import boxShadows from "@/assets/theme-dark/base/boxShadows";
import colors from "@/assets/theme-dark/base/colors";

const { transparent } = colors;
const { lg } = boxShadows;
const { borderRadius } = borders;

type Types = any;

const popover: Types = {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: lg,
      borderRadius: borderRadius.md,
    },
  },
};

export default popover;
