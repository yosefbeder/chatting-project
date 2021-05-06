import React from 'react';

export default function Avatar({ src, size }) {
  return (
    <img
      draggable={false}
      className={`avatar ${size === 'big' && 'big'}`}
      alt=""
      src={src}
    />
  );
}
