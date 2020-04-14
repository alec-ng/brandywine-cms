import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  }
}));

export default function Header(props) {
  const styles = useStyles();
  return (
    <AppBar classes={{ root: styles.root }}>
      <Toolbar>{
        props.children}
      </Toolbar>
    </AppBar>
  );
}

