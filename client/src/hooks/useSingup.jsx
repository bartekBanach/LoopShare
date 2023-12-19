import { useState } from 'react';
import useAuthContext from './useAuthContext';
import useToastContext from './useToastContext';

const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const toast = useToastContext();

  const signup = async (email, username, password) => {
    setLoading(true);
    // setError(null);

    const res = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
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
      toast.success('Signed in successfully.');
    }
  };

  return { signup, loading, error };
};

export default useSignup;
