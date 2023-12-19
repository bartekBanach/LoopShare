import { useState } from 'react';
import axios from 'axios';
import useAuthContext from './useAuthContext';
import useToastContext from './useToastContext';

const useUploadFiles = (setFiles) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user } = useAuthContext();
  const toast = useToastContext();

  const upload = async (files) => {
    if (!user) {
      // setError(true);
      toast.error('You must be logged in to upload files.');
      return;
    }

    setLoading(true);

    Promise.all(
      files.map((file) => {
        const formData = new FormData();

        formData.append('file', file.binary);
        formData.append('upload_preset', 'sampleshare');
        formData.append(
          'context',
          `category=${file.category.value || ''}|type=${file.type || ''}|key=${file.key.value || ''}|bpm=${file.bpm}`
        );

        return axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/video/upload`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((100 * progressEvent.loaded) / progressEvent.total);

              setFiles((prev) => {
                const newFiles = [...prev];
                const index = newFiles.findIndex((f) => f.id === file.id);
                newFiles[index].progress = progress;
                return newFiles;
              });
            },
          }
        );
      })
    )
      .then((res) =>
        Promise.all(
          res.map((r) => {
            /* eslint-disable camelcase */
            const url = r.data.secure_url;
            const name = r.data.original_filename;
            const { public_id } = r.data;

            const { category } = r.data.context.custom;
            const { type } = r.data.context.custom;
            const { key } = r.data.context.custom;
            const bpm = Number(r.data.context.custom.bpm);

            const size = r.data.bytes;

            const sample = { url, name, public_id, category, type, size };
            /* eslint-enable camelcase */

            if (key) sample.key = key;
            if (bpm) sample.bpm = bpm;

            return axios.post('/api/samples', sample, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            });
          })
        )
      )
      .then(() => {
        setFiles([]);
        setSuccess(true);
        toast.success('Files uploaded succefully.');
        return success;
      })
      .catch(() => {
        setError(true);
        toast.error('Error uploading files.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { upload, loading, error, success };
};

export default useUploadFiles;
