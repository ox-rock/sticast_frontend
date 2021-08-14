import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  userId: '',
  username: '',
  userBudget: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredData = () => {
  const storedToken = localStorage.getItem('token');
  const storedUsername = localStorage.getItem('username');
  const storedUserId = localStorage.getItem('userId');
  const storedUserBudget = localStorage.getItem('userBudget');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('userBudget');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    username: storedUsername,
    userId: storedUserId,
    userBudget: storedUserBudget,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const storedData = retrieveStoredData();
  
  let initialToken;
  let initialUserId;
  let initialUsername;
  let InitialUserBudget;
  if (storedData) {
    initialToken = storedData.token;
    initialUserId = storedData.userId;
    initialUsername = storedData.username;
    InitialUserBudget = storedData.userBudget;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);
  const [username, setUsername] = useState(initialUsername);
  const [userBudget, setUserBudget] = useState(InitialUserBudget);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    setUserBudget(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    localStorage.removeItem('userBudget');
    localStorage.removeItem('username');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (data, expirationTime) => {
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('expirationTime', expirationTime);

    setUserId(data.userId);
    localStorage.setItem('userId', data.userId);
 
    setUsername(data.username);
    localStorage.setItem('username', data.username);

    setUserBudget(data.userBudget);
    localStorage.setItem('userBudget', data.userBudget);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (storedData) {
      //console.log(storedData.duration);
      logoutTimer = setTimeout(logoutHandler, storedData.duration);
    }
  }, [storedData, logoutHandler]);

  const contextValue = {
    token: token,
    userId: userId,
    username: username,
    userBudget: userBudget,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
