import SwitchButton from './SwitchButton';
import Display from './Display';
import VolumeSlider from './VolumeSlider';
import styles from './style.module.css';

const ControlPanel = (props) => (
  <div className={styles.ControlPanel}>
    <SwitchButton
      label="Power"
      isActive={props.isPowerOn}
      handleClick={props.onPowerButtonClick}
    />
    <Display content={props.isPowerOn ? props.displayContent : ''} />
    <VolumeSlider
      isPowerOn={props.isPowerOn}
      volume={props.volume}
      setVolume={props.setVolume}
      setDisplayContent={props.setDisplayContent}
    />
    <SwitchButton
      label="Pad Bank"
      isActive={props.isPianoKit}
      handleClick={props.onSelectPadBank}
    />
  </div>
);

export default ControlPanel;
