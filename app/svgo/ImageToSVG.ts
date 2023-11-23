import { init } from "esm-potrace-wasm";
import { convertToColorSVG } from "./color.js";
import { convertToMonochromeSVG } from "./monochrome.js";
import { preProcessMainCanvas } from "./preprocess.js";

export const ImageToSVG = async (url: string, color: boolean) => {
  const imageData = await preProcessMainCanvas(url);

  await init();

  return color
    ? await convertToColorSVG(imageData)
    : await convertToMonochromeSVG(imageData);
};
