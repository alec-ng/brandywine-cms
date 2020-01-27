import React from "react";
import ImgPlaceholder from "./placeholder.jpg";

import { VARIATION_AUTOPLAY, AutoplayElement } from "./variation-autoplay";

export const VARIATION_DEFAULT = "video_default";

export function VideoElement(props) {
  let sizeClassName = `brandywine-width_${props.baseAttrs.size}`;
  return <Variation {...props} sizeClassName={sizeClassName} />;
}

export const HTMLVideo = function(props) {
  let attributes = props.attributes || {
    controls: true
  };
  return <video src={props.baseAttrs.src} preload="metadata" {...attributes} />;
};

export const VideoContainer = function(props) {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      {props.children}
    </div>
  );
};

export const AlignmentContainer = function(props) {
  return (
    <div className={props.sizeClassName} style={{ margin: "0 auto" }}>
      {props.children}
    </div>
  );
};

const Variation = function(props) {
  // base case
  if (!props.baseAttrs.src) {
    return (
      <AlignmentContainer sizeClassName={props.sizeClassName}>
        <PlaceholderImage />
      </AlignmentContainer>
    );
  }
  // variational data
  if (
    props.variation === VARIATION_AUTOPLAY &&
    props.baseAttrs.sourceType === "url"
  ) {
    return <AutoplayElement sizeClassName={props.sizeClassName} {...props} />;
  } else {
    // default case
    return (
      <AlignmentContainer sizeClassName={props.sizeClassName}>
        <VideoContainer>
          {props.baseAttrs.sourceType === "url" ? (
            <HTMLVideo {...props} />
          ) : (
            <IFrame title={props.baseAttrs.src} {...props} />
          )}
        </VideoContainer>
      </AlignmentContainer>
    );
  }
};

const PlaceholderImage = function(props) {
  return (
    <img alt="" src={ImgPlaceholder} className="img-fluid d-block mx-auto" />
  );
};

const IFrame = function(props) {
  console.log("Im here");
  return (
    <iframe
      title={props.baseAttrs.src}
      src={props.baseAttrs.src}
      className="embed-responsive-item"
      frameBorder="0"
      allow="fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};
