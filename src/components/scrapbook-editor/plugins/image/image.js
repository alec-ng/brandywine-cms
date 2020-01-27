import React from "react";
import PlaceholderImgURL from "./placeholder.jpg";

const DEFAULT_SIZE = "large";
export const VARIATION_DEFAULT = "image_default";

export function ImageElement(props) {
  const imgSize = props.baseAttrs.size || DEFAULT_SIZE;
  const sizeClassName = `brandywine-width_${imgSize}`;
  let urlSource = props.baseAttrs.urlSource || PlaceholderImgURL;

  return (
    <div className={`${sizeClassName} mx-auto text-center brandywine-responsive-x-padding`}>
      <img
        alt=""
        src={urlSource}
        className="img-fluid d-block"
      />  
      {props.baseAttrs.primaryText && (
        <h6 className="mt-2 mx-3 mb-0">{props.baseAttrs.primaryText}</h6>
      )}
      {props.baseAttrs.secondaryText && (
        <small className="mx-3 text-muted text-center">
          {props.baseAttrs.secondaryText}
        </small>
      )}
    </div>
  );
}
