import React from 'react';
import * as FontAwesome from "react-icons/fa";

import Logout from "../../Splash/Logout";

export default function MobileBar(props) {

  function handleButtonPress(label) {
    props.setActiveTab(label);
    props.setBarOpen(false);
  }

  return ( 
    <div className="md:hidden">
      <div className="fixed inset-0 flex z-40">
        {/* <!--
          Off-canvas menu overlay, show/hide based on off-canvas menu state.

          Entering: "transition-opacity ease-linear duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "transition-opacity ease-linear duration-300"
            From: "opacity-100"
            To: "opacity-0"
        --> */}
        <div className="fixed inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
        {/* <!--
          Off-canvas menu, show/hide based on off-canvas menu state.

          Entering: "transition ease-in-out duration-300 transform"
            From: "-translate-x-full"
            To: "translate-x-0"
          Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "-translate-x-full"
        --> */}
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-green-700">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button onClick={() => props.setBarOpen(false)} className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer">
              <span className="sr-only">Close sidebar</span>
              {/* <!-- Heroicon name: outline/x --> */}
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"/>
            </div>
            <nav className="mt-5 px-2 space-y-2">

              { props.tabs.map( (tab) => {
                const { icon, label } = tab.props;
                const active = (props.activeTab === label);
                const activate = () => handleButtonPress(label);
                return (
                  <div onClick={ activate } className={`transition text-white group flex items-center px-2 py-2 text-sm cursor-pointer font-medium rounded-md ${ active ? "bg-green-800" : "hover:bg-green-600"}`}>
                    {React.createElement(FontAwesome[icon], { className: "inline-block my-1 ml-2 mr-4 h-6 w-6 "})}
                    { label }
                  </div>
                );
              })}

            </nav>
          </div>
          <div className="flex-shrink-0 flex p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  {React.createElement(FontAwesome["FaUserAlt"], { className: "text-white h-6 w-6 "})}
                </div>
                <div className="ml-3 flex-grow ">
                  <p className="text-sm font-medium text-white">
                    {props?.username}
                  </p>
                </div>
                <Logout/>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* <!-- Force sidebar to shrink to fit close icon --> */}
        </div>
      </div>
    </div>
  )
}