import React from "react";

export default function FormSection(props) {

  return (
    
    <div className="mt-10 sm:mt-0 px-6 ">
      <div>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            { props.title }
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            { props.subtitle }
          </p>
        </div>
      </div>
      <div>
        <form action="#" method="POST">
          <div className="pt-6 pb-2">
            <div className="grid grid-cols-6 gap-6">
              { props.children }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}