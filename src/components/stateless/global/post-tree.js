import React, { useState } from 'react';
import { createTreeData, getInitialKeys } from "../../../util/tree-util";
import TreeView from "../universal/treeview";

export default function PostTree({data, chosenPost, handleNodeSelect}) {
  const treeData = createTreeData(data);
  const [selectedKeys, initialExpandedKeys] = getInitialKeys(
    chosenPost ? chosenPost.key : null,
    treeData
  );

  const [expandedKeys, setExpandedKeys] = useState(initialExpandedKeys);
  
  // If leaf, update seleted post state
  // If not a leaf, expand and show its children
  function onNodeSelect(selectedKeys, e) {
    if (e.node.isLeaf()) {
      const postKey = e.node.props.eventKey;
      handleNodeSelect(postKey);
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
    <TreeView
      treeData={treeData}
      onNodeSelect={onNodeSelect}
      expandedKeys={expandedKeys}
      selectedKeys={selectedKeys}
      onExpand={onExpand}
    />
  );

}
