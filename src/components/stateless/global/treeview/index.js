import React from "react";
import switcherIcon from "./switcher-icon";
import "rc-tree/assets/index.css";
import "./overrides.css";
import Tree from "rc-tree";

/**
 * Renders a treeview that provides options for a initially selected post.
 */
export function Treeview({ 
  treeData,
  expandedKeys,
  selectedKeys,
  onNodeSelect,
  onExpand
}) {
  if (!treeData || !treeData.length) {
    return null;
  }
  return (  
    <Tree
      checkable={false}
      expandedKeys={expandedKeys}
      selectedKeys={selectedKeys}
      motion={motion}
      switcherIcon={switcherIcon}
      showIcon={false}
      showLine={true}
      onSelect={onNodeSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
}

export * from './createTreeData';

/**
 * Animation of node expansion
 */
const onEnterActive = node => {
  return { height: node.scrollHeight };
};

const motion = {
  motionName: "node-motion",
  motionAppear: false,
  onEnterActive,
  onLeaveStart: node => ({ height: node.offsetHeight })
};