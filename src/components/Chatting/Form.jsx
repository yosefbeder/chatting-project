import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
// import { GrEmoji as Emoji } from 'react-icons/gr';
import { BiSmile as Emoji } from 'react-icons/bi';
import { IoMdSend as Send } from 'react-icons/io';
import Picker from 'emoji-picker-react';

export default function Form() {
  const [isPickerShown, setIsPickerShown] = useState(false);

  return (
    <form className="message-form">
      {isPickerShown && <Picker />}
      <IconButton onClick={() => setIsPickerShown(prev => !prev)}>
        <Emoji />
      </IconButton>
      <input
        type="text"
        className="message-form__input"
        placeholder="Type a message"
      />
      <IconButton>
        <Send />
      </IconButton>
    </form>
  );
}
