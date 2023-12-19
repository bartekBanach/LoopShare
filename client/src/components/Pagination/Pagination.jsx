import { IoPlay, IoPlayForward } from 'react-icons/io5';
import styles from './Pagination.module.css';

const options = [5, 10, 15];

const range = (start, end) => [...Array(end - start).keys()].map((el) => el + start);

const getPagesCut = (cut, currentPage, pageCount) => {
  const ceiling = Math.ceil(cut / 2);
  const floor = Math.floor(cut / 2);

  if (pageCount < cut) {
    return { start: 1, end: pageCount + 1 };
  }
  if (currentPage >= 1 && currentPage <= ceiling) {
    return { start: 1, end: cut + 1 };
  }
  if (currentPage + floor >= pageCount) {
    return { start: pageCount - cut + 1, end: pageCount + 1 };
  }
  return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
};

function Pagination({ currentPage, pageCount, itemCount, setCurrentPage, limit, setLimit }) {
  const pages = getPagesCut(5, currentPage, pageCount);

  const handlePageChange = (page) => {
    if (page > pageCount || page < 1) return;
    setCurrentPage(page);
  };

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);

    setLimit(newLimit);
    setCurrentPage(1);
  };

  let resultsStart = (currentPage - 1) * limit + 1;
  if (resultsStart === 0) resultsStart = 1;

  let resultsEnd = resultsStart + limit - 1;
  if (resultsEnd < limit) {
    resultsEnd = limit;
  } else if (resultsEnd > itemCount) {
    resultsEnd = itemCount;
  }

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.paginationItem}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
          aria-label="first page"
        >
          <IoPlayForward style={{ transform: 'rotate(180deg)' }} className={styles.paginationIcon} />
        </button>

        <button
          type="button"
          className={styles.paginationItem}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="previous page"
        >
          <IoPlay style={{ transform: 'rotate(180deg)' }} className={styles.paginationIcon} />
        </button>

        {range(pages.start, pages.end).map((index) => (
          <button
            type="button"
            className={`${styles.paginationItem} ${index === currentPage && styles.current}`}
            key={index}
            onClick={() => setCurrentPage(index)}
          >
            {index}
          </button>
        ))}

        <button
          type="button"
          className={styles.paginationItem}
          disabled={currentPage === pageCount}
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="next page"
        >
          <IoPlay className={styles.paginationIcon} />
        </button>

        <button
          type="button"
          className={styles.paginationItem}
          disabled={currentPage === pageCount}
          onClick={() => handlePageChange(pageCount)}
          aria-label="last page"
        >
          <IoPlayForward className={styles.paginationIcon} />
        </button>
      </div>

      <div className={styles.results}>
        <p>
          Showing results {resultsStart}-{resultsEnd} out of {itemCount}. Items per page:
        </p>
        <div className={styles.limit}>
          <select onChange={handleLimitChange} value={limit}>
            {options.map((amount) => (
              <option key={amount} value={amount}>
                {amount}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
