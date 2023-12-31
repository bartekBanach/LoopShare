import { IoIosArrowDown } from 'react-icons/io';
import { useState, useRef, useEffect, useId } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import styles from './CustomSelect.module.css';

function CustomSelect({ options, value = '', placeholder, onChange }) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [optionsDisplay, setOptionsDisplay] = useState('bottom');

  const selected = value ? options.find((o) => o.value === value) : { value: placeholder, label: placeholder };

  const containerRef = useRef(null);
  const listboxRef = useRef(null);
  const id = useId();

  useOutsideClick(containerRef, () => setOpen(false));

  useEffect(() => {
    if (open) setHighlighted(0);
  }, [open]);

  const selectOption = (option) => {
    onChange(option.value);
    setOpen(false);
  };

  const handleOpen = () => {
    const container = containerRef.current.getBoundingClientRect();
    const child = containerRef.current.children[1].getBoundingClientRect();

    if (container.y + container.height + child.height >= window.innerHeight) {
      setOptionsDisplay('top');
    } else if (container.y + container.height + child.height < window.innerHeight) {
      setOptionsDisplay('bottom');
    }

    setOpen((prev) => !prev);
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
          handleOpen();
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
      <button
        type="button"
        aria-controls={`${id}-options`}
        aria-expanded={open}
        aria-haspopup="listbox"
        role="combobox"
        tabIndex={0}
        aria-label="select"
        className={styles.header}
        onClick={(e) => handleOpen(e)}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.value}>{selected.label}</div>
        <span className={styles.button}>
          <IoIosArrowDown style={open && { transform: 'rotate(180deg)' }} />
        </span>
      </button>

      <ul
        className={`${styles.options} ${open && styles.show} ${styles[optionsDisplay]}`}
        role="listbox"
        id={`${id}-options`}
        tabIndex={-1}
        aria-label="options"
        aria-activedescendant={highlighted}
        ref={listboxRef}
      >
        {options.map((option) => (
          /* eslint-disable jsx-a11y/click-events-have-key-events */

          <li
            className={`${styles.option} ${highlighted === option.id && styles.highlighted}`}
            key={option.id}
            role="option"
            aria-selected={option.id === highlighted}
            onMouseEnter={() => setHighlighted(option.id)}
            onClick={() => selectOption(option)}
          >
            {option.label}
          </li>

          /* eslint-enable jsx-a11y/click-events-have-key-events */
        ))}
      </ul>
    </div>
  );
}

export default CustomSelect;
