import React from "react";
import { useStateValue } from "./../state";
import { ACTION_TYPES } from "./../reducers/index";
import VariationSelect from "./variation-select";
import AttributeGroup from "./block-attribute-group";

/**
 * Set of inputs that matches the attributes of the focused block on the canvas
 *
 * If the focusedBlock is of a type that has useDefaultControls=true, then
 * this component auto generates HTML5 inputs based on each attribute's type
 *
 * If the focusedBlock uses custom controls, then that will be rendered. The
 * custom control should have change handlers defined, which will be passed in
 * to the custom controls through this component.
 */
export default function BlockAttributes(props) {
  const [{ focusedBlock, pluginMap }, dispatch] = useStateValue();
  // Base case: no block is selected
  if (!focusedBlock) {
    return (
      <div className="text-center">
        <p>Select a block on the canvas to view its attributes.</p>
      </div>
    );
  }

  // Selected block has defined its own controls
  const plugin = pluginMap[focusedBlock.name];
  if (!plugin.useDefaultControls) {
    return <h1>TODO: Rendering and value updating!</h1>;
  }

  // Selected block relies on auto generated controls
  const onChange = function(e) {
    let newVal = e.target.value;
    if (e.target.type === "checkbox") {
      newVal = e.target.checked;
    }
    if (e.target.type === "number") {
      newVal = parseFloat(e.target.value);
    }
    dispatch({
      type: ACTION_TYPES.UPDATE_FOCUSED_BLOCK,
      payload: {
        name: e.target.dataset.name,
        val: newVal,
        variation: e.target.dataset.variation
      }
    });
  };

  let baseAttrProps = {
    attrs: plugin.baseAttrs,
    isBase: true,
    onChange: onChange,
    focusedBlock: focusedBlock
  };
  let variationName = focusedBlock.variation;
  let variation = plugin.variations.find(
    variation => variation.name === variationName
  );
  let variationAttrProps = {
    attrs: variation.attrs,
    isBase: false,
    onChange: onChange,
    variationName: variationName,
    focusedBlock: focusedBlock
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <AttributeGroup {...baseAttrProps} />
      <VariationSelect />
      <AttributeGroup {...variationAttrProps} />
    </form>
  );
}
