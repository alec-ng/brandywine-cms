import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import { HTMLVideo, VideoContainer, AlignmentContainer } from "./video";

export const VARIATION_AUTOPLAY = "video_autplay";

export function AutoplayElement(props) {
  let vidRef = React.useRef();

  let attributes = {
    muted: true,
    loop: true
  };

  // For autoplay variation- if video is visible, play. If not, pause
  function onChange(isVisible) {
    let video = this.children.ref.current.getElementsByTagName("video")[0];
    if (isVisible) {
      video.play();
    } else {
      video.pause();
    }
  }

  return (
    <VisibilitySensor partialVisibility={true} onChange={onChange}>
      <div ref={vidRef}>
        <AlignmentContainer sizeClassName={props.sizeClassName}>
          <VideoContainer>
            <HTMLVideo {...props} attributes={attributes} />
          </VideoContainer>
        </AlignmentContainer>
      </div>
    </VisibilitySensor>
  );
}
