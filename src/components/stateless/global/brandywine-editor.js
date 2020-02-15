import React from 'react';

import { BrandywineEditor } from "react-brandywine-editor";
import Image from "react-brandywine-editor/lib/plugins/image/";
import Markdown from "react-brandywine-editor/lib/plugins/markdown/";
import CoverPhoto from "react-brandywine-editor/lib/plugins/cover-photo/";
import Spacer from "react-brandywine-editor/lib/plugins/spacer/";
import Carousel from "react-brandywine-editor/lib/plugins/carousel/";
import EmbeddedVideo from "react-brandywine-editor/lib/plugins/embedded-video/";
import HTMLVideo from "react-brandywine-editor/lib/plugins/html-video/";

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, HTMLVideo, EmbeddedVideo];

export default function Editor({postKey, postData, onChange}) {
  return (
    <BrandywineEditor
      showPluginDescription={false}
      plugins={plugins}
      key={postKey}
      onChange={onChange}
      pageData={postData}
    />
  )
}