/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [players, setPlayers] = useState([]);

  const contextValue = {
    players,
    setPlayers
  };

  return (
    <AppContext.Provider value={contextValue}>
      { children }
    </AppContext.Provider>
  );
}

export default AppProvider;
