import { AnimatePresence } from 'framer-motion';
import Toast from '../Toast/Toast';
import styles from './ToastsContainer.module.css';

function ToastsContainer({ toasts }) {
  return (
    <div className={styles.container}>
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} id={toast.id} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastsContainer;
