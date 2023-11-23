import * as React from "react";

import { Box, Button, Chip, Container, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePageEffect } from "../../../core/page.js";
import { meatData } from "../../../data/meatData.js";
import { AppContext } from "../../../stores/index.js";

export default function Description(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  usePageEffect({ title: "세화축산" });

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "#f1f1f1",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              mt: "110px",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              width: "100%",
              height: commonStore.isDesktop
                ? commonStore.baseInfo.height - 110
                : "auto",

              // color: "white",
              fontSize: 60,
            }}
          >
            <Box>
              <Typography
                fontSize={commonStore.isDesktop ? 50 : 24}
                color="info"
                align="center"
              >
                고기맛의 기준을{" "}
              </Typography>

              <Typography
                fontSize={commonStore.isDesktop ? 50 : 36}
                fontWeight="bold"
                align="center"
              >
                세화드립니다!
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

              <Box
                sx={{
                  mt: 3,
                }}
              >
                <Chip
                  clickable
                  color={commonStore.meatType === "beef" ? "primary" : "info"}
                  variant={
                    commonStore.meatType === "beef" ? "filled" : "outlined"
                  }
                  label="소고기"
                  sx={{
                    fontSize: 16,
                  }}
                  onClick={() => {
                    commonStore.setMeatType("beef");
                  }}
                />
                <Chip
                  clickable
                  color={commonStore.meatType === "pork" ? "primary" : "info"}
                  variant={
                    commonStore.meatType === "pork" ? "filled" : "outlined"
                  }
                  label="돼지고기"
                  sx={{
                    fontSize: 16,
                    mx: 1,
                  }}
                  onClick={() => {
                    commonStore.setMeatType("pork");
                  }}
                />
                <Chip
                  disabled
                  clickable
                  color={commonStore.meatType === "set" ? "primary" : "info"}
                  variant={
                    commonStore.meatType === "set" ? "filled" : "outlined"
                  }
                  label="선물세트"
                  sx={{
                    fontSize: 16,
                  }}
                  onClick={() => {
                    commonStore.setMeatType("set");
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                width: "100%",
              }}
            >
              <Swiper
                spaceBetween={0}
                slidesPerView={commonStore.isDesktop ? 4 : 1}
                navigation={true}
                //     centeredSlides={true}
                // autoplay={{
                //   delay: 5000,
                //   disableOnInteraction: true,
                // }}
                // pagination={{
                //   clickable: true,
                // }}
                // loopedSlides={true}
                keyboard={true}
                // mousewheel={true}
                // scrollbar={{ draggable: true }}
                style={{
                  padding: "0px 32px",
                }}
              >
                {meatData
                  .find((v) => v.name === commonStore.meatType)
                  ?.children.map((v, i) => {
                    return (
                      <>
                        <SwiperSlide
                          key={i}
                          style={{
                            background: "transparent",
                          }}
                        >
                          <Box>
                            <img
                              src={`/images/${v.name}.png`}
                              width={"100%"}
                              onClick={() => {
                                alert("준비 중입니다.");
                              }}
                              style={{
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e: any) => {
                                e.target.style.animation =
                                  "rising 0.5s ease 0s 1 normal forwards";
                              }}
                              onMouseLeave={(e: any) => {
                                e.target.style.animation =
                                  "fall 0.5s ease 0s 1 normal forwards";
                              }}
                            />

                            <Typography color="gray">{v.name}</Typography>

                            <Button
                              variant="contained"
                              sx={{
                                mt: 3,
                              }}
                            >
                              구매하러 가기
                            </Button>
                          </Box>
                        </SwiperSlide>
                      </>
                    );
                  }) ?? null}
              </Swiper>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  ));
}
