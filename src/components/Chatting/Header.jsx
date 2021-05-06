import React, { useContext, useState } from 'react';
import Avatar from '../UI/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { BsThreeDotsVertical as Menu } from 'react-icons/bs';
import Dropdown from '../UI/Dropdown';
import context from '../../store/context';
import { v4 as uuid } from 'uuid';

export default function Header() {
  const { chats, activeChat, deleteChat, resetChat } = useContext(context);
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  const activeChatObj = chats.find(chat => chat.email === activeChat);

  return (
    <div className="header">
      <Avatar src={activeChatObj.thumbnail} />
      <div className="header__content">
        <div className="header__name">{activeChatObj.name}</div>
        <div className="dropdown__group">
          <IconButton onClick={() => setIsDropdownShown(prev => !prev)}>
            <Menu fontSize="large" />
          </IconButton>
          {isDropdownShown && (
            <Dropdown
              listItems={[
                [
                  'Delete Chat',
                  () => {
                    const id = uuid();
                    const confirmation = prompt(
                      `Are you sure that you want to delete this chat?\nPlease re-write ${id} to delete the chat`,
                    );
                    if (id === confirmation) {
                      deleteChat(activeChat);
                    }
                    if (id !== confirmation) {
                      alert(
                        "The chat won't be deleted as you didn't re-write the code correctly",
                      );
                    }
                  },
                ],
                [
                  'Reset Chat',
                  () => {
                    const id = uuid();
                    const confirmation = prompt(
                      `Are you sure that you want to Reset this chat?\nPlease re-write ${id} to delete the chat`,
                    );
                    if (id === confirmation) {
                      resetChat(activeChat);
                    }
                    if (id !== confirmation) {
                      alert(
                        "The chat won't be reseted as you didn't re-write the code correctly",
                      );
                    }
                  },
                ],
              ]}
              alignRight={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
