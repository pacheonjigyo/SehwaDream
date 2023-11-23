import { type PaletteOptions } from "@mui/material/styles";

export const light: PaletteOptions = {
  mode: "light",

  primary: {
    main: "#ec6b6b",
  },

  secondary: {
    main: "#ffffff",
  },

  info: {
    main: "#2d2d2d",
  },

  background: {
    paper: "#ffffff",
    default: "#f5f7f6",
  },

  example: {
    primary: "#49b4ff",
    secondary: "#ef3054",
  },
};

export const dark: PaletteOptions = {
  mode: "dark",

  primary: {
    main: "#ec6b6b",
  },

  secondary: {
    main: "#ffffff",
  },

  info: {
    main: "#515151",
  },

  background: {
    paper: "#1f1f1f",
    default: "#2d2d2d",
  },

  example: {
    primary: "#49b4ff",
    secondary: "#ef3054",
  },
};

export default { light, dark };
declare module "@mui/material/styles" {
  interface Palette {
    example: {
      primary: string;
      secondary: string;
    };
  }

  interface PaletteOptions {
    example: {
      primary: string;
      secondary: string;
    };
  }
}
