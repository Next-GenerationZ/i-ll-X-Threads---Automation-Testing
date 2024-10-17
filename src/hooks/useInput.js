import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange({ target }) {
    setValue(target.value);
  }

  // return [value, handleValueChange, setValue];
  return [value, setValue];
}

export default useInput;
