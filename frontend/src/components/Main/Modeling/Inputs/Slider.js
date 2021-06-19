import React, { useState, useEffect } from 'react';

//destructive props
export default function RangeSlider({ classes, description, label, onChange, value, ...sliderProps }) {

  //set initial value to 0 this will change inside useEffect in first render also| or you can directly set useState(value)
  const [sliderVal, setSliderVal] = useState(0);

  // keep mouse state to determine whether i should call parent onChange or not.
  // so basically after dragging the slider and then release the mouse then we will call the parent onChange, otherwise parent function will get call each and every change
  const [mouseState, setMouseState] = useState(null);

  useEffect(() => {
    setSliderVal(value); // set new value when value gets changed, even when first render
  }, [value]);

  const changeCallback = (e) => {
    setSliderVal(e.target.value); // update local state of the value when changing
  }

  useEffect(() => {
    if (mouseState === "up") {
      onChange(sliderVal)// when mouse is up then call the parent onChange
    }
  }, [mouseState])

  return (
    <div className="w-full">
      <h2 className="text-black">{label}</h2>
      <p className="text-gray-500">{description}</p>
      <br></br>
      <h3 className="text-black">Current threshold: { sliderVal }%</h3>
      <input
        type="range"
        value={sliderVal}
        {...sliderProps}
        className={`w-full`}
        id="myRange"
        onChange={changeCallback}
        onMouseDown={() => setMouseState("down")} // When mouse down set the mouseState to 'down'
        onMouseUp={() => setMouseState("up")} // When mouse down set the mouseState to 'up' | now we can call the parent onChnage
      />
    </div>
  );
};