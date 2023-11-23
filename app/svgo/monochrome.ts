import MonoChromeWorker from "./monochromeworker.js?worker";
import { filterInputs, POTRACE } from "./ui.js";

let monochromeSVGWorker: Worker | null = null;

const convertToMonochromeSVG = async (imageData) => {
  if (monochromeSVGWorker) {
    monochromeSVGWorker.terminate();
  }

  monochromeSVGWorker = new MonoChromeWorker();

  return new Promise((resolve) => {
    const channel = new MessageChannel();

    channel.port1.onmessage = ({ data }) => {
      channel.port1.close();

      if (monochromeSVGWorker) {
        monochromeSVGWorker.terminate();
        monochromeSVGWorker = null;
      }

      resolve(data.result);
    };

    const params = {
      turdsize: Number(filterInputs[POTRACE.turdsize]),
      alphamax: Number(filterInputs[POTRACE.alphamax]),
      turnpolicy: Number(filterInputs[POTRACE.turnpolicy]),
      opttolerance: Number(filterInputs[POTRACE.opttolerance]),
      opticurve: 1,
      extractcolors: false,
    };

    if (monochromeSVGWorker) {
      monochromeSVGWorker.postMessage({ imageData, params }, [channel.port2]);
    }
  });
};

export { convertToMonochromeSVG };
