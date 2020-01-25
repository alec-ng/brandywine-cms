import React from "react";
import switcherIcon from "./treeview-switcher";
import "rc-tree/assets/index.css";
import "./treeview.css";
import Tree from "rc-tree";
import { motion } from "./tree-util";

/**
 * Renders a treeview that provides options for a initially selected post.
 */
export default function Treeview(props) {
  return (
    <>
      {props.treeData && props.treeData.length ? (
        <Tree
          checkable={false}
          expandedKeys={props.expandedKeys}
          selectedKeys={props.selectedKeys}
          motion={motion}
          switcherIcon={switcherIcon}
          showIcon={false}
          showLine={true}
          onSelect={props.onNodeSelect}
          onExpand={props.onExpand}
          treeData={props.treeData}
        />
      ) : (
        <p>You have no posts to show.</p>
      )}
    </>
  );
}
