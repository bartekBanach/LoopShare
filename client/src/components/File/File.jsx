import { FaRegFileAudio } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { TiDelete } from 'react-icons/ti';
import styles from './File.module.css';
import categories from '../../data/selectCategories';
import types from '../../data/selectTypes';
import keys from '../../data/selectKeys';

import ProgressBar from '../ProgressBar/ProgressBar';
import CustomSelect from '../CustomSelect/CustomSelect';

function File({ file, handleDelete, changeAttribute, toggleChecked, loading }) {
  return (
    <motion.div
      className={`${styles.file}`}
      layout
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      transition={{ duration: 0.3, x: { duration: 0.3 } }}
      key={file.id}
    >
      <div className={styles.fileHeader}>
        <div className={styles.fileTitle}>
          <FaRegFileAudio className={styles.fileIcon} />
          <h4>{file.binary.name}</h4>
        </div>

        <div className={styles.controls}>
          <input
            name={file.id}
            checked={file.checked}
            className={styles.checkbox}
            type="checkbox"
            onChange={() => toggleChecked(file.id)}
          />
          <button aria-label="delete" type="button" className={styles.deleteBtn} onClick={() => handleDelete(file.id)}>
            <TiDelete />
          </button>
        </div>
      </div>

      <div className={styles.fileContent}>
        <CustomSelect
          options={categories}
          value={file.category}
          placeholder="Category"
          onChange={(value) => changeAttribute(value, 'category', file.id)}
        />
        <CustomSelect
          value={file.type}
          options={types}
          placeholder="Type"
          onChange={(value) => changeAttribute(value, 'type', file.id)}
        />
        <CustomSelect
          value={file.key}
          options={keys}
          placeholder="Key"
          onChange={(value) => changeAttribute(value, 'key', file.id)}
        />

        <label htmlFor="bpm-input" className={styles.bpmField}>
          BPM:
          <input
            className={styles.bpmInput}
            id="bpm-input"
            value={file.bpm}
            maxLength={3}
            onChange={(e) => {
              changeAttribute(e.target.value, 'bpm', file.id);
            }}
          />
        </label>
      </div>
      {loading && <ProgressBar color="blue" progress={file.progress} />}
    </motion.div>
  );
}

export default File;
