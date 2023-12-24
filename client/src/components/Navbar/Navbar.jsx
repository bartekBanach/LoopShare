import { Link, useNavigate } from 'react-router-dom';
import { FaInfinity } from 'react-icons/fa6';
import useAuthContext from '../../hooks/useAuthContext';
import useLogout from '../../hooks/useLogout';
import styles from './Navbar.module.css';
import useToastContext from '../../hooks/useToastContext';

function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const toast = useToastContext();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.info('User logged out.');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navsec}>
        <div className={styles.logo}>
          <Link to="/">
            <FaInfinity />
          </Link>
        </div>
        <Link className={styles.navlink} to="/browse">
          Browse
        </Link>
        {user && (
          <Link className={`${styles.upload}`} to="/upload">
            Upload
          </Link>
        )}
      </div>

      {!user && (
        <div className={styles.navsec}>
          <Link className={`${styles.navlink} ${styles.register}`} to="/signup">
            Register
          </Link>
          <Link className={`${styles.navlink} ${styles.login}`} to="/login">
            Log in
          </Link>
        </div>
      )}
      {user && (
        <div className={styles.navsec}>
          {user.email}
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
