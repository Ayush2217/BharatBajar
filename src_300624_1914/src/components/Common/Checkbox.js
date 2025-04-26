// src/components/Common/Checkbox.js
import React from 'react';

const Checkbox = ({ checked, onChange, label, id }) => {
  return (
    <label htmlFor={id}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default Checkbox;
