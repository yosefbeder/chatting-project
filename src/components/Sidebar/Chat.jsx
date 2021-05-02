import React from 'react';
import Avatar from '../UI/Avatar';

export default function Chat({
  email,
  name,
  thumbnail,
  lastMessage,
  lastActive,
  active,
  onSelect,
}) {
  const firstName = name.split(' ')[0];
  const mLastMessage =
    lastMessage.length < 25 ? lastMessage : `${lastMessage.slice(0, 22)}...`;
  const mLastActive = Intl.DateTimeFormat('en-us').format(new Date(lastActive));

  return (
    <div
      className={`chat ${active && 'active'}`}
      onClick={() => onSelect(email)}
    >
      <Avatar src={thumbnail} size="big" />

      <div className="chat__content">
        <div className="chat__info">
          <div className="chat__name">{firstName}</div>
          <div className="u-shadded-text u-small-text">{mLastMessage}</div>
        </div>
        <div className="chat__info">
          <div className="u-shadded-text u-vSmall-text">{mLastActive}</div>
        </div>
      </div>
    </div>
  );
}
