import React, { useContext, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
// import { GrEmoji as Emoji } from 'react-icons/gr';
import { BiSmile as Emoji } from 'react-icons/bi';
import { IoMdSend as Send } from 'react-icons/io';
import Picker from 'emoji-picker-react';
import context from '../../store/context';

export default function Form({ scrollToBottom }) {
  const [isPickerShown, setIsPickerShown] = useState(false);
  const [content, setContent] = useState('');
  const { addMessage } = useContext(context);

  return (
    <form
      className={`message-form ${isPickerShown && 'picker-shown'}`}
      onSubmit={e => {
        e.preventDefault();
        addMessage(content);
        setContent('');
        setTimeout(scrollToBottom, 100);
      }}
    >
      <Picker
        onEmojiClick={(e, emojiObject) => {
          setContent(prev => {
            const prevArr = prev.split('');
            prevArr.push(emojiObject.emoji);
            return prevArr.join('');
          });
        }}
      />
      <IconButton onClick={() => setIsPickerShown(prev => !prev)}>
        <Emoji />
      </IconButton>
      <input
        type="text"
        className="message-form__input"
        placeholder="Type a message"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <IconButton type="submit">
        <Send />
      </IconButton>
    </form>
  );
}
