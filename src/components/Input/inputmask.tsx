import React, { InputHTMLAttributes, useCallback } from 'react';

const InputMask: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {

  const handleKeyUp = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.maxLength = 12;
    let value = event.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{0})(\d{2})/, "$1$2 ");
    event.currentTarget.value = value;
  }, [])

  return (
    <div>
      <input {...props} onKeyUp={handleKeyUp}/>
    </div>
  );

}

export default InputMask;
