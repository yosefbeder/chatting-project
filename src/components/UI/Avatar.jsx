import React from 'react';

export default function Avatar({ src, alt, size }) {
  return (
    <img
      draggable={false}
      className={`avatar ${size === 'big' && 'big'}`}
      src={src}
    />
  );
}
