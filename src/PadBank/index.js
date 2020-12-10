import DrumPad from './DrumPad';
import styles from './style.module.css';

const PadBank = (props) => (
  <div className={styles.PadBank}>
    {props.padKeys.map((padKey, i) => (
      <DrumPad
        key={padKey}
        id={padKey}
        audio={props.audios[i]}
        addToAudioRefs={props.addToAudioRefs}
        addToPadRefs={props.addToPadRefs}
        handlePadClick={props.onPadClick}
        handlePadRelease={props.onPadRelease}
        isActive={props.buttonId === padKey}
        isPowerOn={props.isPowerOn}
      />
    ))}
  </div>
);

export default PadBank;
