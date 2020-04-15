import React, { useState, useEffect } from 'react';
import { useTreeData } from "../../../util/tree-util";
import TreeView from "./treeview";

export default function PostTree({ data, handleNodeSelect }) { 
  const { treeData, monthKeys, yearKeys } = useTreeData(data);
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    if (monthKeys && yearKeys) {
      setExpandedKeys(monthKeys.concat(yearKeys));
    }
  }, [monthKeys, yearKeys])
  
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
      selectedKeys={[]}
      onExpand={onExpand}
    />
  );

}
