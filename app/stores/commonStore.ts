import { makeAutoObservable } from "mobx";
import { BaseInfo } from "../types.js";

export class commonStore {
  constructor() {
    makeAutoObservable(this);
  }

  swiper: any = null;

  swiperPeople: any = null;
  swiperPeopleIndex = 0;

  meatType = "beef";

  isHeaderExpose = false;

  navigate: any = null;

  gptDrawer = false;

  isEntrance = false;

  popOver = {
    branding: false,
    work: false,
    info: false,
    about: false,
  };

  loginType = "simple";
  loginStep = 1;
  loginLoading = false;

  baseInfo = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  appInfo = {
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",

    accessToken: "",
    refreshToken: "",

    isAdmin: false,

    language: "ko",
    // language:
    //   navigator.language === "ko" || navigator.language === "ko-KR"
    //     ? "ko"
    //     : navigator.language === "en" || navigator.language === "en-US"
    //     ? "en"
    //     : "ko",
  };

  signFlighting = false;

  device = "desktop";

  isDesktop = false;

  drawerAppState = false;
  drawerBaseState = false;

  userInfo: any = null;
  userPopOver = false;

  mainPopOver = false;

  popup: any = null;

  redirectUrl = "";

  slideIndex = 0;

  headerElem: any = null;

  setSwiperPeople = (value: any) => {
    this.swiperPeople = value;
  };

  setSwiperPeopleIndex = (value: number) => {
    this.swiperPeopleIndex = value;
  };

  setSwiper = (value: any) => {
    this.swiper = value;
  };

  setMeatType = (value: string) => {
    this.meatType = value;
  };

  setHeaderExpose = (value: boolean) => {
    this.isHeaderExpose = value;
  };

  setHeaderElem = (value: any) => {
    this.headerElem = value;
  };

  setSlideIndex = (value: number) => {
    this.slideIndex = value;
  };

  setNavigate = (value: any) => {
    this.navigate = value;
  };

  setBaseInfo = (value: BaseInfo) => {
    this.baseInfo = value;
  };

  setDevice = (value: string) => {
    this.device = value;
  };

  setDesktop = (value: boolean) => {
    this.isDesktop = value;

    if (value) {
      document.documentElement.style.setProperty(
        "--swiper-pagination-bullet-size",
        "20px",
      );

      document.documentElement.style.setProperty(
        "--swiper-pagination-margin-size",
        "40px",
      );
    } else {
      document.documentElement.style.setProperty(
        "--swiper-pagination-bullet-size",
        "10px",
      );

      document.documentElement.style.setProperty(
        "--swiper-pagination-margin-size",
        "0px",
      );
    }
  };

  setDrawerAppState = (value: boolean) => {
    this.drawerAppState = value;
  };

  setDrawerBaseState = (value: boolean) => {
    this.drawerBaseState = value;
  };
}
