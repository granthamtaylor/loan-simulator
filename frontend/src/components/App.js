import React, { useState } from "react";

import Authentication from "./Splash/Authentication";
import Main from "./Main/Main";

export const AuthenticationContext = React.createContext();

export default function App() {

  const [authenticated, setAuthentication] = useState( false );
  const [currentUser, setCurrentUser] = useState( false );

  return (
    <AuthenticationContext.Provider value={ {
      authState: [authenticated, setAuthentication], 
      userState: [currentUser, setCurrentUser] 
    } }>
      { authenticated
        ? <Main/>
        : <Authentication/>
      }
    </AuthenticationContext.Provider>
  );
}