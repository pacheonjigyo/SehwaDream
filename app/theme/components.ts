import { type Palette, type ThemeOptions } from "@mui/material/styles";

export const components = (palette: Palette): ThemeOptions["components"] => ({
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "unset",
        fontWeight: "bold",
      },

      contained: {
        boxShadow: "none",
        "&:hover": {
          background: "white",
          color: "#333333",

          boxShadow: "none",
        },
      },
      text: {
        "&:hover": {
          background: "transparent",
          color: "#ec6b6b",
        },

        "&:disabled": {
          color: "white",
          opacity: 0.38,
        },
      },
      containedInherit: {
        background: palette.mode === "light" ? "whitesmoke" : "#333333",

        "&:hover": {
          background: "white",
          color: "#333333",

          boxShadow: "none",
        },
      },
    },
  },

  MuiButtonGroup: {
    styleOverrides: {
      root: {
        boxShadow: "none",
      },
    },
  },

  // MuiTypography: {
  //   styleOverrides: {
  //     root: {
  //       color: "#333333",
  //     },
  //   },
  // },
});
