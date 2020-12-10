import { useRef, useEffect } from 'react';

import styles from './style.module.css';

const SLIDER_WIDTH = 240;
const HANDLER_RADIUS = 14;
const HANDLER_RADIUS_SLIDER_RATIO = Math.floor(
  (HANDLER_RADIUS / SLIDER_WIDTH) * 100
);

const VolumeSlider = ({ isPowerOn, volume, setVolume, setDisplayContent }) => {
  const handlerRef = useRef(null);

  const handleSliderClick = (e) => {
    const handlerNode = handlerRef.current;
    if (handlerNode && e.target === handlerNode) {
      return;
    }

    const relativeMouseX = getRelativeMousePosX(e.pageX, e.target);
    const newVolume = computeNewVolume(relativeMouseX);
    if (isPowerOn) {
      setVolume(newVolume);
      setDisplayContent(`Volume: ${newVolume}`);
    }
  };

  useEffect(() => {
    const handlerNode = handlerRef.current;
    if (!handlerNode) {
      return;
    }

    let isMouseDown = false;

    const handleMouseDown = (e) => {
      if (e.target === handlerNode) {
        isMouseDown = true;
      }
    };

    const handleMouseMove = (e) => {
      if (!isMouseDown) {
        return;
      }
      const relativeMouseX = getRelativeMousePosX(
        e.pageX,
        handlerNode.parentNode
      );

      const newVolume = computeNewVolume(relativeMouseX);
      if (isPowerOn) {
        setVolume(newVolume);
        setDisplayContent(`Volume: ${newVolume}`);
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [setVolume, setDisplayContent, isPowerOn]);

  const handlerPosX = computeHandlerPosX(volume);

  return (
    <div className={styles.VolumeSlider} onClick={handleSliderClick}>
      {isPowerOn && (
        <div
          className={`${styles.slider} ${styles.currentVolume}`}
          style={{ width: `${handlerPosX}%` }}
        ></div>
      )}
      <div className={styles.slider}></div>
      <div
        ref={handlerRef}
        className={styles.handler}
        style={{ left: `${handlerPosX}%` }}
      ></div>
    </div>
  );
};

const computeNewVolume = (x) => {
  const newVolume = Math.floor((x / SLIDER_WIDTH) * 100);
  if (newVolume > 100) {
    return 100;
  } else if (newVolume < 0) {
    return 0;
  } else {
    return newVolume;
  }
};

const getRelativeMousePosX = (pageX, slider) => {
  const sliderRect = slider.getBoundingClientRect();
  return pageX - sliderRect.left;
};

const computeHandlerPosX = (volume) => {
  let handlerPosX = 0;
  if (volume <= HANDLER_RADIUS_SLIDER_RATIO) {
    handlerPosX = 0;
  } else if (volume + HANDLER_RADIUS_SLIDER_RATIO * 2 >= 100) {
    handlerPosX = 100 - HANDLER_RADIUS_SLIDER_RATIO * 2;
  } else {
    handlerPosX = volume - HANDLER_RADIUS_SLIDER_RATIO;
  }

  return handlerPosX;
};

export default VolumeSlider;
