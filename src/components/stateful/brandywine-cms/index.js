import React, { useEffect, useState } from "react";
import { withFirebase } from '../../hoc/firebase';
import { connect } from 'react-redux';
import { updatePost } from '../../../state/actions';
import { getPosts } from '../../../state/actions/async-actions';

import ModalManager from './../modal-manager';
import SnackbarManager from './../snackbar-manager';
import Header from "../../stateless/global/layout/header";
import Sidebar from '../../stateless/global/layout/sidebar';
import PersistentDrawer from "../../stateless/global/layout/sidebar-drawer";
import Editor from '../../stateless/global/brandywine-editor';
import { EmptyEditor, MainShiftContainer } from './styles';

/**
 * Top level app composition container component
 */
function App({chosenPost, dispatch, firebase}) {
  // One time initial load to get all published posts
  useEffect(() => {
    dispatch(getPosts(firebase));
  }, [])

  // Controlled drawer state
  const [drawerOpen, toggleDrawer] = useState(true);
  
  // Synchronize editor changes with store
  function onEditorChange(header, blocks) {
    dispatch(updatePost({
      header: header,
      blocks: blocks
    }));
  }

  return (
    <div className="container-fluid px-0">
      {/* Global UI Components */}
      <ModalManager />
      <SnackbarManager />
      
      {/* Persistent Drawer */}
      <PersistentDrawer open={drawerOpen}>
        <Sidebar 
          isPostChosen={chosenPost !== null}
          toggleDrawer={toggleDrawer}
        />
      </PersistentDrawer>

      {/* Main Content */}
      <Header
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <MainShiftContainer open={drawerOpen}>
        {chosenPost != null ? (
          <Editor
            postKey={chosenPost.post.postDataId}
            postData={chosenPost.postData}
            onChange={onEditorChange}
          />
        ) : (
          <EmptyEditor />
        )}
      </MainShiftContainer>
    </div>
  );
}
const mapStateToProps = state => ({
  chosenPost: state.chosenPost
}); 
export default connect(mapStateToProps)(withFirebase(App));
