import React from 'react';
import Avatar from '../UI/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  chat: {
    display: 'flex',
    padding: '8px',
    alignItems: 'center',
    gap: '.5rem',
  },
  active: {
    backgroundColor: 'var(--color-lightGrey)',
  },
});

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
  const mLastActive =
    lastActive !== 'none'
      ? Intl.DateTimeFormat('en-us').format(new Date(lastActive))
      : 'none';

  const classes = useStyles();

  return (
    <CardActionArea
      className={`${classes.chat} ${active && classes.active}`}
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
    </CardActionArea>
  );
}
