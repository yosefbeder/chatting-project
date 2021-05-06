import IconButton from '@material-ui/core/IconButton';
import React, { useContext, useState } from 'react';
import { FaAngleDown as AngleDown } from 'react-icons/fa';
import Dropdown from '../UI/Dropdown';
import moment from 'moment';
import context from '../../store/context';

export default function Message({ content, you, date, divRef, id }) {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const time = moment(date.toISOString()).fromNow();
  const { deleteMessage, viewMessageInfo } = useContext(context);

  return (
    <div className={`message ${you && 'you'}`} ref={divRef}>
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
                ['Remove message', () => deleteMessage(id)],
                ['Message Info', () => viewMessageInfo(id)],
              ]}
              alignRight={you}
            />
          )}
        </div>
      </div>
    </div>
  );
}
