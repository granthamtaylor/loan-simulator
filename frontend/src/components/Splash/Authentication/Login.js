import React, { useRef } from 'react';

export default function Login(props) {

  const password = useRef("");
  const username = useRef("");

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    
    try {
      
      return props.connect( 
        username.current.value, 
        password.current.value 
      );

    } catch (error) {
      throw error;
    }
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <input id="username" ref={ username } placeholder="username" type="text" className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-transparent focus:z-10 sm:text-sm ${ props.error === true ? "border-8 border-red-700 focus:border-red-700" : "border-gray-300 focus:border-green-800" }`}/>
        <input id="password" ref={ password } placeholder="password" type="password" className={`appearance-none -mt-px rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-transparent focus:z-10 sm:text-sm ${ props.error === true ? "border-8 border-red-700 focus:border-red-700" : "border-gray-300 focus:border-green-800" }`}/>
      </div>
      <div className="mt-4">
        <input type="submit" value="Login" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"/>
      </div>
    </form>
  )

}