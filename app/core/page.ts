import * as React from "react";

import { useLocation } from "react-router-dom";
import { config } from "./config.js";

export function usePageEffect(
  options?: Options,
  deps: React.DependencyList = [],
) {
  const location = useLocation();

  React.useEffect(() => {
    const previousTitle = document.title;

    document.title =
      location.pathname === "/"
        ? options?.title ?? config.app.name
        : options?.title
        ? `${options.title} - ${config.app.name}`
        : config.app.name;

    return function () {
      document.title = previousTitle;
    };
  }, [
    ...deps /* eslint-disable-line react-hooks/exhaustive-deps */,
    location,
    options?.title,
  ]);
}

type Options = {
  title?: string;
  /** @default true */
  trackPageView?: boolean;
};
