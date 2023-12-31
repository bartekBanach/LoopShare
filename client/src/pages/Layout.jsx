import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import styles from './Layout.module.css';


function Layout() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
