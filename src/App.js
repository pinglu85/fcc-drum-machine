import Interface from './Interface';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App} id="drum-machine">
      <header className={styles.AppHeader}>drum machine</header>
      <Interface />
    </div>
  );
}

export default App;
