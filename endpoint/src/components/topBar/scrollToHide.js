import React from "react";
import { Slide, useScrollTrigger } from "@material-ui/core";

const ScrollToHide = props => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: props.threshold,
    target: props.window ? window() : undefined
  });

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
};

export default ScrollToHide;