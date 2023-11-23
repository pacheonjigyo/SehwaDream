import * as React from "react";

import SwiperCore, {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper";

import { Box } from "@mui/material";
import { useObserver } from "mobx-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePageEffect } from "../../core/page.js";
import { AppContext } from "../../stores/index.js";

import Description from "./components/Description.js";
import NavigateMenu from "./components/NavigateMenu.js";
import People from "./components/People.js";
import Tech from "./components/Tech.js";
import Why from "./components/Why.js";

import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper.min.css";
import "./index.css";
import MobileDescription from "./mobile/Description.js";
import MobilePeople from "./mobile/People.js";
import MobileTech from "./mobile/Tech.js";
import MobileWhy from "./mobile/Why.js";

SwiperCore.use([Autoplay, Navigation, Pagination, Keyboard, Mousewheel]);

export default function Main(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  usePageEffect({ title: "세화축산" });

  React.useEffect(() => {
    if (commonStore.isDesktop) {
      return;
    }

    commonStore.setHeaderExpose(true);
  }, []);
  return useObserver(() => (
    <>
      <Box
        sx={{
          width: "100%",
          height: commonStore.baseInfo.height,
        }}
      >
        {commonStore.device !== "mobile" ? (
          <Swiper
            spaceBetween={0}
            speed={1000}
            direction={"vertical"}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            loopedSlides={true}
            keyboard={true}
            mousewheel={true}
            scrollbar={{ draggable: true }}
            initialSlide={1}
            onSwiper={(e) => {
              commonStore.setSwiper(e);
            }}
            onSlideChange={(e) => {
              if (e.activeIndex > 2) {
                document.documentElement.style.setProperty(
                  "--swiper-pagination-bullet-color",
                  "black",
                );
                document.documentElement.style.setProperty(
                  "--swiper-pagination-bullet-color-active",
                  "black",
                );

                commonStore.setHeaderExpose(true);
              } else {
                document.documentElement.style.setProperty(
                  "--swiper-pagination-bullet-color",
                  "white",
                );
                document.documentElement.style.setProperty(
                  "--swiper-pagination-bullet-color-active",
                  "white",
                );

                commonStore.setHeaderExpose(false);
              }
            }}
            style={
              {
                // display: "none",
              }
            }
          >
            <SwiperSlide>
              <NavigateMenu />
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  bgcolor: "black",

                  position: "relative",
                }}
              >
                <img
                  src={"/images/세화배경-01.jpg"}
                  style={{
                    width: commonStore.baseInfo.width,
                    height: commonStore.baseInfo.height,

                    objectFit: "cover",
                  }}
                />
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  bgcolor: "black",

                  position: "relative",
                }}
              >
                <img
                  src={"/images/세화배경-02.jpg"}
                  style={{
                    width: commonStore.baseInfo.width,
                    height: commonStore.baseInfo.height,

                    objectFit: "cover",
                  }}
                />
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Description />
            </SwiperSlide>

            <SwiperSlide>
              <Why />
            </SwiperSlide>

            <SwiperSlide>
              <Tech />
            </SwiperSlide>

            <SwiperSlide>
              <People />
            </SwiperSlide>
          </Swiper>
        ) : (
          <>
            <Box
              sx={{
                bgcolor: "#f1f1f1",

                position: "relative",
              }}
            >
              <img
                src={"/images/세화배경_모바일-01.jpg"}
                style={{
                  width: commonStore.baseInfo.width,
                  // height: commonStore.baseInfo.height,

                  objectFit: "cover",
                }}
              />

              <img
                src={"/images/세화배경_모바일-02.jpg"}
                style={{
                  width: commonStore.baseInfo.width,
                  height: commonStore.baseInfo.height,

                  objectFit: "cover",

                  marginTop: "-8px",
                }}
              />

              <MobileDescription />
              <MobileWhy />
              <MobileTech />
              <MobilePeople />
            </Box>
          </>
        )}

        {/* <Button
          sx={{
            // bgcolor: "#f1f1f1",
            borderRadius: "1rem",

            position: "fixed",
            right: 24,
            bottom: 24,

            // width: 108,
            // height: 108,

            zIndex: 99999,
          }}
        >
          <img src="/images/문의하기.png" width={128} height={128} />
        </Button> */}

        <button
          id="custom-button"
          style={{
            background: "transparent",
            border: "none",

            cursor: "pointer",

            position: "fixed",
            right: 24,
            bottom: 24,

            // width: 108,
            // height: 108,

            zIndex: 99999,
          }}
        >
          <img
            src="/images/문의하기.svg"
            width={commonStore.isDesktop ? "128px" : "64px"}
            height={commonStore.isDesktop ? "128px" : "64px"}
            onMouseEnter={(e: any) => {
              e.target.style.animation =
                "rising 0.5s ease 0s 1 normal forwards";
            }}
            onMouseLeave={(e: any) => {
              e.target.style.animation = "fall 0.5s ease 0s 1 normal forwards";
            }}
          />
        </button>
      </Box>
    </>
  ));
}
