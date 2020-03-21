import React from 'react';

import { BrandywineEditor } from "react-brandywine-editor/lib/edit-mode/index";
import Image from "react-brandywine-editor/lib/plugins/image/";
import Markdown from "react-brandywine-editor/lib/plugins/markdown/";
import CoverPhoto from "react-brandywine-editor/lib/plugins/cover-photo/";
import Spacer from "react-brandywine-editor/lib/plugins/spacer/";
import Carousel from "react-brandywine-editor/lib/plugins/carousel/";
import EmbeddedVideo from "react-brandywine-editor/lib/plugins/embedded-video/";
import HTMLVideo from "react-brandywine-editor/lib/plugins/html-video/";

const plugins = [
  Image, 
  Markdown, 
  CoverPhoto, 
  Spacer, 
  Carousel, 
  HTMLVideo, 
  EmbeddedVideo
];

/**
 * Renders a brandywine editor, and only rerenders if the postKey changes
 * (postData is loaded initially and doesn't need to be synced)
 */
function Editor({postKey, postData, onChange}) {
  console.log('rerendered');
  return (
    <div className="mx-5">
      <BrandywineEditor
        showPluginDescription={false}
        plugins={plugins}
        key={postKey}
        onChange={onChange}
        pageData={postData}
      />
    </div>
  );
}

function isEqual(prevProps, nextProps) {
  return prevProps.postKey === nextProps.postKey;
}
export default React.memo(Editor, isEqual);
