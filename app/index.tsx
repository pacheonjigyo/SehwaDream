import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { router } from "./routes/index.js";
import { ThemeProvider } from "./theme/index.js";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <SnackbarProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
