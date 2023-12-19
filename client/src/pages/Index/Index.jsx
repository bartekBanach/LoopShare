import { FaFileUpload } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa6';
import { MdLibraryMusic } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Marquee from '../../components/Marquee/Marquee';
import styles from './Index.module.css';
import img1 from '../../assets/img1.jpg';
import useAuthContext from '../../hooks/useAuthContext';
import useToastContext from '../../hooks/useToastContext';

const marqueeContent = [
  { id: 0, text: 'Free resource for music producers' },
  { id: 1, text: 'Free resource for music producers' },
  { id: 2, text: 'Free resource for music producers' },
];

function Index() {
  const toast = useToastContext();
  const { user } = useAuthContext();

  const uploadRedirect = (e) => {
    if (!user) {
      e.preventDefault();
      toast.info('You must log in or create account to upload files.');
    }
  };

  const signupRedirect = (e) => {
    if (user) {
      e.preventDefault();
      toast.info('You are already logged in.');
    }
  };

  return (
    <div className={styles.container}>
      <Marquee content={marqueeContent} background="black" />

      <div className={styles.content}>
        <div className={styles.window}>
          <h1>
            <b>LoopShare.</b> A free resource for music producers.
          </h1>
          <p className={styles.windowText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>

          <div className={styles.cards}>
            <Link to="/browse" className={styles.card}>
              <MdLibraryMusic className={styles.cardIcon} />
              <p className={styles.cardText}>Explore sounds</p>
            </Link>
            <Link to="/signup" className={styles.card} onClick={signupRedirect}>
              <FaUserPlus className={styles.cardIcon} />
              <p className={styles.cardText}>Create an account</p>
            </Link>
            <Link to="/upload" className={styles.card} onClick={uploadRedirect}>
              <FaFileUpload className={styles.cardIcon} />
              <p className={styles.cardText}>Share your audio files</p>
            </Link>
          </div>
        </div>
        <div className={styles.aside}>
          <div className={styles.imgFrame}>
            <div className={styles.imgWrapper}>
              <img src={img1} alt="landing" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
