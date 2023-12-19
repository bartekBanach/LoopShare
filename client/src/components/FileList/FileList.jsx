import { FaFolderOpen } from 'react-icons/fa';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TbFileSad } from 'react-icons/tb';
import styles from './FileList.module.css';
import categories from '../../data/selectCategories';
import types from '../../data/selectTypes';
import keys from '../../data/selectKeys';

import CustomSelect from '../CustomSelect/CustomSelect';
import Spinner from '../Spinner/Spinner';
import File from '../File/File';

function FileList({ files, setFiles, loading, handleSubmit }) {
  const changeAttribute = (value, attribute, id) => {
    setFiles(
      files.map((file) => {
        if (file.id === id) {
          return { ...file, [attribute]: value };
        }
        return file;
      })
    );
  };

  const handleDelete = (id) => {
    setFiles((previousFiles) => {
      const newFiles = previousFiles.filter((file) => file.id !== id);
      return newFiles;
    });
  };

  const toggleChecked = (id) => {
    setFiles(
      files.map((file) => {
        if (id === file.id) {
          return { ...file, checked: !file.checked };
        }
        return file;
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <FaFolderOpen className={styles.headerIcon} />
          <h2>File list</h2>
        </div>

        <button
          className={styles.submitBtn}
          type="button"
          disabled={loading || files.length < 1}
          onClick={handleSubmit}
        >
          Upload
        </button>
      </div>

      {/* <AnimatePresence> */}
      {files.length > 0 && (
        <motion.div
          className={styles.menu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Controls files={files} setFiles={setFiles} loading={loading} />
          <Options files={files} setFiles={setFiles} />
        </motion.div>
      )}
      {/* </AnimatePresence> */}

      {files.length === 0 && (
        <div className={styles.communicat}>
          <TbFileSad className={styles.communicatIcon} />
          <p className={styles.communicatText}>No files added for upload.</p>
        </div>
      )}

      {loading && <Spinner text="Uploading..." display="absolute" />}

      <div className={`${styles.files} ${loading && styles.loading}`}>
        <AnimatePresence>
          {files.map((file) => (
            <File
              file={file}
              key={file.id}
              handleDelete={handleDelete}
              changeAttribute={changeAttribute}
              toggleChecked={toggleChecked}
              loading={loading}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Controls({ files, setFiles, loading }) {
  const selectAll = () => {
    setFiles(files.map((file) => ({ ...file, checked: true })));
  };

  const deselectAll = () => {
    setFiles(files.map((file) => ({ ...file, checked: false })));
  };

  const deleteSelected = () => {
    setFiles(files.filter((file) => file.checked !== true));
  };

  return (
    <div className={styles.controls}>
      <button disabled={loading} className={styles.btnPrimary} onClick={selectAll} type="button">
        Select All
      </button>

      <button disabled={loading} className={styles.controlsBtn} onClick={deselectAll} type="button">
        Deselect All
      </button>
      <button disabled={loading} className={styles.btnDanger} onClick={deleteSelected} type="button">
        Delete selected
      </button>
    </div>
  );
}

function Options({ files, setFiles }) {
  const [selects, setSelects] = useState({ category: '', type: '', key: '', bpm: 0 });

  const changeAttributeChecked = (value, attribute) => {
    setSelects({ ...selects, [attribute]: value });

    setFiles(
      files.map((file) => {
        if (file.checked) {
          return { ...file, [attribute]: value };
        }
        return file;
      })
    );
  };

  return (
    <div className={styles.options}>
      <p className={styles.optionsText}>Change selected files:</p>

      <CustomSelect
        options={categories}
        value={selects.category}
        placeholder="Category"
        onChange={(value) => changeAttributeChecked(value, 'category')}
      />
      <CustomSelect
        options={types}
        value={selects.type}
        placeholder="Type"
        onChange={(value) => changeAttributeChecked(value, 'type')}
      />
      <CustomSelect
        options={keys}
        value={selects.key}
        placeholder="Key"
        onChange={(value) => changeAttributeChecked(value, 'key')}
      />

      <label htmlFor="bpm-input" className={styles.bpmField}>
        BPM:
        <input
          className={styles.bpmInput}
          onChange={(e) => changeAttributeChecked(e.target.value, 'bpm')}
          maxLength={3}
          id="bpm-input"
        />
      </label>
    </div>
  );
}

export default FileList;
