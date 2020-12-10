import { memo } from 'react';

import styles from './style.module.css';

const SwitchButton = ({ label, isActive, handleClick }) => (
  <div className={styles.SwitchButton}>
    <p>{label}</p>
    <div
      className={`${styles.slider} ${isActive ? styles.isActive : ''}`}
      onClick={handleClick}
    >
      <div className={styles.handler}></div>
    </div>
  </div>
);

export default memo(SwitchButton);
