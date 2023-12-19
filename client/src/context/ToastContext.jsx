import { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ToastContext = createContext();

export const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };

    case 'SHIFT_ADD_TOAST': {
      const [, ...rest] = state.toasts;
      const newToasts = [...rest, action.payload];

      return {
        ...state,
        toasts: newToasts,
      };
    }

    case 'DELETE_TOAST': {
      const updatedToasts = state.toasts.filter((toast) => toast.id !== action.payload);

      return {
        ...state,
        toasts: updatedToasts,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const initialState = {
  toasts: [],
};

export function ToastContextProvider({ children = null }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (type, message) => {
    const id = Math.floor(Math.random() * 10000000);

    if (state.toasts.length > 2) {
      dispatch({ type: 'SHIFT_ADD_TOAST', payload: { id, type, message } });
    } else {
      dispatch({ type: 'ADD_TOAST', payload: { id, type, message } });
    }
  };

  const remove = (id) => {
    dispatch({ type: 'DELETE_TOAST', payload: id });
  };

  const success = (message) => {
    addToast('success', message);
  };

  const warning = (message) => {
    addToast('warning', message);
  };

  const info = (message) => {
    addToast('info', message);
  };

  const error = (message) => {
    addToast('error', message);
  };

  const value = useMemo(() => ({ success, warning, info, error, remove, toasts: state.toasts }), [state.toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

ToastContextProvider.propTypes = {
  children: PropTypes.node,
};

ToastContextProvider.defaultProps = {
  children: null,
};
