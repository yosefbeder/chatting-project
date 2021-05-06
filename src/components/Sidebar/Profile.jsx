import React, { useContext, useState } from 'react';
import Avatar from '../UI/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Dropdown from '../UI/Dropdown';
import context from '../../store/context';

import {
  BsFillChatSquareDotsFill as Chat,
  BsThreeDotsVertical as Menu,
} from 'react-icons/bs';

export default function Profile() {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const {
    user: { email, name, thumbnail },
    signOut,
    addChat,
  } = useContext(context);

  const showProfile = () => {
    alert(`Email Address: ${email} \nFull Name: ${name} `);
  };

  return (
    <div className="profile">
      <div className="profile__info">
        <Avatar src={thumbnail} />

        <h2 className="header-secondary">{name.split(' ')[0]}</h2>
      </div>

      <div className="profile__btns">
        <IconButton
          onClick={() => {
            const email = prompt('The Email Adress...');
            addChat(email);
          }}
        >
          <Chat fontSize="large" />
        </IconButton>
        <div className="dropdown__group">
          <IconButton onClick={() => setIsDropdownShown(prev => !prev)}>
            <Menu fontSize="large" />
          </IconButton>
          {isDropdownShown && (
            <Dropdown
              listItems={[
                ['Profile', showProfile],
                ['Sign Out', signOut],
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
