import styles from './style.module.css';

const VolumeSlider = ({ isPowerOn, volume, setVolume, setDisplayContent }) => {
  const handleChange = (evt) => {
    const newVolume = evt.target.value;

    setVolume(newVolume);
    setDisplayContent(`Volume: ${newVolume}`);
  };

  return (
    <div className={styles.VolumeSlider}>
      <input
        className={styles.slider}
        type="range"
        value={volume}
        min="0"
        max="100"
        style={{
          background: `linear-gradient(
            to right,
            #9730ec 0%,
            #9730ec ${volume}%,
            rgb(177, 177, 177) ${volume}%,
            rgb(177, 177, 177) 100%
          )`,
        }}
        disabled={!isPowerOn}
        onChange={handleChange}
      />
    </div>
  );
};

export default VolumeSlider;
