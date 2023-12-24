import { FaRegSadTear } from 'react-icons/fa';
import { IoWarning } from 'react-icons/io5';
import Sample from '../Sample/Sample';
import styles from './SampleList.module.css';
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import Spinner from '../Spinner/Spinner';

function SampleList({ samples, loading, error }) {
  if (error)
    return (
      <div className={styles.container}>
        <div className={styles.communicat}>
          <IoWarning className={styles.icon} />
          <p>
            <b>Error!</b> A network error was encountered.
          </p>
        </div>
      </div>
    );
  if (loading)
    return (
      <div className={styles.container}>
        <div>
          <Spinner text="Loading samples..." />
        </div>
      </div>
    );
  return (
    <div className={styles.container}>
      {samples.length > 0 ? (
        samples.map((sample) => <Sample key={sample._id} sample={sample} />)
      ) : (
        <div className={styles.communicat}>
          <FaRegSadTear className={styles.icon} />
          <p>No matching samples found.</p>
        </div>
      )}
    </div>
  );
}

export default SampleList;
