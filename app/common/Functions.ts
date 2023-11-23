import { ImageToSVG } from "../svgo/ImageToSVG.js";
import { readAsDataURLAsync } from "./FileManager.js";
import { getRealUrl } from "./FileUpload.js";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getLocaleTime = (ISODate: string) => {
  if (!ISODate) {
    return null;
  }

  const date = new Date(ISODate);

  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

export function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function valueToHex(c) {
  const hex = c.toString(16).padStart(2, "0");

  return hex;
}

export function rgbToHex(r, g, b) {
  return valueToHex(r) + valueToHex(g) + valueToHex(b);
}

export function hasKorean(str: string) {
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);

    if (charCode >= 0xac00 && charCode <= 0xd7a3) {
      return true;
    }
  }
  return false;
}

export async function urlToBase64(url): Promise<string> {
  const urlResp = await fetch(url);
  const urlBlob = await urlResp.blob();

  return await readAsDataURLAsync(urlBlob);
}

export async function downloadImage(
  url: string,
  filename: string,
  hd: boolean,
) {
  const splitted = url.split(".");
  const realUrl = getRealUrl(url);

  let blob: Blob | null = null;
  let exts: string | null = null;

  if (hd) {
    const svg: any = await ImageToSVG(realUrl, true);

    blob = new Blob([svg], { type: "image/svg+xml" });
    exts = "svg";
  } else {
    const resp = await fetch(realUrl);

    blob = await resp.blob();
    exts = splitted[splitted.length - 1];
  }

  if (!blob) {
    return;
  }

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = `Logo_${filename}.${exts}`;
  link.style.display = "none";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}
