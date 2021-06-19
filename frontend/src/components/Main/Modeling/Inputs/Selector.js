import React from 'react';

export default function Selector(props) {

  return (

    <span class="relative z-0 inline-flex shadow-sm rounded-md">
      <div class="relative inline-flex items-center px-6 py-2 bg-white text-md font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">Select a Model Algorithm:</div>
      <button onClick={() => props.setActive('logit')} type="button" class={`relative inline-flex items-center px-6 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${ props.active === "logit" ? "bg-gray-100" : ""}`}>
        Logistic Regression
      </button>
      <button onClick={() => props.setActive('xgb')} type="button" class={`-ml-px relative inline-flex items-center px-6 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${ props.active === "xgb" ? "bg-gray-100" : ""}`}>
        Extreme Gradient Boosting
      </button>
    </span>

  )

}