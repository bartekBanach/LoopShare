import { useState } from 'react';
import useAuthContext from './useAuthContext';
import useToastContext from './useToastContext';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const toast = useToastContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(json.error);
      toast.error(json.error);
    }

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      setLoading(false);
      toast.success('Logged in successfully.');
    }
  };

  return { login, loading, error };
};

export default useLogin;
