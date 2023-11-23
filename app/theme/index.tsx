import palettes from "./palettes.js";
import * as typography from "./typography.js";

import {
  ThemeProvider as MuiThemeProvider,
  type PaletteMode,
} from "@mui/material";

import {
  atom,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from "recoil";

import { createTheme } from "@mui/material/styles";
import { components } from "./components.js";

export const ThemeName = atom<PaletteMode>({
  key: "ThemeName",
  effects: [
    (ctx) => {
      const storageKey = "theme";

      if (ctx.trigger === "get") {
        const name: PaletteMode =
          localStorage?.getItem(storageKey) === "dark"
            ? "dark"
            : localStorage?.getItem(storageKey) === "light"
            ? "light"
            : "light";

        ctx.setSelf(name);
      }

      ctx.onSet((value) => {
        localStorage?.setItem(storageKey, value);
      });
    },
  ],
});

export const Theme = selectorFamily({
  key: "Theme",
  dangerouslyAllowMutability: true,
  get(name: PaletteMode) {
    return function () {
      const { palette } = createTheme({ palette: palettes[name] });
      return createTheme(
        {
          palette,
          typography: typography.options,
          components: components(palette),
        },
        {
          typography: typography.overrides,
        },
      );
    };
  },
});

export function useTheme(name?: PaletteMode) {
  const selected = useRecoilValue(ThemeName);
  return useRecoilValue(Theme(name ?? selected));
}

export function useToggleTheme(name?: PaletteMode) {
  return useRecoilCallback(
    (ctx) => () => {
      ctx.set(
        ThemeName,
        name ?? ((prev) => (prev === "dark" ? "light" : "dark")),
      );
    },
    [],
  );
}

export function ThemeProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  return <MuiThemeProvider theme={useTheme()} {...props} />;
}
