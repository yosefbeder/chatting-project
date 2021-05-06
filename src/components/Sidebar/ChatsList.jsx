import React, { useContext, useState, useEffect } from 'react';
import context from '../../store/context';
import Chat from './Chat';

export default function ChatsList() {
  const {
    user,
    chats,
    userMessages: messagesObj,
    activeChat,
    onChatSelect,
    parseEmail,
    value,
  } = useContext(context);
  const [chatsList, setChatsList] = useState([]);

  // updating chats list with chats change (which is changed by chatsEmails change)

  // FIXME: renders two times when addding a new message

  // FIXME: takes a lot of time to repond to changing activeChat

  useEffect(() => {
    if (chats) {
      setChatsList(
        chats.map(({ email, name, thumbnail }, i) => {
          let lastMessage;
          if (messagesObj[parseEmail(email)]) {
            const messages = messagesObj[parseEmail(email)].messages;
            lastMessage = messages[messages.length - 1];
          }
          return (
            <Chat
              key={i}
              email={email}
              name={name}
              thumbnail={thumbnail}
              lastActive={lastMessage?.date || 'none'}
              lastMessage={`${
                lastMessage?.content
                  ? lastMessage?.provider === user.email
                    ? `You: ${lastMessage?.content}`
                    : lastMessage?.content
                  : 'The chat is empty'
              }`}
              active={email === activeChat}
              onSelect={() => onChatSelect(email)}
            />
          );
        }),
      );
    }
  }, [chats, activeChat, value]);

  return <div className="chatsList">{chatsList}</div>;
}
