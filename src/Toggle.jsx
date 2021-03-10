import React from 'react';
import classnames from 'classnames';
import styles from './styles/Toggle.module.css';

const Toggle = ({ options = [], onChange, selected }) => (
    <div className={styles.container}>
        {options.map(({ label, value }, optionIndex) => (
            <button
                key={`option-${optionIndex}`}
                type="button"
                onClick={() => onChange(value)}
                className={classnames(styles.toggle, {
                    [styles.selected]: value === selected,
                })}
            >
                {label}
            </button>
        ))}
    </div>
);

export default Toggle;
