import { COLORS, filterInputs, filters, SCALE_ROTATION } from "./ui.js";

const dpr: number = window.devicePixelRatio;
const canvasMain = document.getElementById("svgCanvas") as HTMLCanvasElement;

const ctxMain = canvasMain.getContext("2d", { desynchronized: true });

if (ctxMain) {
  ctxMain.scale(dpr, dpr);
  ctxMain.imageSmoothingEnabled = true;
}

const getImageAsync = async (url: string) => {
  return new Promise<HTMLImageElement>((res, rej) => {
    const inputImage: HTMLImageElement = new Image();

    inputImage.src = url;
    inputImage.crossOrigin = "anonymous";

    inputImage.onload = () => {
      res(inputImage);
    };

    inputImage.onerror = (e) => {
      rej(e);
    };
  });
};

const preProcessMainCanvas = async (url: string) => {
  if (!ctxMain) {
    return;
  }

  const inputImage: HTMLImageElement = await getImageAsync(url);

  canvasMain.width = inputImage.width;
  canvasMain.height = inputImage.height;

  ctxMain.clearRect(0, 0, inputImage.width, inputImage.height);
  ctxMain.filter = getFilterString();
  ctxMain.setTransform(1, 0, 0, 1, inputImage.width / 2, inputImage.height / 2);

  const rotate = Number(filterInputs[SCALE_ROTATION.rotation]);

  ctxMain.rotate((rotate * Math.PI) / 180);
  ctxMain.drawImage(
    inputImage,
    (-1 * inputImage.naturalWidth) / 2,
    (-1 * inputImage.naturalHeight) / 2,
  );

  return ctxMain.getImageData(0, 0, inputImage.width, inputImage.height);
};

const getRange = (value) => {
  const array: number[] = [];

  for (let i = 0; i <= value; i++) {
    array[i] = Number(((1 / value) * i).toFixed(1));
  }

  return array;
};

const getPosterizeFilter = () => {
  return `data:image/svg+xml;utf8,<svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <filter id="posterize">
        <feComponentTransfer>
        <feFuncR type="discrete" tableValues="${getRange(
          filterInputs[COLORS.red],
        )}" />
        <feFuncG type="discrete" tableValues="${getRange(
          filterInputs[COLORS.green],
        )}" />
        <feFuncB type="discrete" tableValues="${getRange(
          filterInputs[COLORS.blue],
        )}" />
        <feFuncA type="discrete" tableValues="${getRange(
          filterInputs[COLORS.alpha],
        )}" />
        </feComponentTransfer>
      </filter>
    </svg>`
    .replace(/[\r\n]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const getCSSFilters = () => {
  let filterString = "";

  let filter: any;
  let props: any;

  for ([filter, props] of Object.entries(filters)) {
    const input = filterInputs[filter];

    if (props.initial === Number(input)) {
      continue;
    }

    filterString += `${filter}(${input}${filter.unit}) `;
  }

  return filterString;
};

const getFilterString = () => {
  let filterString = `${`url('${getPosterizeFilter()}#posterize') `}`;

  filterString += getCSSFilters();

  return filterString.trim() || "none";
};

export { preProcessMainCanvas };
