import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import SampleList from '../../components/SampleList/SampleList';
import Pagination from '../../components/Pagination/Pagination';

import styles from './User.module.css';

function User() {
  const { userId } = useParams();

  const [samples, setSamples] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const getUser = async () => {
      const url = `/api/user/${userId}`;

      try {
        const res = await axios.get(url);
        setUser(res.data.user);
      } catch (err) {
        setError(true);
        setUser(null);
      }
    };

    const getSamples = async () => {
      try {
        setLoading(true);

        const url =
          `/api/samples?page=${currentPage}&limit=${limit}&q=${''}` +
          `&sort=${'createdAt'}` +
          `&order=${'desc'}` +
          `&user=${userId}`;

        const res = await axios.get(url);
        setSamples(res.data.items);

        setPageCount(res.data.pagination.pageCount);
        setItemCount(res.data.pagination.count);
      } catch (err) {
        setSamples(null);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getUser();
    getSamples();
  }, [currentPage, limit, userId]);

  if (error) return <p>Network error.</p>;

  if (user && samples)
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerItem}>
            <button type="button" className={styles.backBtn}>
              <Link to="/browse">Back to All samples</Link>
            </button>
          </div>
          <div className={styles.headerItem}>
            <h2 className={styles.username}>{user.username}&apos;s samples</h2>
          </div>
          <div className={styles.headerItem} />
        </div>
        <div className={styles.list}>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            itemCount={itemCount}
            setCurrentPage={setCurrentPage}
            limit={limit}
            setLimit={setLimit}
          />

          <SampleList samples={samples} loading={loading} />

          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            itemCount={itemCount}
            setCurrentPage={setCurrentPage}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      </div>
    );
}

export default User;
