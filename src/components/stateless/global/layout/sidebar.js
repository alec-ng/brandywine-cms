import React from 'react';
import styled from 'styled-components';

import PostManager from "../../../stateful/post-manager";
import ChosenPostManager from "../../../stateful/chosen-post-manager";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ToggleVisible } from '../../generic/util';

/**
 * Controls rendering of sidebar content and provides control
 * to toggle close the persistent drawer
 */
export default function SidebarContainer({ isPostChosen, toggleDrawer }) {
  const closeDrawer = () => { toggleDrawer(false); }

  return (
    <Container>
      <Controls>
        <IconButton color="inherit" onClick={closeDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Controls>

      <Divider />

      <Content>
        {/* Preserve in UI to keep local state */}
        <ToggleVisible show={!isPostChosen}>
          <PostManager />
        </ToggleVisible>
        
        {/* Render only when needed */}
        {isPostChosen && (
          <ChosenPostManager />
        )}
      </Content>
    </Container>
  );
}

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(255,255,255,0.1);
  width: 100%;
`;

const Container = styled.div`
  background-color: #373a47;
  flex-grow: 1;
  color: rgb(184, 183, 173);
`;

const Content = styled.div`
  padding: 20px;
`;