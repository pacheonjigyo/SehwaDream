import * as React from "react";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { wrap } from "@motionone/utils";
import { ParallaxProps } from "../types.js";

export function ParallaxText({
  baseVelocity,
  children,
  direction,
  endOffset,
  length,
  scrollRef,
}: ParallaxProps) {
  const baseX = useMotionValue(0);

  // const { scrollY } = useScroll();

  // const scrollVelocity = useVelocity(scrollY);
  // const smoothVelocity = useSpring(scrollVelocity, {
  //   damping: 50,
  //   stiffness: 400,
  // });

  // const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
  //   clamp: false,
  // });

  const x = useTransform(baseX, (v) => `${wrap(0, endOffset, v)}%`);
  const directionFactor = React.useRef<number>(1);

  let stopped = false;

  if (scrollRef && scrollRef.current) {
    const elem = scrollRef.current;

    elem.addEventListener("mouseenter", () => {
      stopped = true;
    });

    elem.addEventListener("mouseleave", () => {
      stopped = false;
    });
  }

  useAnimationFrame((t, delta) => {
    const moveBy =
      direction * directionFactor.current * baseVelocity * (delta / 1000);

    // if (velocityFactor.get() < 0) {
    //   directionFactor.current = -1;
    // } else if (velocityFactor.get() > 0) {
    //   directionFactor.current = 1;
    // }

    // moveBy += directionFactor.current * moveBy * velocityFactor.get();

    if (!stopped) {
      baseX.set(baseX.get() + moveBy);
    }
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x, padding: 10 }}>
        {new Array(length).fill(null).map(() => (
          <>{children}</>
        ))}
      </motion.div>
    </div>
  );
}
