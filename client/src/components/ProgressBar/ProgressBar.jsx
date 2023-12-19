import styles from './ProgressBar.module.css';

function ProgressBar({ progress = 0 }) {
  return (
    <div className={styles.progressBar}>
      <div className={styles.complete} style={{ width: `${progress}%` }}>
        <span className={styles.progress}>{progress}%</span>
      </div>
    </div>
  );
}
export default ProgressBar;
