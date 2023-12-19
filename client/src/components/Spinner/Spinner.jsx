import styles from './Spinner.module.css';

function Spinner({ text, display }) {
  return (
    <div className={`${styles.container} ${styles[display]}`}>
      <div className={styles.spinner} />
      <h3>{text}</h3>
    </div>
  );
}
export default Spinner;
