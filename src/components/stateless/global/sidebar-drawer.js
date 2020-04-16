import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

/**
 * Renders a button that toggles a tempoary draw drawn from the LHS of the screen
 */
export default function SidebarDrawer({ open, onClose, children }) {
  const classes = useStyles();
  return (
    <Drawer 
      open={open} 
      onClose={onClose} 
      classes={{ paper: classes.paper }}
    >
      <DrawerContainer>{children}</DrawerContainer>
    </Drawer>
    
  );  
}

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

