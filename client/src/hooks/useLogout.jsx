import useAuthContext from './useAuthContext';

const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};

export default useLogout;
