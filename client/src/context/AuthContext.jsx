import { createContext, useReducer, useEffect, useMemo } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { user: action.payload };
    }
    case 'LOGOUT': {
      return { user: null };
    }
    default: {
      return state;
    }
  }
};

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

