import React from "react";
import { Tooltip } from "react-tooltip";

const tooltipCreator = (text, anchor) => {
  return (
    <Tooltip anchorSelect={anchor} place="top" effect="solid">
      {text}
    </Tooltip>
  );
};

export default tooltipCreator;
