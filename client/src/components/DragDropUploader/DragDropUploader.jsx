import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GrCloudUpload } from 'react-icons/gr';
import { FaArrowDown } from 'react-icons/fa6';
import styles from './DragDropUploader.module.css';
import useToastContext from '../../hooks/useToastContext';

function DragDropUploader({ setFiles }) {
  const [dragActive, setDragActive] = useState(false);
  const toast = useToastContext();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      let wrongTypeError = false;
      let sizeError = false;

      let acceptedFiles = Array.from(e.dataTransfer.files).filter((file) => {
        if (file.type !== 'audio/mpeg' && file.type !== 'audio/wav') {
          wrongTypeError = true;
          return false;
        }
        if (file.size > 5000000) {
          sizeError = true;
          return false;
        }

        return true;
      });

      if (wrongTypeError) toast.warning('Only wav and mp3 files are accepted.');
      if (sizeError) toast.warning('Uploader only accepts files up to 5MB.');

      acceptedFiles = acceptedFiles.map((file) => ({
        id: uuidv4(),
        binary: file,
        category: '',
        type: '',
        key: '',
        bpm: '',
        user: '',
        tags: ['tag1', 'tag2'],
        progress: 0,
        checked: true,
      }));

      setFiles((previousFiles) => [...previousFiles, ...acceptedFiles]);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <FaArrowDown />
        Dropzone
        <FaArrowDown />
      </h2>
      <div
        className={`${styles.dropzone} ${dragActive && styles.dragActive}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className={styles.content}>
          <div className={styles.symbol}>
            <GrCloudUpload size="75px" />
          </div>

          <div className={styles.text}>Drag and drop one or more audio files</div>
          <div className={styles.textSecondary}>Supports only mp3 and wav files</div>
        </div>
      </div>
    </div>
  );
}

export default DragDropUploader;
