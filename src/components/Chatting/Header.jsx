import React, { useContext, useEffect, useState } from 'react';
import Avatar from '../UI/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { BsThreeDotsVertical as Menu } from 'react-icons/bs';
import Dropdown from '../UI/Dropdown';
import context from '../../store/context';
import { BiInfoCircle } from 'react-icons/bi';
import { db } from '../../firebase';

export default function Header() {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const { user, activeChat, parseEmail, transformToArr } = useContext(context);
  const [chatInfo, setChatInfo] = useState({});
  const [lastMessageInfo, setLastMessageInfo] = useState({});

  useEffect(() => {
    if (activeChat) {
      db.ref(`users/${parseEmail(activeChat)}/info`).on('value', snapshot => {
        setChatInfo(snapshot.val());
      });

      db.ref(
        `users/${parseEmail(user.email)}/chats/${parseEmail(activeChat)}`,
      ).on('value', snapshot => {
        const snapshotArr = transformToArr(snapshot.val());

        setLastMessageInfo(snapshotArr[snapshotArr.length - 1]);
      });
    }
  }, [activeChat]);

  return (
    <div className="header">
      <Avatar src={chatInfo?.thumbnail} />
      <div className="header__content">
        <div className="header__info">
          <div>{chatInfo?.name}</div>
          <div className="u-vSmall-text u-shadded-text">
            {lastMessageInfo.date &&
              Intl.DateTimeFormat('en-us').format(
                new Date(lastMessageInfo.date),
              )}
          </div>
        </div>

        <div className="dropdown__group">
          <IconButton onClick={() => setIsDropdownShown(prev => !prev)}>
            <Menu fontSize="large" />
          </IconButton>

          {isDropdownShown && (
            <Dropdown
              listItems={[
                ['Delete Chat', () => {}],
                ['Reset Chat', () => {}],
              ]}
              alignRight={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
