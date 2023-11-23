import * as React from "react";

import { Box, Container, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { usePageEffect } from "../../../core/page.js";
import { AppContext } from "../../../stores/index.js";

export default function Why(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  usePageEffect({ title: "세화축산" });

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "#f1f1f1",

          position: "relative",
        }}
      >
        <Box
          sx={{
            mt: "110px",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            width: "100%",
            height: commonStore.baseInfo.height - 110,

            // color: "white",
            // fontSize: 60,
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Container maxWidth="lg">
              <Typography
                fontSize={commonStore.isDesktop ? 50 : 36}
                fontWeight="bold"
                align="center"
              >
                왜 세화인가요?
              </Typography>

              <Box
                sx={{
                  mx: "auto",
                  my: 1,
                  width: 60,
                  borderBottom: 5,
                  color: "#ec6b6b",
                }}
              ></Box>
            </Container>
          </Box>

          <Box
            sx={{
              mt: 3,

              width: "100%",

              display: "flex",
              justifyContent: "right",
            }}
          >
            {commonStore.isDesktop ? (
              <Box
                sx={{
                  mt: 10,

                  bgcolor: "#dcd8ca",

                  // p: 3,
                  // pl: 40,
                  // pr: 20,

                  textAlign: "left",

                  display: "flex",
                  justifyContent: "right",

                  position: "relative",

                  width: (commonStore.baseInfo.width - 1200) / 2 + 1200,
                  height: 450,
                }}
              >
                <Box
                  sx={{
                    p: 3,

                    display: "flex",
                  }}
                >
                  <img
                    src="/images/대표이미지.jpg"
                    style={{
                      position: "absolute",
                      top: -90,
                      left: 30,
                      // transform: "translate(0%, -50%)",

                      width: 400,
                      height: 560,
                      objectFit: "cover",
                      objectPosition: "10% 70%",
                    }}
                  />

                  <Box
                    sx={{
                      pl: "450px",
                      pr: `${(commonStore.baseInfo.width - 1200) / 2}px`,
                    }}
                  >
                    <img src="/images/세화캘리-06.svg" width={300} />

                    <Typography
                      align="left"
                      sx={{
                        mt: 3,
                        fontSize: 20,
                      }}
                    >
                      소고기를 판매하는 업체는 많지만, 도축장을 찾아가 품질 좋은
                      고기를 경매하여 직접 발골하고 1차 유통부터 2차 유통까지
                      하는 업체는 그리 많지 않습니다.
                      <br />
                      <br />
                      세화축산의 㸷花 는 ‘뿔이 우뚝 솟은 소가 꽃이되다’ 라는
                      의미입니다. 마블링이 좋은 한우는 꽃갈비살, 꽃등심처럼 흔히
                      ‘꽃이 피어다’ 라는 표현을 사용합니다. 품질 좋은 한우로
                      고기 맛을 기준을 새롭게 세워드리고, 고객님의 입맛을
                      세워드리도록 최선을 다하겠습니다.
                    </Typography>

                    <Typography
                      align="right"
                      sx={{
                        mt: 3,
                        fontSize: 20,
                      }}
                    >
                      세화축산 일동
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  ));
}
