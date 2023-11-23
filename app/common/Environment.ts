export const initEnvironment = (commonStore) => {
  commonStore.setDrawerBaseState(true);

  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    commonStore.setBaseInfo({
      ...commonStore.baseInfo,

      width,
      height,
    });
  });

  const floating = document.getElementById("floating-button");

  if (!floating) {
    return;
  }

  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/work" ||
    window.location.pathname === "/pricing" ||
    window.location.pathname === "/info" ||
    window.location.pathname === "/about"
  ) {
    floating.style.display = "";
  } else {
    floating.style.display = "none";
  }
};
