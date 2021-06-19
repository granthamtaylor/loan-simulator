import React from 'react';
import * as FontAwesome from "react-icons/fa";

import Logout from "../../Splash/Logout";

export default function SideBar(props) {
  return (
    <div className="hidden bg-green-700 md:flex md:flex-shrink-0 select-none">
      <div className="flex flex-col w-64">
        {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
        <div className="flex flex-col h-0 flex-1">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img className="h-8 w-auto" src={process.env.PUBLIC_URL + 'blvd_logo_ko_rgb.svg'} alt="Boulevard Consulting"/>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-2">

              { props.tabs.map( (tab) => {
                const { icon, label } = tab.props;
                const active = (props.activeTab === label);
                const activate = () => props.setActiveTab(label);
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
      </div>
    </div>
  )
}