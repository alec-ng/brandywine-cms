import React, { useState } from "react";
import { connect } from 'react-redux';
import { withFirebase } from './../hoc/firebase';

import PostFilterButtons from '../stateless/global/post-filter-buttons';
import PostTree from '../stateless/global/post-tree';
import GroupingSelect from '../stateless/global/post-grouping-select';
import Spinner from '../stateless/universal/spinner';

import useFilteredData, { ALL_POSTS } from '../../hooks/useFilteredData';
import { generateNewCmsPost } from "../../util/post-generation";
import { createPost, setGrouping, SET_GROUPING } from '../../state/actions/data-actions';
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
function PostManager(
  {chosenPost, postGroup, data, postsPending, dispatch, firebase}
) {

  const [filter, setFilter] = useState(ALL_POSTS);
  const dataSlice = data[postGroup];
  const filteredData = useFilteredData(dataSlice, filter);
  
  // filters posts by publish status
  function toggleFilter(e) {
    setFilter(e.currentTarget.dataset.buttonkey);
  }

  // view a specific post
  function handleNodeSelect(newKey) {
    dispatch(selectPost(newKey));
  }

  // filter all posts by specific grouping
  function onGroupingSelect(e) {
    const grouping = e.currentTarget.value;
    const dispatchReturnVal = dispatch(
      setGrouping(firebase, grouping, data)
    );
    if (dispatchReturnVal.then) {
      dispatchReturnVal.catch(err => { console.error(err) });
    }
  }
  
  // create a new post
  function onPostCreate({title, date}) {
    const newCmsPost = generateNewCmsPost(date, title, postGroup);
    dispatch(
      createPost(firebase, newCmsPost)
    ).catch(err => { console.error(err); })
  }
  function openCreateModal() {
    dispatch(openModal('create', {
      onSubmit: onPostCreate,
      groupingDataSlice: dataSlice,
      postGroup: postGroup
    }));
  }

  return (
    <>
      <div className="mb-3">
        <GroupingSelect 
          onChange={onGroupingSelect} 
          defaultValue={postGroup} 
          disabled={postsPending}
        />
      </div>
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
      {postGroup &&
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
      }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    chosenPost: state.chosenPost,
    data: state.data,
    postGroup: state.postGroup,
    postsPending: selectPendingStatus(state, SET_GROUPING)
  }
}
export default connect(mapStateToProps)(withFirebase(PostManager));