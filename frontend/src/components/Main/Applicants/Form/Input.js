import React from "react";

export default function Input(props) {

  let size;
  if (props.size === "sm") {
    size = " sm:col-span-2 md:col-span-3 "
  } else if (props.size === "md") {
    size = " sm:col-span-3 "
  } else {
    size = ""
  }


  return (
    <>
      { props?.value
        ? <div className={`col-span-6 ${ size }`}>
            <h1 className="block text-sm font-medium text-gray-700">
            {props?.label}
            </h1>
            <input disabled type="text" value={props?.value} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
          </div>
        : null
      }
    </>
  )
}
