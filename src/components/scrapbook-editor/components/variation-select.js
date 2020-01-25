import React from "react";
import { useStateValue } from "./../state";
import { ACTION_TYPES } from "./../reducers/index";
import Select from "./select";

/**
 * Renders a select option that toggles the variation of the currently focused block
 */
export default function VariationSelect(props) {
  const [{ focusedBlock, pluginMap }, dispatch] = useStateValue();

  function onSelectChange(e) {
    let newVariation = e.target.value;
    if (focusedBlock.variation === newVariation) {
      return;
    }
    dispatch({
      type: ACTION_TYPES.UPDATE_VARIATION,
      payload: {
        variation: newVariation
      }
    });
  }

  // Generate options for each variation of focused block type, with selected option being
  // current variation being used
  let currPlugin = pluginMap[focusedBlock.name];
  const optionsList = currPlugin.variations.map(variation => {
    return {
      name: variation.name,
      label: variation.label
    };
  });

  // If only one variation (default), do not render anything
  if (optionsList.length < 2) {
    return <React.Fragment></React.Fragment>;
  }

  let attributes = {
    value: focusedBlock.variation
  };
  return (
    <Select
      defaultRequired={true}
      multiple={false}
      attributes={attributes}
      label="Variation"
      onChange={onSelectChange}
      options={optionsList}
    />
  );
}
