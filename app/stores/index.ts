import * as React from "react";

import { commonStore } from "./commonStore.js";

export function createStores() {
  const main = new commonStore();

  return {
    commonStore: main,
  };
}

export const stores = createStores();
export const AppContext = React.createContext(stores);
