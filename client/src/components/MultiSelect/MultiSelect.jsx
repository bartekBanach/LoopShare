import { AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { useState, useRef, useEffect, useId } from 'react';
import styles from './MultiSelect.module.css';
import useOutsideClick from '../../hooks/useOutsideClick';

function MultiSelect({ options, value, placeholder, onChange }) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(null);

  const containerRef = useRef(null);
  const listboxRef = useRef(null);
  const id = useId();

  useOutsideClick(containerRef, () => setOpen(false));

  useEffect(() => {
    if (open) setHighlighted(0);
  }, [open]);

  const selectOption = (option) => {
    if (!value.includes(option)) {
      onChange([...value, option]);
    } else {
      onChange(value.filter((o) => o !== option));
    }
  };
  const handleKeyDown = (e) => {
    if (!open) {
      switch (e.key) {
        case 'Up':
        case 'ArrowUp':
        case 'Down':
        case 'ArrowDown':
        case ' ':
        case 'Enter':
          e.preventDefault();
          setOpen(true);
          break;
        default:
          break;
      }
    }

    if (open) {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          break;
        case 'Tab':
          setOpen(false);
          break;
        case 'ArrowUp': {
          e.preventDefault();
          const next = highlighted - 1 < 0 ? options.length - 1 : highlighted - 1;
          setHighlighted(next);
          const child = listboxRef.current.children[next];
          child.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          const prev = highlighted === options.length - 1 ? 0 : highlighted + 1;
          setHighlighted(prev);
          const child = listboxRef.current.children[prev];
          child.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          break;
        }
        case ' ':
        case 'SpaceBar':
        case 'Enter':
          e.preventDefault();
          selectOption(options[highlighted]);
          break;
        default:
          break;
      }
    }
  };
  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.value}
        aria-controls={`${id}-options`}
        aria-expanded={open}
        aria-haspopup="listbox"
        role="combobox"
        tabIndex={0}
        aria-label="select"
        onKeyDown={handleKeyDown}
        onClick={() => setOpen((prev) => !prev)}
      >
        {placeholder}
        {value.length > 0 && ` (${value.length})`}
      </div>

      <button
        aria-label="clear"
        className={styles.button}
        type="button"
        onClick={() => {
          onChange([]);
          setOpen(false);
        }}
      >
        <AiOutlineClose />
      </button>
      <button
        aria-label="open"
        className={styles.button}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <IoIosArrowDown style={open && { transform: 'rotate(180deg)' }} />
      </button>

      <ul
        className={`${styles.options} ${open && styles.show}`}
        role="listbox"
        id={`${id}-options`}
        tabIndex={-1}
        aria-label="options"
        aria-activedescendant={highlighted}
        aria-multiselectable="true"
        ref={listboxRef}
      >
        {options.map((option) => (
          <li
            role="option"
            aria-selected={option.id === highlighted}
            key={option.id}
            onClick={() => selectOption(option)}
            onKeyDown={() => selectOption(option)}
            onMouseEnter={() => setHighlighted(option.id)}
            className={`${styles.option} ${highlighted === option.id && styles.highlighted}`}
            value={option.value}
          >
            <input
              className={styles.checkbox}
              checked={value.includes(option)}
              type="checkbox"
              onChange={() => selectOption(option)}
              style={{ cursor: 'pointer' }}
            />
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MultiSelect;
