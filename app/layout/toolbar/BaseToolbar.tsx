import * as React from "react";

import { useObserver } from "mobx-react";
import { AppContext } from "../../stores/index.js";

import { Menu } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  Box,
  Button,
  Container,
  Grid,
} from "@mui/material";

export function BaseToolbar(props: AppToolbarProps): JSX.Element {
  const { commonStore } = React.useContext(AppContext);
  const { sx, ...other } = props;

  const elRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    commonStore.setHeaderElem(elRef);
  });

  return useObserver(() => (
    <Box
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <AppBar
        ref={elRef}
        sx={{
          boxShadow: "none",
          bgcolor: "#2d2d2d",
          height: 110,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            height: 110,
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <Box
                sx={{
                  height: 110,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                }}
              >
                <Menu
                  sx={{
                    mr: 5,
                    cursor: "pointer",
                    fontSize: 36,
                  }}
                  onClick={() => {
                    commonStore.swiper.slideTo(0);
                  }}
                />

                {/* <Button
                  color="secondary"
                  sx={{ fontSize: commonStore.isDesktop ? 22 : 12 }}
                  onClick={() => {
                    commonStore.swiper.slideTo(3);
                  }}
                >
                  베스트
                </Button>
                <Button
                  disabled
                  color="secondary"
                  sx={{ fontSize: commonStore.isDesktop ? 22 : 12, mx: 1 }}
                >
                  배송안내
                </Button> */}
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box
                sx={{
                  height: 110,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/images/logo02_w.png"
                  height={110}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    commonStore.swiper.slideTo(1);
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box
                sx={{
                  height: 110,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <Button
                  color="secondary"
                  sx={{ fontSize: commonStore.isDesktop ? 22 : 12 }}
                  onClick={() => {
                    window.open(
                      "https://sehwadream.channel.io",
                      "_blank",
                      "height=600,width=377,top=100,left=200,scrollbars=yes,resizable=yes",
                    );
                  }}
                >
                  문의하기
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Box>
  ));
}

type AppToolbarProps = Omit<AppBarProps, "children">;
