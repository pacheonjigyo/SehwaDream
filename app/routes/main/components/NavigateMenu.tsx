import * as React from "react";

import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useObserver } from "mobx-react";
import { usePageEffect } from "../../../core/page.js";
import { AppContext } from "../../../stores/index.js";

export default function NavigateMenu(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  usePageEffect({ title: "세화축산" });

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "#2d2d2d",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              justifyContent: "center",

              width: "100%",
              height: commonStore.baseInfo.height,

              color: "white",
              fontSize: commonStore.isDesktop ? 28 : 18,
            }}
          >
            <img src="/images/logo02_w.png" width={128} />

            <Box
              sx={{
                ml: 4,
                my: 3,

                width: 300,
                borderBottom: 1,
                color: "#a2a2a2",
              }}
            ></Box>

            <List>
              <ListItem>
                <ListItemButton
                  sx={{
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    commonStore.swiper.slideTo(3);
                  }}
                >
                  베스트
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton
                  disabled
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  배송안내
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton
                  sx={{
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    window.open(
                      "https://sehwadream.channel.io",
                      "_blank",
                      "height=600,width=377,top=100,left=200,scrollbars=yes,resizable=yes",
                    );
                  }}
                >
                  문의하기
                </ListItemButton>
              </ListItem>
            </List>

            <Box
              sx={{
                ml: 4,
                my: 3,

                width: 300,
                borderBottom: 1,
                color: "#a2a2a2",
              }}
            ></Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "left",
                flexDirection: "column",

                ml: 4,
              }}
            >
              {/* <Box
                sx={{
                  color: "#D5D5D5",
                  display: "flex",
                  alignItems: "center",
                  height: 50,
                }}
              >
                <Typography
                  sx={{
                    mr: 2,
                  }}
                  fontSize={14}
                >
                  이용약관
                </Typography>

                <Typography
                  sx={{
                    mr: 2,
                  }}
                  fontSize={14}
                >
                  개인정보처리방침
                </Typography>
              </Box> */}

              <Box
                sx={{
                  color: "#a2a2a2",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    lineHeight: 2,
                  }}
                  fontSize={commonStore.device === "mobile" ? 12 : 14}
                  align="left"
                >
                  세화축산 | 대표: 장정인 {commonStore.isDesktop ? "|" : <br />}{" "}
                  울산광역시 중구 옥교3길 104
                  <br />
                  사업자등록번호: 863-99-01516{" "}
                  {commonStore.isDesktop ? "|" : <br />} 고객센터: 010-5651-5425
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  ));
}
