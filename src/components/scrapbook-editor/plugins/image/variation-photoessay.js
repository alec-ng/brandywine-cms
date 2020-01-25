import React from "react";
import styled from "styled-components";

export const PHOTOESSAY_DEFN = {
  name: "IMAGE_PHOTOESSAY",
  label: "Photoessay",
  description: "Full width image with text overlay"
};

export function Photoessay(props) {
  const PhotoessayImage = styled.img`
    width: 100%;
  `;

  return (
    <React.Fragment>
      <PhotoessayImage
        className="img-fluid width-100"
        alt={props.text}
        src={props.src}
      ></PhotoessayImage>
      {props.text ? (
        <TextOverlay
          style={props.text.style}
          content={props.text.content}
        ></TextOverlay>
      ) : null}
    </React.Fragment>
  );
}

function TextOverlay(props) {
  if (!props) {
    return;
  }

  // Apply prop specific styles
  const Container = styled.div(props.style);
  // Apply standard static styles
  const TextContainer = styled(Container)`
    position: absolute;
    margin: 10px;
    color: #ffffff;
    font-size: 20px;
  `;

  return <TextContainer>{props.content}</TextContainer>;
}
