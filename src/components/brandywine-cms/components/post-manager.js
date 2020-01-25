import React, { useState } from "react";
import { createTreeData, getInitialKeys } from "./treeview/tree-util";
import TreeView from "./treeview/treeview";
import CreatePostModal from "./create-post-modal";
import ButtonGroup from "./button-group";

const ALL_POSTS = "ALL_POSTS";
const PUBLISHED_POSTS = "PUBLISHED_POSTS";
const DRAFT_POSTS = "DRAFT_POSTS";

const buttonGroupData = [
  {
    key: ALL_POSTS,
    label: "All"
  },
  {
    key: PUBLISHED_POSTS,
    label: "Published"
  },
  {
    key: DRAFT_POSTS,
    label: "Drafts"
  }
];

function getFilteredData(data, view) {
  if (view === ALL_POSTS) {
    return data;
  }

  let localData = JSON.parse(JSON.stringify(data));
  Object.keys(localData).forEach(key => {
    let deleteUnpublished =
      view === PUBLISHED_POSTS && !localData[key].post.isPublished;
    let deletePublished =
      view === DRAFT_POSTS && localData[key].post.isPublished;
    if (deleteUnpublished || deletePublished) {
      delete localData[key];
    }
  });
  return localData;
}

/**
 * "View All Posts" view in toolbar
 */
export default function PostManager(props) {
  const [postView, setPostView] = useState(ALL_POSTS);
  function toggleView(e) {
    setPostView(e.currentTarget.dataset.buttonkey);
  }

  // create tree and post modal data based on props
  const treeData = createTreeData(getFilteredData(props.data, postView));
  const existingKeyList = Object.keys(props.data).map(id =>
    props.data[id].post.key.toUpperCase()
  );

  // fully controlled tree state
  const [selectedKeys, initialExpandedKeys] = getInitialKeys(
    props.chosenPost ? props.chosenPost.key : null,
    treeData
  );
  const [expandedKeys, setExpandedKeys] = useState(initialExpandedKeys);

  // If leaf, update seleted post state
  // If not a leaf, expand and show its children
  function onNodeSelect(selectedKeys, e) {
    if (e.node.isLeaf()) {
      props.onNodeSelect(e.node.props.eventKey);
    } else {
      setExpandedKeys(
        e.node.props.expanded
          ? expandedKeys.filter(k => k !== e.node.props.eventKey)
          : expandedKeys.concat(e.node.props.eventKey)
      );
    }
  }

  function onExpand(expandedKeys) {
    setExpandedKeys(expandedKeys);
  }

  return (
    <>
      <div className="mb-3">
        <ButtonGroup
          buttons={buttonGroupData}
          activeKey={postView}
          onClick={toggleView}
        />
      </div>
      <div className="mb-4">
        <TreeView
          treeData={treeData}
          onNodeSelect={onNodeSelect}
          expandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          onExpand={onExpand}
        />
      </div>
      <div className="text-center">
        <CreatePostModal
          onSubmit={props.onPostCreate}
          existingKeyList={existingKeyList}
        />
      </div>
    </>
  );
}
