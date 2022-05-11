import React from "react";
import './GenerateControls.scss';


const GenerateControls = () => {
  return (
    <div className="GenerateControls">
      <button>generateComplement</button>
      <button>generateSplitComplements</button>
      <button>generateAnalogous</button>
      <button>generateTriadic</button>
      <button>generateTetradic</button>
      <button>generateSquare</button>
      <button>generateMonochromatic</button>
    </div>
  );
};

export default GenerateControls;
