import {
  CoverPhotoElement,
  VARIATION_DEFAULT,
  VARIATION_TEXT_OVERLAY
} from "./cover-photo";

/**
 * Plugin definition for Cover Photo
 */
const CoverPhoto = {
  name: "coverPhoto",
  label: "Cover Photo",
  description: "Full width image rendered from a URL source",
  icon: null,
  canvasElement: CoverPhotoElement,
  baseAttrs: [
    {
      name: "urlSource",
      label: "URL",
      element: "input",
      type: "text"
    }
  ],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Base Cover Photo",
      attrs: []
    },
    {
      name: VARIATION_TEXT_OVERLAY,
      label: "Text Overlay",
      attrs: [
        {
          name: "text",
          label: "Caption",
          element: "input",
          type: "text"
        },
        {
          name: "align",
          label: "Text Alignment",
          element: "select",
          defaultRequired: true,
          defaultValue: "left",
          options: [
            {
              name: "left",
              label: "Left"
            },
            {
              name: "center",
              label: "Center"
            },
            {
              name: "right",
              label: "Right"
            }
          ]
        },
        {
          name: "top",
          label: "Top Offset (%)",
          element: "input",
          type: "range",
          min: 0,
          max: 100,
          defaultValue: 1
        },
        {
          name: "right",
          label: "Right Offset (%)",
          element: "input",
          type: "range",
          min: 0,
          max: 100,
          defaultValue: 1
        },
        {
          name: "bottom",
          label: "Bottom OFfset (%)",
          element: "input",
          type: "range",
          min: 0,
          max: 100,
          defaultValue: 1
        },
        {
          name: "left",
          label: "Left Offset (%)",
          element: "input",
          type: "range",
          min: 0,
          max: 100,
          defaultValue: 1
        }
      ]
    }
  ],
  defaultVariation: VARIATION_DEFAULT,
  useDefaultControls: true
};

export default CoverPhoto;
