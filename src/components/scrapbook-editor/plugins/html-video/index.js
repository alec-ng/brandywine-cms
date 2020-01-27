import { VARIATION_DEFAULT, HTMLVideoElement } from './html-video';
import { VARIATION_AUTOPLAY  } from './variation-autoplay';

const HTMLVideo = {
  name: "html_video",
  label: "HTML Video",
  description: "Renders an HTML5 Video element to play from a URL source",
  canvasElement: HTMLVideoElement,
  baseAttrs: [
    {
      name: "urlSource",
      label: "URL Source",
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
          name: "stretch",
          label: "Stretch"
        },
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
        },
      ]
    }
  ],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Video with Controls",
      attrs: []
    },
    {
      name: VARIATION_AUTOPLAY,
      label: "Autoplay video without controls or audio",
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
          label: "Bottom Offset (%)",
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
    },
  ],
  defaultVariation: VARIATION_DEFAULT,
};
export default HTMLVideo;

