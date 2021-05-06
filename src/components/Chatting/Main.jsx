import React, { useContext, useEffect, useRef } from 'react';
import Header from './Header';
import MessagesList from './MessagesList';
import Form from './Form';
import context from '../../store/context';
import Alert from './Alert';

export default function Main() {
  const { activeChat, chatsEmails } = useContext(context);
  const messagesListRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesListRef.current) {
      const element = messagesListRef.current;
      element.scrollTop = element.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat]);

  return (
    <main className="main">
      {(activeChat && (
        <>
          <Header />
          <MessagesList messagesListRef={messagesListRef} />
          <Form scrollToBottom={scrollToBottom} />
        </>
      )) || <Alert friendsNumber={chatsEmails.length} />}
    </main>
  );
}
