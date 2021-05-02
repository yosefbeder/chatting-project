import Button from '@material-ui/core/Button';
import React from 'react';

export default function Dropdown({ listItems, alignRight }) {
  return (
    <div className={`dropdown ${alignRight && 'align-right'}`}>
      {listItems.map((item, i) => (
        <div key={i} className="dropdown__listItem">
          <Button size="large" onClick={item[1]}>
            <span>{item[0]}</span>
          </Button>
        </div>
      ))}
    </div>
  );
}
