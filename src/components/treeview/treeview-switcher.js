import React from "react";

/**
 * Switcher icon used in rc-tree
 * Returns an icon element with a nested SVG dependent if the node is a leaf or not
 */
export default function switcherIcon(node) {
  if (node.isLeaf) {
    return leafIcon;
  }
  return getExpandableNodeIcon({
    transform: `rotate(${node.expanded ? 90 : 0}deg)`
  });
}

// Parent container background color, used for switcher icon to blend in
const backgroundColour = "rgb(55, 58, 71)";

// expandableNodeIcon
const getExpandableNodeIcon = (svgStyle = {}) => {
  const arrowPath =
    "M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88" +
    ".5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3." +
    "6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-0.7 5." +
    "2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z";
  return (
    <i style={{ cursor: "pointer", backgroundColor: backgroundColour }}>
      <svg
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
        fill="currentColor"
        style={{ verticalAlign: "-.125em", ...svgStyle }}
      >
        <path d={arrowPath} />
      </svg>
    </i>
  );
};

// leafIcon
// Icon by Gregor Cresnar: https://www.flaticon.com/authors/gregor-cresnar from https://www.flaticon.com/
const leafIcon = (
  <i style={{ backgroundColor: backgroundColour }}>
    <svg
      viewBox="0 0 489.4 489.4"
      width="1em"
      height="1em"
      fill="currentColor"
      style={{ verticalAlign: "-.125em" }}
    >
      <g>
        <path
          d="M0,437.8c0,28.5,23.2,51.6,51.6,51.6h386.2c28.5,0,51.6-23.2,51.6-51.6V51.6c0-28.5-23.2-51.6-51.6-51.6H51.6
          C23.1,0,0,23.2,0,51.6C0,51.6,0,437.8,0,437.8z M437.8,464.9H51.6c-14.9,0-27.1-12.2-27.1-27.1v-64.5l92.8-92.8l79.3,79.3
          c4.8,4.8,12.5,4.8,17.3,0l143.2-143.2l107.8,107.8v113.4C464.9,452.7,452.7,464.9,437.8,464.9z M51.6,24.5h386.2
          c14.9,0,27.1,12.2,27.1,27.1v238.1l-99.2-99.1c-4.8-4.8-12.5-4.8-17.3,0L205.2,333.8l-79.3-79.3c-4.8-4.8-12.5-4.8-17.3,0
          l-84.1,84.1v-287C24.5,36.7,36.7,24.5,51.6,24.5z"
        />
        <path
          d="M151.7,196.1c34.4,0,62.3-28,62.3-62.3s-28-62.3-62.3-62.3s-62.3,28-62.3,62.3S117.3,196.1,151.7,196.1z M151.7,96
          c20.9,0,37.8,17,37.8,37.8s-17,37.8-37.8,37.8s-37.8-17-37.8-37.8S130.8,96,151.7,96z"
        />
      </g>
    </svg>
  </i>
);
