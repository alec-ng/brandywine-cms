import React, { useState, useMemo } from "react";
import { connect } from 'react-redux';
import { withFirebase } from './../../hoc/firebase';
import filterPosts from './filter-posts';

import CMSPost from '../../../types/cms-post';
import { createPost, GET_ALL_POSTS } from '../../../state/actions/async-actions';
import { selectPost, openModal } from '../../../state/actions';
import { selectPendingStatus } from '../../../state/selectors';

import PostFilters  from '../../stateless/global/forms/post-filters';
import PostTree from '../../stateless/global/post-tree';
import Spinner from '../../stateless/generic/spinner';
import { StretchBtn } from '../../stateless/generic/util';

/**
 * Renders all posts in a tree view. Posts can be filtered, and selected.
 */
function PostManager({
  cmsPosts, 
  postsPending, 
  dispatch, 
  firebase
}) {
  // controlled filter state
  const [filters, setFilters] = useState({})
  const filteredPosts = useMemo(
    () => filterPosts(cmsPosts, filters),
    [cmsPosts, filters]
  )

  // view a specific post
  function handleNodeSelect(postId) {
    dispatch(selectPost(postId));
  }
  
  // create a new post
  function onPostCreate(baseMetadata) {
    const cmsPost = CMSPost.fromBaseMd(baseMetadata);
    dispatch(
      createPost(firebase, cmsPost)
    ).catch(err => { console.error(err); })
  }

  function openCreateModal() {
    dispatch(openModal('create', {
      onSubmit: onPostCreate,
      cmsPosts: cmsPosts,
    }));
  }

  return (
    <>
      <div className="mb-3">
        <PostFilters
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <div className="mb-4">
        {postsPending 
          ? <div className="text-center">
              <Spinner />
            </div> 
          : <PostTree
              isFiltered={Object.keys(filters).length}
              cmsPosts={filteredPosts}
              handleNodeSelect={handleNodeSelect}
            />     
        }
      </div>
      <StretchBtn
        className="btn btn-success"
        type="button"
        onClick={openCreateModal}
      >
        Create New Post
      </StretchBtn>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cmsPosts: Object.values(state.data),
    postsPending: selectPendingStatus(state, GET_ALL_POSTS)
  }
}
export default connect(mapStateToProps)(withFirebase(PostManager));