import * as React from "react";

import {
  Box,
  Container,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import { Check } from "@mui/icons-material";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";
import { useObserver } from "mobx-react";
import { usePageEffect } from "../../../core/page.js";
import { AppContext } from "../../../stores/index.js";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#ec6b6b",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#ec6b6b",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#ec6b6b",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#ec6b6b",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {active ? (
        <Box
          sx={{
            border: 1,
            borderRadius: "50%",
            borderColor: "#ec6b6b",

            p: 0.5,
          }}
        >
          <div className="QontoStepIcon-circle" />
        </Box>
      ) : completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const steps = ["도축", "발골", "수축포장", "숙성", "스킨포장"];

export default function Tech(): JSX.Element {
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
            bgcolor: "lightgray",

            width: "100%",
            height: 300,

            position: "absolute",

            left: 0,
            bottom: 0,
          }}
        ></Box>

        <Container maxWidth="lg">
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
            <Typography
              fontSize={commonStore.isDesktop ? 50 : 36}
              fontWeight="bold"
            >
              세화의 기술
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

            {commonStore.isDesktop ? (
              <Box
                sx={{
                  mt: 3,
                  mb: 3,

                  width: 500,
                }}
              >
                <Stepper
                  // orientation={commonStore.isDesktop ? "horizontal" : "vertical"}
                  alternativeLabel
                  activeStep={commonStore.slideIndex}
                  connector={<QontoConnector />}
                >
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={QontoStepIcon}>
                        <Typography
                          color={
                            steps[commonStore.slideIndex] === label
                              ? "#ec6b6b"
                              : "info"
                          }
                          fontSize={20}
                        >
                          {label}
                        </Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            ) : null}

            <Typography
              sx={{
                mt: 3,
                mb: 3,
              }}
              color="info"
              fontSize={commonStore.isDesktop ? 20 : 14}
            >
              {commonStore.slideIndex === 0 ? (
                <>
                  세화축산에서는 소비자들이 안심하고 드실 수 있도록
                  <br />두 눈으로 확인하고 소고기와 돼지고기를 선별하고
                  있습니다.
                </>
              ) : null}

              {commonStore.slideIndex === 1 ? (
                <>
                  고기는 뼈에 가까울수록 맛있습니다.
                  <br />
                  오랜 발골경력 노하우로 맛있는 고기만 드리겠습니다.
                </>
              ) : null}

              {commonStore.slideIndex === 2 ? (
                <>
                  진공포장된 한우를 고온-저온 온도순으로 물에 빠르게 담가
                  <br />
                  육질을 이완/수축 시키는 방법으로 육질이 부드럽습니다.
                </>
              ) : null}

              {commonStore.slideIndex === 3 ? (
                <>
                  진공포장과 수축포장으로 처음 감동을 그대로
                  <br />
                  신선하게 보관이 가능합니다.
                </>
              ) : null}

              {commonStore.slideIndex === 4 ? (
                <>최상의 신선도를 유지하기 위해 꼼꼼하게 포장하겠습니다.</>
              ) : null}
            </Typography>

            {commonStore.isDesktop ? (
              <Box
                sx={{
                  mt: 3,

                  bgcolor: "#ec6b6b",

                  // p: 3,

                  textAlign: "left",

                  display: "flex",

                  position: "relative",

                  height: 300,
                }}
              >
                <Box
                  className={
                    commonStore.slideIndex === 0 ? "step active" : "step"
                  }
                  sx={{
                    background: `url("/images/도축-v2.jpg")`,
                    backgroundSize: "cover",

                    color: "white",
                    cursor: "pointer",

                    position: "relative",

                    width: commonStore.slideIndex === 0 ? 400 : 175,
                  }}
                  onClick={() => {
                    commonStore.setSlideIndex(0);
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "black",

                      height: 300,
                      opacity: commonStore.slideIndex === 0 ? 0 : 0.7,
                    }}
                  ></Box>

                  <Box
                    sx={{
                      position: "absolute",

                      left: 0,
                      top: 0,

                      opacity: 1,
                      color: "white",

                      p: 3,
                    }}
                  >
                    <Typography
                      align="left"
                      fontSize={24}
                      fontWeight="bold"
                      sx={{
                        textShadow: "0px 1px 3px black",
                      }}
                    >
                      1. 도축
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className={
                    commonStore.slideIndex === 1 ? "step active" : "step"
                  }
                  sx={{
                    background: `url("/images/세화의기술.jpg")`,
                    backgroundSize: "cover",
                    backgroundPositionY: "70%",

                    color: "white",
                    cursor: "pointer",

                    position: "relative",

                    width: commonStore.slideIndex === 1 ? 400 : 175,
                  }}
                  onClick={() => {
                    commonStore.setSlideIndex(1);
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "black",
                      height: 300,
                      opacity: commonStore.slideIndex === 1 ? 0 : 0.7,
                    }}
                  ></Box>

                  <Box
                    sx={{
                      position: "absolute",

                      left: 0,
                      top: 0,

                      opacity: 1,
                      color: "white",

                      p: 3,
                    }}
                  >
                    <Typography
                      align="left"
                      fontSize={24}
                      fontWeight="bold"
                      sx={{
                        textShadow: "0px 1px 3px black",
                      }}
                    >
                      2. 발골
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className={
                    commonStore.slideIndex === 2 ? "step active" : "step"
                  }
                  sx={{
                    background: `url("/images/수축포장-v2.jpg")`,
                    backgroundSize: "cover",

                    color: "white",
                    cursor: "pointer",

                    position: "relative",

                    width: commonStore.slideIndex === 2 ? 400 : 175,
                  }}
                  onClick={() => {
                    commonStore.setSlideIndex(2);
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "black",
                      height: 300,
                      opacity: commonStore.slideIndex === 2 ? 0 : 0.7,
                    }}
                  ></Box>

                  <Box
                    sx={{
                      position: "absolute",

                      left: 0,
                      top: 0,

                      opacity: 1,
                      color: "white",

                      p: 3,
                    }}
                  >
                    <Typography
                      align="left"
                      fontSize={24}
                      fontWeight="bold"
                      sx={{
                        textShadow: "0px 1px 3px black",
                      }}
                    >
                      3. 수축포장
                      <br />
                      (핏물 X)
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className={
                    commonStore.slideIndex === 3 ? "step active" : "step"
                  }
                  sx={{
                    background: `url("/images/숙성-v2.jpg")`,
                    backgroundSize: "cover",

                    color: "white",
                    cursor: "pointer",

                    position: "relative",

                    width: commonStore.slideIndex === 3 ? 400 : 175,
                  }}
                  onClick={() => {
                    commonStore.setSlideIndex(3);
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "black",
                      height: 300,
                      opacity: commonStore.slideIndex === 3 ? 0 : 0.7,
                    }}
                  ></Box>

                  <Box
                    sx={{
                      position: "absolute",

                      left: 0,
                      top: 0,

                      opacity: 1,
                      color: "white",

                      p: 3,
                    }}
                  >
                    <Typography
                      align="left"
                      fontSize={24}
                      fontWeight="bold"
                      sx={{
                        textShadow: "0px 1px 3px black",
                      }}
                    >
                      4. 숙성
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className={
                    commonStore.slideIndex === 4 ? "step active" : "step"
                  }
                  sx={{
                    background: `url("/images/스킨포장-v2.jpg")`,
                    backgroundSize: "cover",

                    color: "white",
                    cursor: "pointer",

                    position: "relative",

                    width: commonStore.slideIndex === 4 ? 400 : 175,
                  }}
                  onClick={() => {
                    commonStore.setSlideIndex(4);
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "black",
                      height: 300,
                      opacity: commonStore.slideIndex === 4 ? 0 : 0.7,
                    }}
                  ></Box>

                  <Box
                    sx={{
                      position: "absolute",

                      left: 0,
                      top: 0,

                      opacity: 1,
                      color: "white",

                      p: 3,
                    }}
                  >
                    <Typography
                      align="left"
                      fontSize={24}
                      fontWeight="bold"
                      sx={{
                        textShadow: "0px 1px 3px black",
                      }}
                    >
                      5. 스킨포장
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  mt: 3,

                  bgcolor: "#ec6b6b",

                  // p: 3,

                  textAlign: "left",

                  display: "flex",
                  flexDirection: "column",

                  position: "relative",

                  width: "100%",
                }}
              >
                <Box
                  className={
                    commonStore.slideIndex === 0 ? "step active" : "step"
                  }
                  sx={{
                    background: `url("/images/도축-v2.jpg")`,
                    backgroundSize: "cover",

                    color: "white",
                    cursor: "pointer",

                    position: "relative",

                    width: "100%",
                  }}
                  onClick={() => {
                    commonStore.setSlideIndex(0);
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "black",

                      height: commonStore.slideIndex === 0 ? 200 : 70,
                      opacity: commonStore.slideIndex === 0 ? 0 : 0.7,
                    }}
                  ></Box>

                  <Box
                    sx={{
                      position: "absolute",

                      left: 0,
                      top: 0,

                      opacity: 1,
                      color: "white",

                      p: 3,
                    }}
                  >
                    <Typography
                      align="left"
                      fontSize={16}
                      fontWeight="bold"
                      sx={{
                        textShadow: "0px 1px 3px black",
                      }}
                    >
                      1. 도축
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className={
                    commonStore.slideIndex === 1 ? "step active" : "step"
                  }
                  sx={{
                    background: `url("/images/세화의기술.jpg")`,
                    backgroundSize: "cover",
                    backgroundPositionY: "70%",

                    color: "white",
                    cursor: "pointer",

                    position: "relative",

                    width: "100%",
                  }}
                  onClick={() => {
                    commonStore.setSlideIndex(1);
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "black",
                      height: commonStore.slideIndex === 1 ? 200 : 70,
                      opacity: commonStore.slideIndex === 1 ? 0 : 0.7,
                    }}
                  ></Box>

                  <Box
                    sx={{
                      position: "absolute",

                      left: 0,
                      top: 0,

                      opacity: 1,
                      color: "white",

                      p: 3,
                    }}
                  >
                    <Typography
                      align="left"
                      fontSize={16}
                      fontWeight="bold"
                      sx={{
                        textShadow: "0px 1px 3px black",
                      }}
                    >
                      2. 발골
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className={
                    commonStore.slideIndex === 2 ? "step active" : "step"
                  }
                  sx={{
                    background: `url("/images/수축포장-v2.jpg")`,
                    backgroundSize: "cover",

                    color: "white",
                    cursor: "pointer",

                    position: "relative",

                    width: "100%",
                  }}
                  onClick={() => {
                    commonStore.setSlideIndex(2);
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "black",
                      height: commonStore.slideIndex === 2 ? 200 : 70,
                      opacity: commonStore.slideIndex === 2 ? 0 : 0.7,
                    }}
                  ></Box>

                  <Box
                    sx={{
                      position: "absolute",

                      left: 0,
                      top: 0,

                      opacity: 1,
                      color: "white",

                      p: 3,
                    }}
                  >
                    <Typography
                      align="left"
                      fontSize={16}
                      fontWeight="bold"
                      sx={{
                        textShadow: "0px 1px 3px black",
                      }}
                    >
                      3. 수축포장
                      {commonStore.isDesktop ? <br /> : <>&nbsp;</>}
                      (핏물 X)
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className={
                    commonStore.slideIndex === 3 ? "step active" : "step"
                  }
                  sx={{
                    background: `url("/images/숙성-v2.jpg")`,
                    backgroundSize: "cover",

                    color: "white",
                    cursor: "pointer",

                    position: "relative",

                    width: "100%",
                  }}
                  onClick={() => {
                    commonStore.setSlideIndex(3);
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "black",
                      height: commonStore.slideIndex === 3 ? 200 : 70,
                      opacity: commonStore.slideIndex === 3 ? 0 : 0.7,
                    }}
                  ></Box>

                  <Box
                    sx={{
                      position: "absolute",

                      left: 0,
                      top: 0,

                      opacity: 1,
                      color: "white",

                      p: 3,
                    }}
                  >
                    <Typography
                      align="left"
                      fontSize={16}
                      fontWeight="bold"
                      sx={{
                        textShadow: "0px 1px 3px black",
                      }}
                    >
                      4. 숙성
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className={
                    commonStore.slideIndex === 4 ? "step active" : "step"
                  }
                  sx={{
                    background: `url("/images/스킨포장-v2.jpg")`,
                    backgroundSize: "cover",

                    color: "white",
                    cursor: "pointer",

                    position: "relative",

                    width: "100%",
                  }}
                  onClick={() => {
                    commonStore.setSlideIndex(4);
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "black",
                      height: commonStore.slideIndex === 4 ? 200 : 70,
                      opacity: commonStore.slideIndex === 4 ? 0 : 0.7,
                    }}
                  ></Box>

                  <Box
                    sx={{
                      position: "absolute",

                      left: 0,
                      top: 0,

                      opacity: 1,
                      color: "white",

                      p: 3,
                    }}
                  >
                    <Typography
                      align="left"
                      fontSize={16}
                      fontWeight="bold"
                      sx={{
                        textShadow: "0px 1px 3px black",
                      }}
                    >
                      5. 스킨포장
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  ));
}
