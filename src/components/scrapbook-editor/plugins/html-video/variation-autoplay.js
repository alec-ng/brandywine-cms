import React from "react";
import styled from "styled-components";
import VisibilitySensor from "react-visibility-sensor";
import { HTMLVideo, VideoContainer, AlignmentContainer } from "./html-video";

export const VARIATION_AUTOPLAY = "video_autoplay";

const OverlayContainer = styled.div`
  position: absolute;
  margin: 10px;
  color: #ffffff;
  top: ${props => (props.top && props.top !== "0" ? props.top + "%" : "auto")};
  right: ${props =>
    props.right && props.right !== "0" ? props.right + "%" : "auto"};
  bottom: ${props =>
    props.bottom && props.bottom !== "0" ? props.bottom + "%" : "auto"};
  left: ${props =>
    props.left && props.left !== "0" ? props.left + "%" : "auto"};
`;

export function AutoplayElement(props) {
  const alignmentClass = props.variationAttrs.align
    ? `text-${props.variationAttrs.align}`
    : "";
  const offsetDefined =
    (props.variationAttrs.top && props.variationAttrs.top !== "0") ||
    (props.variationAttrs.right && props.variationAttrs.right !== "0") !==
      "0" ||
    (props.variationAttrs.bottom && props.variationAttrs.bottom !== "0")(
      props.variationAttrs.left && props.variationAttrs.left !== "0"
    );

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
    } else if (video.playing) {
      video.pause();
    }
  }

  return (
    <VisibilitySensor partialVisibility={true} onChange={onChange}>
      <div ref={vidRef}>
        <AlignmentContainer sizeClassName={props.sizeClassName}>
          <VideoContainer>
            <HTMLVideo
              urlSource={props.baseAttrs.urlSource}
              attributes={attributes}
            />
            {offsetDefined && (
              <OverlayContainer
                top={props.variationAttrs.top}
                right={props.variationAttrs.right}
                bottom={props.variationAttrs.bottom}
                left={props.variationAttrs.left}
              >
                <p className={`${alignmentClass} text-overlay mb-0`}>
                  {props.variationAttrs.text}
                </p>
              </OverlayContainer>
            )}
          </VideoContainer>
        </AlignmentContainer>
      </div>
    </VisibilitySensor>
  );
}
