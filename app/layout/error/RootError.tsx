import * as React from "react";

import { Box, Container, Link, Typography, useTheme } from "@mui/material";
import { useObserver } from "mobx-react";
import { useRouteError } from "react-router-dom";
import { initEnvironment } from "../../common/Environment.js";
import Image from "../../common/Image.js";
import { Link as NavLink } from "../../common/Link.js";
import { AppContext } from "../../stores/index.js";

export function RootError(): JSX.Element {
  const theme = useTheme();
  const { commonStore } = React.useContext(AppContext);

  const err = useRouteError() as RouteError;

  React.useEffect(() => {
    initEnvironment(commonStore);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "#2d2d2d",
          position: "relative",
          width: commonStore.baseInfo.width,
          height: commonStore.baseInfo.height,
        }}
      >
        <Container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          maxWidth="sm"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link
            color="inherit"
            underline="none"
            href="/"
            component={NavLink}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image src={"/images/logo02_w.png"} style={{ height: 200 }} />
          </Link>
          <Typography
            color="white"
            sx={{
              mt: "24px",
              mb: "8px",
              fontSize: "2em",
              fontWeight: 300,
              "& strong": { fontWeight: 400 },
            }}
            variant="h1"
            align="center"
          >
            <strong>잘못된 접근입니다.</strong>
          </Typography>

          <Typography color="white">
            ({err.status || 500} {err.statusText ?? err.message})
          </Typography>
        </Container>
      </Box>
    </>
  ));
}

type RouteError = Error & { status?: number; statusText?: string };
