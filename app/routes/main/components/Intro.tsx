import * as React from "react";

import { Box, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { usePageEffect } from "../../../core/page.js";
import { AppContext } from "../../../stores/index.js";

export default function Intro(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  usePageEffect({ title: "세화축산" });

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "black",

          position: "relative",
        }}
      >
        <Box
          sx={{
            background: `url("/images/main01-v2.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",

            width: "100%",
            height: commonStore.baseInfo.height,

            opacity: 0.5,
          }}
        ></Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            width: "100%",
            height: commonStore.baseInfo.height,

            color: "white",
            fontSize: 60,

            position: "absolute",

            left: 0,
            top: 0,
          }}
        >
          <img
            src="/images/logo01_w.png"
            width={commonStore.isDesktop ? 400 : 300}
          />

          <Typography color="info" fontSize={commonStore.isDesktop ? 24 : 18}>
            {'"'}좋은 고기의 기준을 세우다{'"'}
          </Typography>
        </Box>
      </Box>
    </>
  ));
}
