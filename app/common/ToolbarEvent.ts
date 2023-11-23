export const initToolbarEvent = (commonStore, elRef) => {
  let xDown = null;
  let yDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!elRef.current) {
      return;
    }

    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) <= Math.abs(yDiff)) {
      if (yDiff > 0) {
        elRef.current.style.animation =
          "entrance 0.5s ease 0s 1 normal forwards";

        commonStore.setHeaderExpose(true);
      } else {
        elRef.current.style.animation = "exit 0.5s ease 0s 1 normal forwards";

        commonStore.setHeaderExpose(false);
      }
    }

    xDown = null;
    yDown = null;
  }

  const onWheel = async (e: WheelEvent) => {
    if (!elRef.current) {
      return;
    }

    if (e.deltaY > 0) {
      elRef.current.style.animation = "entrance 0.5s ease 0s 1 normal forwards";

      commonStore.setHeaderExpose(true);
    } else {
      elRef.current.style.animation = "exit 0.5s ease 0s 1 normal forwards";

      commonStore.setHeaderExpose(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (!elRef.current) {
      return;
    }

    switch (e.key) {
      case "ArrowUp": {
        elRef.current.style.animation = "exit 0.5s ease 0s 1 normal forwards";

        commonStore.setHeaderExpose(false);

        break;
      }

      case "ArrowDown": {
        elRef.current.style.animation =
          "entrance 0.5s ease 0s 1 normal forwards";

        commonStore.setHeaderExpose(true);

        break;
      }
    }
  };

  window.addEventListener("wheel", onWheel);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("touchstart", handleTouchStart, false);
  window.addEventListener("touchmove", handleTouchMove, false);
};
