import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import styled from "styled-components";

/**
 * Renders a button that toggles a tempoary draw drawn from the LHS of the screen
 */
export default function SidebarDrawer(props) {
  const [isOpen, setIsOpen] = useState(false);
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
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        <DrawerContainer>{props.children}</DrawerContainer>
      </Drawer>
    </div>
  );
}

const DrawerContainer = styled.div`
  background-color: #373a47;
  min-width: 300px;
  height: 100%;
  padding: 20px;
  color: rgb(184, 183, 173);
`;

const ToggleButton = styled.button`
  padding: 5px 20px;
  border-radius: 3px;
  border: 1px solid white;
  color: white;
  background: rgba(0, 0, 0, 0);
`;
