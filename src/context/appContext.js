import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
  isNflSetup: false,
  isNflFinished: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'nflSetup': {
      return { ...state, ...action.payload };
    }
    case 'nflFinished': {
      return { ...state, isNflFinished: true };
    }
    case 'reset': {
      localStorage.removeItem('appState');
      return {
        ...initialState,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

let appLocalState;
if (typeof window !== 'undefined') {
  appLocalState = JSON.parse(localStorage.getItem('appState'));
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(
    appReducer,
    appLocalState || initialState
  );
  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }
  return context;
}

function useAppDispatch() {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }
  return context;
}

AppProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { AppProvider, useAppState, useAppDispatch };
