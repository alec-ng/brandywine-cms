import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

export default function Header(props) {
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>{props.children}</Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}
