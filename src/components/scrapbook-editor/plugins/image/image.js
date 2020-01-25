import React from "react";
import PlaceholderImgURL from "./placeholder.jpg";

const DEFAULT_SIZE = "large";
export const VARIATION_DEFAULT = "image_default";

export function ImageElement(props) {
  const imgSize = props.baseAttrs.size || DEFAULT_SIZE;
  const sizeClassName = `brandywine-width_${imgSize}`;
  let urlSource = props.baseAttrs.urlSource || PlaceholderImgURL;

  return (
    <React.Fragment>
      <img
        alt=""
        src={urlSource}
        className={`${sizeClassName} img-fluid d-block mx-auto`}
      />
      {(props.baseAttrs.primaryText || props.baseAttrs.secondaryText) && (
        <div className={`${sizeClassName} text-center mx-auto`}>
          {props.baseAttrs.primaryText && (
            <h6 className="mt-2 mb-0">{props.baseAttrs.primaryText}</h6>
          )}
          {props.baseAttrs.secondaryText && (
            <small className="text-muted text-center">
              {props.baseAttrs.secondaryText}
            </small>
          )}
        </div>
      )}
    </React.Fragment>
  );
}
