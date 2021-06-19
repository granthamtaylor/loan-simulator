import React, { useContext } from "react";

import { AuthenticationContext } from '../App.js';
import axiosInstance from "../../helper/axiosApi";
import { FiLogOut } from 'react-icons/fi'

export default function Logout(props) {

  const { authState } = useContext(AuthenticationContext);
  const [authentication, setAuthentication] = authState;

  const handleLogout = async () => {

    const response = await axiosInstance.post('token/blacklist/', {
      "refresh_token": localStorage.getItem("refresh_token")
    });

    axiosInstance.defaults.headers['Authorization'] = null;
    localStorage.clear();
    setAuthentication( false );
    return response

  };

  return (
    <div className="transition text-center cursor-pointer rounded-lg text-xl text-white hover:bg-green-600" onClick={handleLogout}>
      <FiLogOut className="inline-block m-2"/>
    </div>
  )
}
