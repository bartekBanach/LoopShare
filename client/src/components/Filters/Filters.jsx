import { useState } from 'react';
import styles from './Filters.module.css';
import MultiSelect from '../MultiSelect/MultiSelect';
import CustomSelect from '../CustomSelect/CustomSelect';
import categories from '../../data/selectCategories';
import keys from '../../data/encodedKeys';

const types = [
  { id: 0, label: 'All', value: '' },
  { id: 1, label: 'One Shot', value: 'one-shot' },
  { id: 2, label: 'Loop', value: 'loop' },
];

function Filters({ filters, setFilters, setCurrentPage }) {
  const [bpm, setBpm] = useState(filters.bpm);

  const handleFiltersChange = (value, name) => {
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1);
  };

  const handleBpmChange = () => {
    setFilters({ ...filters, bpm });
  };

  const clearBpm = () => {
    handleFiltersChange({ min: null, max: null }, 'bpm');
    setBpm({ min: null, max: null });
  };

  return (
    <div className={styles.container}>
      <MultiSelect
        options={categories}
        value={filters.categories}
        placeholder="Categories"
        onChange={(value) => {
          handleFiltersChange(value, 'categories');
        }}
      />

      <CustomSelect
        options={types}
        value={filters.type}
        placeholder="Type"
        onChange={(value) => handleFiltersChange(value, 'type')}
      />

      <MultiSelect
        options={keys}
        value={filters.keys}
        placeholder="Key"
        onChange={(value) => {
          handleFiltersChange(value, 'keys');
        }}
      />

      <fieldset className={styles.bpmField}>
        <legend>BPM</legend>
        <input
          className={styles.bpmInput}
          onChange={(e) => setBpm({ ...bpm, min: e.target.value })}
          type="Number"
          placeholder="min"
          value={bpm.min ? bpm.min : ''}
        />

        <input
          className={styles.bpmInput}
          onChange={(e) => setBpm({ ...bpm, max: e.target.value })}
          type="Number"
          placeholder="max"
          value={bpm.max ? bpm.max : ''}
        />
        <button className={`${styles.bpmBtn} ${styles.set}`} onClick={handleBpmChange} type="button">
          Set
        </button>
        <button className={`${styles.bpmBtn} ${styles.clear}`} onClick={() => clearBpm()} type="button">
          Clear
        </button>
      </fieldset>
    </div>
  );
}

export default Filters;
