import React, { useState, useEffect, createContext } from "react";


const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
          data.errors ? setLoggedIn(false) : setLoggedIn(true);
      });
  }, []);

  const login = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const logout = (user) => {
    setUser({});
    setLoggedIn(false);
  };

  const signup = (user) => {
    setUser(user);
    setLoggedIn(true);
  };



  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setLoggedIn,
        login,
        logout,
        signup,
        loggedIn,   
       }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
