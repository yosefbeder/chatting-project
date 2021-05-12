import React, { useContext, useRef, useEffect } from 'react';
import context from '../../store/context';
import Message from './Message';
import { Howl } from 'howler';

import sound_1Src from '../../assets/ES_Mouth Pop 1 - SFX Producer.mp3';
import sound_2Src from '../../assets/ES_Mouth Pop 2 - SFX Producer.mp3';

const pop_1SoundEffect = new Howl({
  src: sound_1Src,
  volume: 0.5,
});
const pop_2SoundEffect = new Howl({
  src: sound_2Src,
  volume: 0.5,
});

export default function MessagesList() {
  const { userMessages, activeChat, parseEmail } = useContext(context);
  const messages = userMessages[parseEmail(activeChat)].messages;
  let lastMessagesNumber = useRef(0);
  const messagesListRef = useRef(null);
  const messagesList = messages.map(({ id, content, date, provider }) => (
    <Message
      key={id}
      id={id}
      content={content}
      date={new Date(date)}
      you={provider !== activeChat}
    />
  ));
  const scrollToBottom = () => {
    if (messagesListRef.current) {
      const element = messagesListRef.current;
      element.scrollTop = element.scrollHeight;
    }
  };

  useEffect(() => {
    if (messagesList.length - 1 === lastMessagesNumber.current) {
      scrollToBottom();
      if (messages[messages.length - 1].provider === activeChat) {
        pop_1SoundEffect.play();
      } else {
        pop_2SoundEffect.play();
      }
    }
    lastMessagesNumber.current = messagesList.length;
  }, [messagesList]);

  useEffect(() => {
    scrollToBottom();
  }, [activeChat]);

  /*
   * When to scroll
    - adding a new task (the user himself)
    - changing the active player
  */

  return (
    <div className="messagesList" ref={messagesListRef}>
      {messagesList}
    </div>
  );
}
