import styles from './style.module.css';

const Display = ({ content }) => (
  <div id="display" className={styles.Display}>
    {content}
  </div>
);

export default Display;
