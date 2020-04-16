import React, { useEffect, useState } from "react";
import { withFirebase } from '../../hoc/firebase';
import { connect } from 'react-redux';

import { updatePost } from '../../../state/actions';
import { getPosts } from '../../../state/actions/data-actions';

import Header from "../../stateless/global/header";
import Editor from '../../stateless/global/brandywine-editor';
import SidebarDrawer from "../../stateless/global/sidebar-drawer";
import ModalManager from './../modal-manager';
import SnackbarManager from './../snackbar-manager';
import PostManager from "./../post-manager";
import ChosenPostManager from "./../chosen-post-manager";
import {
  EmptyEditor, ToggleButton, RootContainer, EditorContainer, ToggleVisible
} from './styles';

/**
 * Top level app composition container component
 */
function App({chosenPost, dispatch, firebase}) {
  // One time initial load to get all published posts
  useEffect(() => {
    dispatch(getPosts(firebase));
  }, [])

  // drawer toggles
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // cb for brandywine-editor
  function onEditorChange(header, blocks) {
    dispatch(updatePost({
      header: header,
      blocks: blocks
    }));
  }
  return (
    <RootContainer className="container-fluid px-0">
      {/* Global UI Components */}
      <ModalManager />
      <SnackbarManager />
      
      {/* Persistent Drawer */}
      <SidebarDrawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {/* Preserve in UI to keep local state */}
        <ToggleVisible show={chosenPost === null}>
          <PostManager />
        </ToggleVisible>
        {/* Render only when needed */}
        {chosenPost && (
          <ChosenPostManager />
        )}
      </SidebarDrawer>

      {/* Main Content */}
      <Header>
        <ToggleButton type="button" onClick={toggleDrawer(true)}>
          Open Toolbar
        </ToggleButton>
      </Header>
      {chosenPost != null ? (
        <EditorContainer>
          <Editor
            postKey={chosenPost.post.postDataId}
            postData={chosenPost.postData}
            onChange={onEditorChange}
          />
        </EditorContainer>
      ) : (
        <EmptyEditor />
      )}
    </RootContainer>
  );
}
const mapStateToProps = state => ({
  chosenPost: state.chosenPost
}); 
export default connect(mapStateToProps)(withFirebase(App));

