import PropTypes from 'prop-types';
import styles from './Sort.module.css';

function Sort({ sort, setSort }) {
  return (
    <div className={styles.container}>
      <label htmlFor="sort" className={styles.field}>
        Sort by:
        <select
          className={styles.sort}
          id="sort"
          value={sort.sortBy}
          onChange={(e) => setSort({ sortBy: e.target.value, order: sort.order })}
        >
          <option className={styles.sortOption} value="createdAt">
            Upload Date
          </option>
          <option className={styles.sortOption} value="name">
            Name
          </option>
        </select>
      </label>
      <label htmlFor="order" className={styles.field}>
        Order:
        <select
          className={styles.sort}
          id="order"
          value={sort.order}
          onChange={(e) => setSort({ sortBy: sort.sortBy, order: e.target.value })}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
}

Sort.propTypes = {
  sort: PropTypes.shape({
    sortBy: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  }).isRequired,
  setSort: PropTypes.func.isRequired,
};

export default Sort;
