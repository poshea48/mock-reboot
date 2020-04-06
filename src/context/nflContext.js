import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import nflReducer, {
  initialState,
  settingsInitialState,
  settingsReducer,
} from './nflReducer';

const NFLStateContext = createContext();
const NFLDispatchContext = createContext();

function NFLProvider({ children }) {
  let localNflState;
  if (typeof window !== 'undefined') {
    localNflState = JSON.parse(localStorage.getItem('nflState'));
  }
  const [state, nflDispatch] = useReducer(
    nflReducer,
    localNflState || initialState
  );

  const [settingsState, settingsDispatch] = useReducer(settingsReducer, {
    ...settingsInitialState,
  });

  useEffect(() => {
    localStorage.setItem('nflState', JSON.stringify(state));
  }, [state]);

  return (
    <NFLStateContext.Provider value={{ state, settingsState }}>
      <NFLDispatchContext.Provider value={{ nflDispatch, settingsDispatch }}>
        {children}
      </NFLDispatchContext.Provider>
    </NFLStateContext.Provider>
  );
}

function useNflState() {
  const context = useContext(NFLStateContext);
  if (context === undefined) {
    throw new Error('useNflState must be used within a NFLProvider');
  }
  return context;
}

function useNflDispatch() {
  const context = useContext(NFLDispatchContext);
  if (context === undefined) {
    throw new Error('useNflDispatch must be used within a NFLProvider');
  }
  return context;
}

NFLProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { NFLProvider, useNflState, useNflDispatch };
