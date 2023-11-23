import ColorWorker from "./colorworker.js?worker";
import { filterInputs, POTRACE } from "./ui.js";

let colorWorker: Worker | null = null;

const intervalID: any = {};

const convertToColorSVG = async (imageData) => {
  if (colorWorker) {
    colorWorker.terminate();
  }

  colorWorker = new ColorWorker();

  return new Promise((resolve) => {
    const channel = new MessageChannel();

    channel.port1.onmessage = ({ data }) => {
      channel.port1.close();

      if (colorWorker) {
        colorWorker.terminate();
        colorWorker = null;
      }

      resolve(data.result);
    };

    let prefix = "";
    let suffix = "";
    let paths = "";
    let lastLength = 0;

    if (intervalID.current) {
      clearInterval(intervalID.current);

      intervalID.current = null;
    }

    intervalID.current = setInterval(() => {
      const svg = `${prefix}${paths}${suffix}`;
      if (svg.length !== lastLength) {
        lastLength = svg.length;
      }
    }, 500);

    const progressChannel = new MessageChannel();

    progressChannel.port1.onmessage = ({ data }) => {
      if (data.svg) {
        if (!prefix) {
          prefix = data.svg
            .replace(/(.*?<svg[^>]+>)(.*?)(<\/svg>)/, "$1")
            .replace(/\s+width="\d+(?:\.\d+)?"/, "")
            .replace(/\s+height="\d+(?:\.\d+)"/, "");
          suffix = data.svg.replace(/(.*?<svg[^>]+>)(.*?)(<\/svg>)/, "$3");
        }
        const path = data.svg.replace(/(.*?<svg[^>]+>)(.*?)(<\/svg>)/, "$2");
        paths += path;
      }

      if (data.processed === data.total) {
        clearInterval(intervalID.current);
        intervalID.current = null;
        progressChannel.port1.close();
      }
    };

    const params = {
      minPathSegments: Number(filterInputs[POTRACE.minPathLength]),
      strokeWidth: Number(filterInputs[POTRACE.strokeWidth]),
      turdsize: Number(filterInputs[POTRACE.turdsize]),
      alphamax: Number(filterInputs[POTRACE.alphamax]),
      turnpolicy: Number(filterInputs[POTRACE.turnpolicy]),
      opttolerance: Number(filterInputs[POTRACE.opttolerance]),
      opticurve: 1,
      extractcolors: false,
      posterizelevel: 2, // [1, 255]
      posterizationalgorithm: 0,
    };

    if (colorWorker) {
      colorWorker.postMessage({ imageData, params }, [
        channel.port2,
        progressChannel.port2,
      ]);
    }
  });
};

export { convertToColorSVG, intervalID };
