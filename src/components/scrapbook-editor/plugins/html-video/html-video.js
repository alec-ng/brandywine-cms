import React from 'react';
import { VARIATION_AUTOPLAY, AutoplayElement } from './variation-autoplay';
import ImgPlaceholder from './placeholder.jpg';
import './style.css';

export const VARIATION_DEFAULT = 'html-video-default';
export const AlignmentContainer = function(props) {
  return (
    <div className={props.sizeClassName} style={{ margin: "0 auto" }}>
      {props.children}
    </div>
  );
};
export const VideoContainer = function(props) {
  return (
    <div className="embed-responsive embed-responsive-16by9" style={{position: 'relative'}}>
      {props.children}
    </div>
  );
};
export const HTMLVideo = function(props) {
  let attributes = props.attributes || {
    controls: true
  };
  return <video src={props.urlSource} preload="metadata" {...attributes} />;
};
const PlaceholderImage = function(props) {
  return (
    <img alt="" src={ImgPlaceholder} className="img-fluid d-block mx-auto" />
  );
};

export function HTMLVideoElement(props) {
  const sizeClassName = `brandywine-width_${props.baseAttrs.size}`;

  // base case: no link provided
  if (!props.baseAttrs.urlSource) {
    return (
      <AlignmentContainer sizeClassName={sizeClassName}>
        <PlaceholderImage />
      </AlignmentContainer>
    );
  }

  if (props.variation === VARIATION_AUTOPLAY) {
    const variationAttrs = JSON.parse(JSON.stringify(props.variationAttrs[VARIATION_AUTOPLAY]));
    return (
      <AutoplayElement 
        sizeClassName={sizeClassName} 
        baseAttrs={props.baseAttrs} 
        variationAttrs={variationAttrs} 
      />
    )
  }

  // default variation
  return (
    <AlignmentContainer sizeClassName={sizeClassName}>
      <VideoContainer>
        <HTMLVideo urlSource={props.baseAttrs.urlSource} />
      </VideoContainer>
    </AlignmentContainer>
  )
}
