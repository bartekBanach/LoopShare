import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosBrowsers } from 'react-icons/io';

import SampleList from '../../components/SampleList/SampleList';
import Search from '../../components/Search/Search';
import Pagination from '../../components/Pagination/Pagination';
import styles from './Browse.module.css';

function Browse() {
  const [samples, setSamples] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    type: null,
    keys: [],
    bpm: { min: null, max: null },
  });

  const [sort, setSort] = useState({ sortBy: 'createdAt', order: 'desc' });

  useEffect(() => {
    const getSamples = async () => {
      try {
        const url =
          `/api/samples?page=${currentPage}&limit=${limit}&q=${query}` +
          `&cat=${filters.categories.map((item) => item.value).toString()}` +
          `&type=${filters.type === null ? '' : filters.type}` +
          `&key=${filters.keys.map((item) => item.value).toString()}` +
          `&minbpm=${filters.bpm.min ? filters.bpm.min : ''}` +
          `&maxbpm=${filters.bpm.max ? filters.bpm.max : ''}` +
          `&sort=${sort.sortBy}` +
          `&order=${sort.order}`;

        const res = await axios.get(url);

        setSamples(res.data.items);
        setError(false);
        setPageCount(res.data.pagination.pageCount);
        setItemCount(res.data.pagination.count);
      } catch (err) {
        setSamples(null);
        setError(false);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    getSamples();
  }, [currentPage, query, filters, sort, limit]);

  return (
    <div className={styles.container}>
      <Search
        query={query}
        setQuery={setQuery}
        filters={filters}
        setFilters={setFilters}
        setCurrentPage={setCurrentPage}
        sort={sort}
        setSort={setSort}
      />

      <div className={styles.content}>
        <div className={styles.list}>
          <div className={styles.header}>
            <IoIosBrowsers className={styles.headerIcon} />
            <h2>Browse sounds</h2>
          </div>

          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            itemCount={itemCount}
            setCurrentPage={setCurrentPage}
            limit={limit}
            setLimit={setLimit}
            loading={loading}
            error={error}
          />

          <SampleList samples={samples} loading={loading} error={error} />

          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            itemCount={itemCount}
            setCurrentPage={setCurrentPage}
            limit={limit}
            setLimit={setLimit}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default Browse;
