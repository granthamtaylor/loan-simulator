import React, { useState, useContext } from "react";

import SideBar from './Navigation/SideBar';
import MobileButton from './Navigation/MobileButton';
import MobileBar from "./Navigation/MobileBar";

import { AuthenticationContext } from '../App.js';


function Blank(props) {
  return (

    <>
      
      { props.blank 
        ? props.n_reviewed >= 10
          ? props.content
          : <div className="min-h-screen flex items-center w-full justify-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg w-full">
                <div className="p-4 shadow rounded-lg bg-white">
                  <h1 className="relative inline-flex rounded-md w-full text-center">
                    Review { props.n_reviewed ? 10 - props.n_reviewed: 10 } more loans to view this page
                  </h1>
                </div>
              </div>
            </div>
        : props.content
        
      }

    </>
  )
}

export default function Main(props) {
  
  const { authState, userState } = useContext(AuthenticationContext);
  const [currentUser, setCurrentUser] = userState;

  const [ activeTab, setActiveTab ] = useState(props.children[0].props.label);
  const [ barOpen, setBarOpen ] = useState(false);

  return (

    <>
    
      <SideBar 
        tabs={props.children} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        username={currentUser}
      />

      { barOpen
        ? <MobileBar 
          tabs={props.children} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          setBarOpen={setBarOpen} 
          username={currentUser}
        />
        : null
      }

      <MobileButton click={ () => setBarOpen(true) }/>

      {props.children.map((child) => {
        if (child.props.label !== activeTab) return undefined;
        return <Blank content={child.props.children} n_reviewed={props.n_reviewed} blank={child.props.blank} />;
      })}

    </>
    
  );
}