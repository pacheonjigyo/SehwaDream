import ColorThief from "colorthief";

import { rgbToHex, urlToBase64 } from "./Functions.js";

export const getPaletteAsync = async (url): Promise<any> => {
  const base64 = await urlToBase64(url);

  return new Promise((res, rej) => {
    const image = new Image();

    image.onload = () => {
      const colorThief = new ColorThief();
      const [main, sub] = colorThief.getPalette(image, 2);

      const mainRgb = main.join(", ");
      const mainHex = rgbToHex(main[0], main[1], main[2]);

      const subRgb = sub.join(", ");
      const subHex = rgbToHex(sub[0], sub[1], sub[2]);

      res({
        main: {
          rgb: `${mainRgb}`,
          hex: `#${mainHex}`,
        },

        sub: {
          rgb: `${subRgb}`,
          hex: `#${subHex}`,
        },
      });
    };

    image.onerror = (e) => {
      rej(e);
    };

    image.src = base64;
  });
};
