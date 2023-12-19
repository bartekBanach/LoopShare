import { AnimatePresence, motion } from 'framer-motion';
import styles from './Collapsible.module.css';

function Collapsible({ children, open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Collapsible;
