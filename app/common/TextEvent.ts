export const initTextEvent = (elRef) => {
  const onScroll = async () => {
    if (!elRef.current) {
      return;
    }

    const scrollLocation = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    // const fullHeight = document.body.scrollHeight;

    const ratio = (scrollLocation * 10) / windowHeight;

    elRef.current.style.setProperty("transform", `scale(${1 + ratio})`);
    elRef.current.style.setProperty("transition", `.1s`);

    if (scrollLocation > 50) {
      elRef.current.style.animation = "fade-out 0.5s ease 0s 1 normal forwards";
    } else {
      elRef.current.style.animation = "";
    }
  };

  window.addEventListener("scroll", onScroll);
};
