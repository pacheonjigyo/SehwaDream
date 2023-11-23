import * as React from "react";

import SwiperCore, {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper";

import { Box, Button, Container, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePageEffect } from "../../../core/page.js";
import { AppContext } from "../../../stores/index.js";

import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper.min.css";
import "../index.css";

SwiperCore.use([Autoplay, Navigation, Pagination, Keyboard, Mousewheel]);

export default function People(): JSX.Element {
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
            height: commonStore.isDesktop
              ? commonStore.baseInfo.height - 356
              : commonStore.baseInfo.height - 110,

            // color: "white",
            // fontSize: 60,
          }}
        >
          <Box>
            <Container maxWidth="lg">
              <Typography
                fontSize={commonStore.isDesktop ? 50 : 36}
                fontWeight="bold"
              >
                세화를 선택하는 사람들
              </Typography>

              <Box
                sx={{
                  mx: "auto",
                  my: 1,
                  mb: 3,
                  width: 60,
                  borderBottom: 5,
                  color: "#ec6b6b",
                }}
              ></Box>

              <Box
                sx={
                  {
                    // width: commonStore.baseInfo.width - 32,
                    // width: 1200,
                  }
                }
              >
                <Swiper
                  spaceBetween={-500}
                  slidesPerView={commonStore.isDesktop ? 1 : 1}
                  navigation={true}
                  centeredSlides={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                  }}
                  keyboard={true}
                  style={
                    {
                      // paddingLeft: -1000,
                      // padding: "0px 100px",
                      // paddingRight: 0,
                    }
                  }
                  onSwiper={(e) => {
                    commonStore.setSwiperPeople(e);
                  }}
                  onSlideChange={(e) => {
                    console.log(e.activeIndex);
                    commonStore.setSwiperPeopleIndex(e.activeIndex);
                  }}
                >
                  {new Array(10).fill("아트보드").map((v, i) => {
                    return (
                      <>
                        <SwiperSlide
                          key={i}
                          style={{
                            background: "transparent",
                          }}
                        >
                          <Box sx={{}}>
                            <img
                              src={`/images/${v}-${(i + 1)
                                .toString()
                                .padStart(2, "0")}.jpg`}
                              width={commonStore.isDesktop ? "600px" : "260px"}
                              style={{
                                opacity:
                                  commonStore.swiperPeopleIndex === i ? 1 : 0.5,
                                scale:
                                  commonStore.swiperPeopleIndex === i
                                    ? "1.0"
                                    : "0.8",
                                cursor: "pointer",
                                animation:
                                  commonStore.swiperPeopleIndex === i
                                    ? "scale-up 1s ease 0s 1 normal forwards"
                                    : "scale-down 1s ease 0s 1 normal forwards",
                              }}
                              onClick={() => {
                                commonStore.swiperPeople.slideTo(i);
                              }}
                            />
                          </Box>
                        </SwiperSlide>
                      </>
                    );
                  }) ?? null}
                </Swiper>
              </Box>
            </Container>
          </Box>
        </Box>

        {commonStore.isDesktop ? (
          <Box
            sx={{
              // mt: 5,

              bgcolor: "lightgray",

              p: 3,

              textAlign: "left",

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              width: "100%",

              // position: "absolute",

              bottom: 0,
            }}
          >
            <Container maxWidth="lg">
              <Box
                sx={{
                  textAlign: "left",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",

                  width: "100%",
                }}
              >
                <Typography
                  align="left"
                  sx={{
                    mr: 10,
                    fontSize: 36,
                  }}
                >
                  세화만의 신선한 상품을
                  <br />
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    합리적인 가격
                  </span>
                  으로 만나보세요.
                  <br />
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                    }}
                  >
                    구매하러 가기
                  </Button>
                </Typography>

                <img src="/images/고기들.png" height={200} />
              </Box>
            </Container>
          </Box>
        ) : null}
      </Box>
    </>
  ));
}
