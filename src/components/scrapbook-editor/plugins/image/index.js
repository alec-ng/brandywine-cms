import { ImageElement, VARIATION_DEFAULT } from "./image";

/**
 * Plugin definition for Image
 */
const Image = {
  name: "image",
  label: "Image",
  description: "An image rendered from a URL source",
  icon: null,
  canvasElement: ImageElement,
  baseAttrs: [
    {
      name: "urlSource",
      label: "URL",
      element: "input",
      type: "text"
    },
    {
      name: "size",
      label: "Size",
      element: "select",
      defaultRequired: true,
      defaultValue: "large",
      options: [
        {
          name: "large",
          label: "Large"
        },
        {
          name: "medium",
          label: "Medium"
        },
        {
          name: "small",
          label: "Small"
        }
      ]
    },
    {
      name: "primaryText",
      label: "Caption",
      element: "input",
      type: "text"
    },
    {
      name: "secondaryText",
      label: "Footnotes",
      element: "input",
      type: "text"
    }
  ],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Base Image",
      attrs: []
    }
  ],
  defaultVariation: VARIATION_DEFAULT,
  useDefaultControls: true
};

export default Image;
