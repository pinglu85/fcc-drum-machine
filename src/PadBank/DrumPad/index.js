import { memo } from 'react';

import styles from './style.module.css';

const DrumPad = (props) => {
  let classes = '';

  if (props.isActive && props.isPowerOn) {
    classes = `${styles.isActive} ${styles.isPowerOn}`;
  } else if (props.isActive) {
    classes = styles.isActive;
  }

  return (
    <div
      className={`drum-pad ${styles.DrumPad} ${classes}`}
      id={props.audio.name}
      onMouseDown={() => props.handlePadClick(props.id)}
      onMouseUp={props.handlePadRelease}
    >
      <audio
        ref={props.addToAudioRefs}
        id={props.id}
        className="clip"
        data-name={props.audio.name}
        src={props.audio.src}
      ></audio>
      {props.id}
    </div>
  );
};

export default memo(DrumPad);
