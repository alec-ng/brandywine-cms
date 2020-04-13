import React, { useState } from "react";
import { connect } from 'react-redux';
import { withFirebase } from './../hoc/firebase';

import PostFilterButtons from '../stateless/global/post-filter-buttons';
import PostTree from '../stateless/global/post-tree';
import GroupingSelect from '../stateless/global/post-grouping-select';
import Spinner from '../stateless/universal/spinner';

import useFilteredData, { ALL_POSTS } from '../../hooks/useFilteredData';
import { generateNewCmsPost, trim } from "../../util/post-generation";
import { createPost, GET_ALL_POSTS } from '../../state/actions/data-actions';
import { selectPost, openModal } from '../../state/actions';
import { selectPendingStatus } from '../../state/selectors';

/**
 * Container component for grouping level toolbar view
 * Allows the user to...
 * - switch between different post groupings
 * - view all posts in a grouping by chronological tree order and by publish status
 * - click a post to view and edit it
 * - create a new post
 */
function PostManager({
  chosenPost, 
  data, 
  postsPending, 
  dispatch, 
  firebase
}) {

  const [filter, setFilter] = useState(ALL_POSTS);
  const filteredData = useFilteredData(data, filter);
  
  // filters posts by publish status
  function toggleFilter(e) {
    setFilter(e.currentTarget.dataset.buttonkey);
  }

  // view a specific post
  function handleNodeSelect(newKey) {
    dispatch(selectPost(newKey));
  }
  
  // create a new post
  function onPostCreate(newPostValues) {
    const trimmedVals = trim(newPostValues);
    const newCmsPost = generateNewCmsPost(trimmedVals);
    dispatch(
      createPost(firebase, newCmsPost)
    ).catch(err => { console.error(err); })
  }
  function openCreateModal() {
    dispatch(openModal('create', {
      onSubmit: onPostCreate,
      data: data,
    }));
  }

  return (
    <>
      {/* <div className="mb-3">
        <GroupingSelect 
          onChange={onGroupingSelect} 
          defaultValue={postGroup} 
          disabled={postsPending}
        />
      </div> */}
      <div className="mb-3">
        <PostFilterButtons
          activeKey={filter}
          onClick={toggleFilter}
        />
      </div>
      <div className="mb-4">
        {
          postsPending
            ? 
              <div className="text-center">
                <Spinner />
              </div>
            :
              <PostTree
                data={filteredData}
                chosenPost={chosenPost}
                handleNodeSelect={handleNodeSelect}
              />     
        }
      </div>
      <div className="text-center">
        <button
          style={{ width: "100%" }}
          className="btn btn-success"
          type="button"
          onClick={openCreateModal}
        >
          Create New Post
        </button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    chosenPost: state.chosenPost,
    data: state.data,
    postsPending: selectPendingStatus(state, GET_ALL_POSTS)
  }
}
export default connect(mapStateToProps)(withFirebase(PostManager));