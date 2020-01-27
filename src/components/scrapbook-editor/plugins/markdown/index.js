import { MarkdownElement, VARIATION_DEFAULT } from "./markdown";

/**
 * Plugin definition for Markdown text
 */
const Image = {
  name: "markdown",
  label: "Markdown",
  description: "Parses and renders a markdown source",
  canvasElement: MarkdownElement,
  baseAttrs: [
    {
      name: "source",
      label: "Source",
      element: "textarea",
      rows: 7
    }
  ],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Default",
      attrs: []
    }
  ],
  defaultVariation: VARIATION_DEFAULT,
  useDefaultControls: true
};

export default Image;
