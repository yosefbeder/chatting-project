import React, { useContext } from 'react';
import context from '../../store/context';
import Message from './Message';

export default function MessagesList({ messagesListRef }) {
  const { userMessages, activeChat, parseEmail } = useContext(context);
  const messages = userMessages[parseEmail(activeChat)].messages;

  /*
   * When to scroll
    - adding a new task (the user himself)
    - changing the active player
  */

  const messagesList = messages.map(({ id, content, date, provider }) => (
    <Message
      key={id}
      id={id}
      content={content}
      date={new Date(date)}
      you={provider !== activeChat}
    />
  ));

  return (
    <div className="messagesList" ref={messagesListRef}>
      {messagesList}
    </div>
  );
}
