import { useRef } from 'react';

const useRefs = () => {
  const refs = useRef([]);

  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
  return [refs, addToRefs];
};

export default useRefs;
