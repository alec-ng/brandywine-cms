import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import { drawerWidth } from '../../stateless/global/sidebar-drawer';


/*
 * No Chosen Post View
 */
export function EmptyEditor() {
  return (
    <EmptyEditorContainer>
      <h1 className="text-muted">
        Select a post to begin editing
      </h1>
    </EmptyEditorContainer>
  );
}

const EmptyEditorContainer = styled.div`
  display: flex;
  text-align: center;
  height: 100%;
  justify-content: center;
  flex-direction: column;
`;

/*
 * Shift content for persistent drawer
 */
export function MainShiftContainer({ children, open }) {
  const classes = useStyles();
  return (
    <main className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      {children}
    </main>
  )
}

const useStyles = makeStyles((theme) => ({
  content: {
    height: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    height: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
}));

