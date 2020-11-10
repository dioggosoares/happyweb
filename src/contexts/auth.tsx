import React, { createContext, useReducer } from 'react';
import { initialState, UserReducer } from '../reducers/userReducer';

// import api from '../services/api';

interface AuthContextData {
  state: string;
  dispatch: object | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;
