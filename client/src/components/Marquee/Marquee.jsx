import styles from './Marquee.module.css';

function Marquee({ content, background = 'black' }) {
  return (
    <div className={`${styles.marquee} ${styles[background]}`}>
      <ul className={styles.marquee__content}>
        {content.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      <ul className={styles.marquee__content} aria-hidden="true">
        {content.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Marquee;
