import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
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


const DrawerContainer = styled.div`
  background-color: #373a47;
  min-width: 300px;
  padding: 20px;
  flex-grow: 1;
  color: rgb(184, 183, 173);
`;

const ToggleButton = styled.button`
  padding: 5px 20px;
  border-radius: 3px;
  border: 1px solid white;
  color: white;
  background: rgba(0, 0, 0, 0);
`;

/**
 * Renders a button that toggles a tempoary draw drawn from the LHS of the screen
 */
export default function SidebarDrawer(props) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <div>
      <ToggleButton type="button" onClick={toggleDrawer(true)}>
        Open Toolbar
      </ToggleButton>
      <Drawer open={isOpen} onClose={toggleDrawer(false)} classes={{ paper: classes.paper }}>
        <DrawerContainer>{props.children}</DrawerContainer>
      </Drawer>
    </div>
  );
}