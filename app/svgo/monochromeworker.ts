import { init, potrace } from "esm-potrace-wasm";

const convertToMonochromeSVG = async (imageData, params) => {
  await init();

  const svg = await potrace(imageData, params);

  return svg;
};

self.addEventListener("message", async (e) => {
  const { imageData, params } = e.data;
  const svg = await convertToMonochromeSVG(imageData, params);

  e.ports[0].postMessage({ result: svg });
});

export default null;
