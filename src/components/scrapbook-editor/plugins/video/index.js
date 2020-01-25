import { VARIATION_DEFAULT, VideoElement } from "./video";
import { VARIATION_AUTOPLAY } from "./variation-autoplay";

const Video = {
  name: "video",
  label: "Video",
  description: "Renders an embedded or source video",
  icon: null,
  canvasElement: VideoElement,
  baseAttrs: [
    {
      name: "sourceType",
      label: "Source Type",
      element: "select",
      defaultRequired: true,
      defaultValue: "url",
      options: [
        {
          name: "url",
          label: "URL Source (mp4/webm/ogg)"
        },
        {
          name: "embed",
          label: "Embedded Link (e.g. YouTube, Vimeo)"
        }
      ]
    },
    {
      name: "src",
      label: "Source",
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
        }
      ]
    }
  ],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Default Video",
      attrs: []
    },
    {
      name: VARIATION_AUTOPLAY,
      label: "Autoplay / Looping",
      attrs: []
    }
  ],
  defaultVariation: VARIATION_DEFAULT,
  useDefaultControls: true
};

export default Video;
