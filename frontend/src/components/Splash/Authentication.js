import React, { useState, useContext } from "react";

import Login from './Authentication/Login';
import Register from './Authentication/Register';

import axiosInstance from "../../helper/axiosApi";

import { AuthenticationContext } from '../App.js';

export default function Authentication(props) {
  
  const { authState, userState } = useContext(AuthenticationContext);
  const [authentication, setAuthentication] = authState;
  const [currentUser, setCurrentUser] = userState;

  const [ newUser, setNewUser ] = useState(false);
  const [ loginError, setLoginError ] = useState(false);
  const [ registerError, setRegisterError ] = useState(false);


  const handleLogin = async (username, password) => {

    axiosInstance.post('/token/obtain/', { username, password })
      .then( (response) => {
        axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        setAuthentication( response.data );
        setCurrentUser( username );

        return response

      })
      .catch( (error) => {
        setLoginError(true);
      });

  }

  const handleRegister = async (username, password, confirm_password) => {

    if (password === confirm_password) {
      
      axiosInstance.post('/token/register/', { username, password })
        .then( (response) => {
          handleLogin(username, password)
        })
        .catch( (error) => {
          setRegisterError(true);
        });

    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className={`p-4 shadow rounded-lg ${ (loginError === true && !newUser) || (registerError === true && newUser) ? "bg-red-100" : "bg-white"}`}>

          <span className="relative z-0 inline-flex shadow-sm rounded-md w-full mb-4">
            <button onClick={() => setNewUser(false)} type="button" className={`w-full relative px-4 py-2 rounded-l-md border bg-white text-sm text-center font-medium text-white hover:bg-green-600 ${ !newUser ? "bg-green-700" : "bg-green-500"}`}>
              Login
            </button>
            <button onClick={() => setNewUser(true)} type="button" className={`w-full -ml-px relative px-4 py-2 rounded-r-md border bg-white text-sm text-center font-medium text-white hover:bg-green-600 ${ newUser ? "bg-green-700" : "bg-green-500"}`}>
              Register
            </button>
          </span>

          { newUser
            ? <Register connect={ handleLogin } error={registerError} register={ handleRegister }/>
            : <Login connect={ handleLogin } error={loginError}/>
          }

        </div>
      </div>
    </div>
  )

}