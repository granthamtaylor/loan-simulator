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
            <label for="price" class="block text-sm font-medium text-gray-700">
              {props?.label}
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">
                  $
                </span>
              </div>
              <input disabled type="text" value={props?.value}  class="mt-1 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" aria-describedby="price-currency"/>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm" id="price-currency">
                  USD
                </span>
              </div>
            </div>
          </div>
        : null
      }
    </>
  )
}

