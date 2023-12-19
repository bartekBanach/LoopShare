import { TbAlertCircleFilled, TbCircleCheckFilled, TbX } from 'react-icons/tb';

import { BiSolidErrorAlt, BiSolidInfoCircle } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import useToastContext from '../../hooks/useToastContext';
import styles from './Toast.module.css';

const toastTypes = {
  success: {
    icon: <TbCircleCheckFilled />,
    title: 'Success!',
  },
  warning: {
    icon: <TbAlertCircleFilled />,
    title: 'Warning!',
  },
  info: {
    icon: <BiSolidInfoCircle />,
    title: 'Info:',
  },
  error: {
    icon: <BiSolidErrorAlt />,
    title: 'Error!',
  },
};

function Toast({ message, type, id }) {
  const { icon, title } = toastTypes[type];
  const toast = useToastContext();
  const timerId = useRef(null);

  const handleDismiss = () => {
    toast.remove(id);
  };

  useEffect(() => {
    timerId.current = setTimeout(() => {
      handleDismiss();
    }, 10000);

    return () => clearTimeout(timerId.current);
  }, []);

  return (
    <motion.div
      layout
      className={`${styles.container} ${styles[type]}`}
      initial={{ y: 500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, y: { duration: 0.3 } }}
    >
      <div className={styles.content}>
        <div className={styles.icon}>{icon}</div>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.message}>{message}</p>
      </div>

      <button
        type="button"
        aria-label="dismiss"
        className={`${styles.dismissBtn} ${styles[type]}`}
        onClick={handleDismiss}
      >
        <TbX />
      </button>
    </motion.div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Toast;
