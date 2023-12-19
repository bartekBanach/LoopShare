import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

function Searchbar({ query, setQuery, setCurrentPage }) {
  const [input, setInput] = useState(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(input);
    setCurrentPage(1);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setInput('');
    setQuery('');
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
          placeholder="Search..."
        />
        <button
          type="button"
          aria-label="clear"
          className={`${styles.clearBtn} ${!input && styles.hidden}`}
          onClick={(e) => handleClear(e)}
        >
          <AiOutlineClose />
        </button>
      </div>

      <button type="button" onClick={(e) => handleSubmit(e)} className={styles.searchBtn}>
        Search
      </button>
    </div>
  );
}

Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
export default Searchbar;
