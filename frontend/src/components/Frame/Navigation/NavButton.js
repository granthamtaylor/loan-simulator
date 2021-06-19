import React from 'react';

import * as FontAwesome from "react-icons/fa";

export default function Tab(props) {

  return (
    <div className="text-white bg-white rounded-lg group flex items-center p-1 text-sm font-medium" onClick={props.onClick}>
      {React.createElement(FontAwesome[props.icon], { className: "inline-block m-2"})}
    </div>
  );

}