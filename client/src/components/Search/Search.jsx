import { useState } from 'react';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import styles from './Search.module.css';
import Searchbar from '../Searchbar/Searchbar';
import Sort from '../Sort/Sort';
import Filters from '../Filters/Filters';
import Collapsible from '../Collapsible/Collapsible';

function Search({ query, setQuery, filters, setFilters, sort, setSort, setCurrentPage }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.stickyWrapper} ${!open && styles.closed}`}>
      <div className={styles.container}>
        <div className={styles.searchbar}>
          <Searchbar query={query} setQuery={setQuery} setCurrentPage={setCurrentPage} />
          <Sort sort={sort} setSort={setSort} />
          {open ? (
            <button type="button" className={styles.openBtn} onClick={() => setOpen((prev) => !prev)}>
              Hide filters
              <FaCircleMinus />
            </button>
          ) : (
            <button type="button" className={styles.openBtn} onClick={() => setOpen((prev) => !prev)}>
              Show filters
              <FaCirclePlus />
            </button>
          )}
        </div>

        <Collapsible open={open} setOpen={setOpen}>
          <Filters filters={filters} setFilters={setFilters} setCurrentPage={setCurrentPage} />
        </Collapsible>
      </div>
    </div>
  );
}

export default Search;
