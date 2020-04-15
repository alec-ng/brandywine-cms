import React, { useEffect } from "react";
import styled from "styled-components";
import { withFirebase } from '../hoc/firebase';
import { connect } from 'react-redux';

import { updatePost } from '../../state/actions';
import { getPosts } from '../../state/actions/data-actions';

import Header from "../stateless/global/header";
import Editor from '../stateless/global/brandywine-editor';
import SidebarDrawer from "../stateless/global/sidebar-drawer";
import ModalManager from './modal-manager';
import SnackbarManager from './snackbar-manager';
import PostManager from "./post-manager";
import ChosenPostManager from "./chosen-post-manager";

/**
 * Top level app composition container component
 */
function App({chosenPost, dispatch, firebase}) {

  // One time initial load to get all published posts
  useEffect(() => {
    dispatch(getPosts(firebase));
  }, [])

  function onEditorChange(header, blocks) {
    dispatch(updatePost({
      header: header,
      blocks: blocks
    }));
  }
  return (
    <RootContainer className="container-fluid px-0">
      <ModalManager />
      <SnackbarManager />
      <Header>
        <SidebarDrawer>
          <PostManagerContainer chosenPost={chosenPost}>
            <PostManager />
          </PostManagerContainer>

          {chosenPost && (
            <ChosenPostManager />
          )}
        </SidebarDrawer>
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
        <EmptyEditorContainer>
          <h1 className="text-muted">
            In the toolbar, select or create a post to modify its contents here.
          </h1>
        </EmptyEditorContainer>
      )}
    </RootContainer>
  );
}
const mapStateToProps = state => {
  return {
    chosenPost: state.chosenPost
  }
}; 
export default connect(mapStateToProps)(withFirebase(App));

// -------------- STYLES

const appbarHeight = '64px';

const RootContainer = styled.div`
  padding-top: ${appbarHeight};
`;
const EditorContainer = styled.div`
  height: calc(100vh - ${appbarHeight});
  overflow-y: auto;
`;
const PostManagerContainer = styled.div`
  display: ${props => (props.chosenPost ? "none" : "inherit")};
`;
const EmptyEditorContainer = styled.div`
  display: flex;
  text-align: center;
  height: calc(100vh - ${appbarHeight});
  justify-content: center;
  flex-direction: column;
`;
