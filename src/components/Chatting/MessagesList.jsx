import React, { useContext, useRef, useEffect } from 'react';
import context from '../../store/context';
import Message from './Message';

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
