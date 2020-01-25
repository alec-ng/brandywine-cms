import React from "react";

const VARIATION_DEFAULT = "spacer_default";
const VARIATION_INVERSE = "inverse";
const DEFAULT_SPACE_SIZE = 20;
const DEFAULT_SPACE_UNIT = "px";

const Spacer = {
  name: "spacer",
  label: "Spacer",
  description: "Remove or add space in between blocks",
  canvasElement: SpacerElement,
  baseAttrs: [],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Add Space",
      attrs: [
        {
          name: "factor",
          label: "Size",
          element: "select",
          defaultRequired: true,
          defaultValue: "1",
          options: [
            {
              name: "1",
              label: "Normal"
            },
            {
              name: "3",
              label: "Medium"
            },
            {
              name: "5",
              label: "Large"
            }
          ]
        }
      ]
    },
    {
      name: VARIATION_INVERSE,
      label: "Remove Space",
      attrs: []
    }
  ],
  defaultVariation: VARIATION_DEFAULT,
  useDefaultControls: true
};
export default Spacer;

function SpacerElement(props) {
  if (props.variation === VARIATION_INVERSE) {
    if (props.isEditable) {
      return (
        <p className="text-center text-muted my-0">
          This space will not exist in read mode.
        </p>
      );
    }
    return (
      <div
        style={{ marginTop: `-${DEFAULT_SPACE_SIZE}${DEFAULT_SPACE_UNIT}` }}
      ></div>
    );
  }

  // default
  let spaceSize =
    parseInt(props.variationAttrs[VARIATION_DEFAULT].factor) *
    DEFAULT_SPACE_SIZE;
  return (
    <div style={{ paddingTop: `${spaceSize}${DEFAULT_SPACE_UNIT}` }}></div>
  );
}
