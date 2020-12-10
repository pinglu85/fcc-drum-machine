import { useState, useEffect, useCallback } from 'react';

import useRefs from '../utils/useRefs';
import { HEATER_KIT, PIANO_KIT, EMPTY } from './audios';
import PadBank from '../PadBank';
import ControlPanel from '../ControlPanel';
import styles from './style.module.css';

const PAD_KEYS = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

const Interface = () => {
  const [displayContent, setDisplayContent] = useState('');
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [buttonId, setButtonId] = useState('');
  const [isPianoKit, setIsPianoKit] = useState(false);
  const [volume, setVolume] = useState(25);
  const [audioRefs, addToAudioRefs] = useRefs();

  const playAudio = useCallback(
    (id) => {
      if (!isPowerOn || !audioRefs.current.length) {
        return;
      }

      const audio = audioRefs.current.find((nodeEl) => nodeEl.id === id);
      setDisplayContent(audio.dataset.name);
      audio.volume = volume / 100;
      audio.play();
    },
    [audioRefs, isPowerOn, volume]
  );

  const handlePadClick = (id) => {
    playAudio(id);
    setButtonId(id);
  };

  const handlePadRelease = () => {
    setButtonId('');
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const upperCasedEventKey = e.key.toUpperCase();
      if (PAD_KEYS.includes(upperCasedEventKey)) {
        playAudio(upperCasedEventKey);
        setButtonId(upperCasedEventKey);
      }
    };

    const handleKeyUp = (e) => {
      const upperCasedEventKey = e.key.toUpperCase();
      if (PAD_KEYS.includes(upperCasedEventKey)) {
        setButtonId('');
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [audioRefs, playAudio]);

  const handlePowerButtonClick = () => {
    setIsPowerOn((state) => !state);
  };

  const handlePadBankSelect = () => {
    if (!isPowerOn) {
      return;
    }
    if (!isPianoKit) {
      setDisplayContent('Smooth Piano Kit');
    } else {
      setDisplayContent('Heater Kit');
    }
    setIsPianoKit((state) => !state);
  };

  return (
    <div className={styles.DrumMachineInterface}>
      <PadBank
        padKeys={PAD_KEYS}
        audios={!isPowerOn ? EMPTY : isPianoKit ? PIANO_KIT : HEATER_KIT}
        addToAudioRefs={addToAudioRefs}
        buttonId={buttonId}
        onPadClick={handlePadClick}
        onPadRelease={handlePadRelease}
        isPowerOn={isPowerOn}
      />
      <ControlPanel
        isPowerOn={isPowerOn}
        onPowerButtonClick={handlePowerButtonClick}
        isPianoKit={isPianoKit}
        onSelectPadBank={handlePadBankSelect}
        displayContent={displayContent}
        volume={volume}
        setVolume={setVolume}
        setDisplayContent={setDisplayContent}
      />
    </div>
  );
};

export default Interface;
