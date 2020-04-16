import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

/**
 * Persistent drawer, anchored LHS
 */
export default function PersistentDrawer({ open, children }) {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {children}
    </Drawer>
  );  
}

export const drawerWidth = 325;

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: 'flex',
  },
  drawerPaper: {
    width: drawerWidth,
    "&::-webkit-scrollbar": {
      width: "3px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgb(255, 69, 0)",
      borderRadius: "5px"
    },
    "&::-webkit-scrollbar-track": {
      opacity: "0",
    }
  },
}));


