import { useState } from 'react';
import DragDropUploader from '../../components/DragDropUploader/DragDropUploader';
import useUploadFiles from '../../hooks/useUploadFiles';
import FileList from '../../components/FileList/FileList';
import styles from './Upload.module.css';
import useToastContext from '../../hooks/useToastContext';

function Upload() {
  const [files, setFiles] = useState([]);
  const { upload, loading } = useUploadFiles(setFiles);
  const toast = useToastContext();

  const validate = () => {
    let valid = true;

    files.forEach((file) => {
      if (file.category === '' || file.type === '') {
        valid = false;
      }
    });

    if (!valid) toast.error('Type and category must be specified for all samples before submit.');

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length < 1) return;

    if (!validate()) {
      return;
    }

    await upload(files);
  };

  return (
    <div className={styles.container}>
      <DragDropUploader files={files} setFiles={setFiles} />
      <FileList files={files} setFiles={setFiles} loading={loading} handleSubmit={handleSubmit} />
    </div>
  );
}

export default Upload;
