import {
  CarouselElement,
  DEFAULT_NUM_CARDS,
  VARIATION_DEFAULT
} from "./carousel";

const Carousel = {
  name: "carousel",
  label: "Carousel",
  description: "Renders multiple images in a carousel",
  icon: null,
  canvasElement: CarouselElement,
  baseAttrs: [
    {
      name: "numCards",
      label: "Number of cards to show on screen",
      element: "input",
      type: "number",
      defaultValue: DEFAULT_NUM_CARDS
    },
    {
      name: "height",
      label: "Max Height (px)",
      element: "input",
      type: "range",
      min: 200,
      max: 700,
      defaultValue: 400
    },
    {
      name: "urlSources",
      label: "URL Sources (separate each link with a new line)",
      element: "textarea"
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
      name: "caption",
      label: "Caption",
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

export default Carousel;
