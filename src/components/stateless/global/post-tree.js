import React, { useState, useEffect, useMemo } from 'react';
import { Treeview, createTreeData } from "./treeview";

/**
 * Controlled rc-tree instance
 */
export default function PostTree({ 
  isFiltered,
  cmsPosts, 
  handleNodeSelect 
}) { 
  const [expandedKeys, setExpandedKeys] = useState([]);
  const { treeData, monthKeys, yearKeys } = useMemo(
    () => createTreeData(cmsPosts),
    [cmsPosts]
  );

  /**
   * If data is filtered, auto expand all keys
   */
  useEffect(() => {
    if (monthKeys && yearKeys && isFiltered) {
      setExpandedKeys(monthKeys.concat(yearKeys));
    } else {
      setExpandedKeys([]);
    }
  }, [monthKeys, yearKeys, isFiltered])
  
  /**
   * If leaf, update seleted post state
   * If not a leaf, expand and show its children
   */
  function onNodeSelect(selectedKeys, e) {
    if (e.node.isLeaf()) {
      const postId = e.node.props.eventKey;
      handleNodeSelect(postId);
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
      <div className="mb-2">
        Total: {cmsPosts.length}
      </div>
      <Treeview
        treeData={treeData}
        onNodeSelect={onNodeSelect}
        expandedKeys={expandedKeys}
        selectedKeys={[]}
        onExpand={onExpand}
      />
    </>
  );
}
