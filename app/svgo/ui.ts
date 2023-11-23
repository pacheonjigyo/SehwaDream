/**
 * SVGcode—Convert raster images to SVG vector graphics
 * Copyright (C) 2021 Google LLC
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

const COLOR = "color";
const MONOCHROME = "monochrome";

const PERCENT = "%";
const DEGREES = "deg";

const FILTERS = {
  brightness: "brightness",
  contrast: "contrast",
  grayscale: "grayscale",
  hueRotate: "hue-rotate",
  invert: "invert",
  opacity: "opacity",
  saturate: "saturate",
  sepia: "sepia",
};

const COLORS = { red: "red", green: "green", blue: "blue", alpha: "alpha" };

const SCALE_ROTATION = { scale: "scale", rotation: "rotation" };

const POTRACE = {
  minPathLength: "minPathSegments",
  strokeWidth: "strokeWidth",
  turdsize: "turdsize",
  alphamax: "alphamax",
  turnpolicy: "turnpolicy",
  opticurve: "opticurve",
  opttolerance: "opttolerance",
};

const filters = {
  [FILTERS.brightness]: { unit: PERCENT, initial: 100, min: 0, max: 200 },
  [FILTERS.contrast]: { unit: PERCENT, initial: 100, min: 0, max: 200 },
  [FILTERS.grayscale]: { unit: PERCENT, initial: 0, min: 0, max: 100 },
  [FILTERS.hueRotate]: { unit: DEGREES, initial: 0, min: 0, max: 360 },
  [FILTERS.invert]: { unit: PERCENT, initial: 0, min: 0, max: 100 },
  [FILTERS.opacity]: { unit: PERCENT, initial: 100, min: 0, max: 100 },
  [FILTERS.saturate]: { unit: PERCENT, initial: 100, min: 0, max: 200 },
  [FILTERS.sepia]: { unit: PERCENT, initial: 0, min: 0, max: 100 },
};

const filterInputs = {
  turdsize: 2,
  strokeWidth: 0,
  minPathSegments: 0,
  alphamax: 1.0,
  turnpolicy: 4,
  opttolerance: 0.2,
  red: 5,
  green: 5,
  blue: 5,
  alpha: 1,
  scale: 100,
  rotation: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  "hue-rotate": 0,
  invert: 0,
  opacity: 100,
  saturate: 100,
  sepia: 0,
};

export {
  filters,
  filterInputs,
  COLORS,
  SCALE_ROTATION,
  POTRACE,
  MONOCHROME,
  COLOR,
};
