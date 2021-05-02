import IconButton from '@material-ui/core/IconButton';
import React, { useState } from 'react';
import { FaAngleDown as AngleDown } from 'react-icons/fa';
import Dropdown from '../UI/Dropdown';

export default function Message({ content, you, time }) {
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  return (
    <div className={`message ${you && 'you'}`}>
      <div className="message__content">
        <div className="message__date u-vSmall-text">{time}</div>
        {content}
        <div className="dropdown__group">
          <IconButton
            onClick={() => setIsDropdownShown(prev => !prev)}
            style={{ padding: '.3rem' }}
          >
            <AngleDown fontSize="small" />
          </IconButton>
          {isDropdownShown && (
            <Dropdown
              listItems={[
                ['Remove message', () => {}],
                ['Message Info', () => {}],
              ]}
              alignRight={you}
            />
          )}
        </div>
      </div>
    </div>
  );
}
