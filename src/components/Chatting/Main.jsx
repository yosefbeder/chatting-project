import React, { useContext, useEffect, useRef } from 'react';
import Header from './Header';
import MessagesList from './MessagesList';
import Form from './Form';
import context from '../../store/context';
import Alert from './Alert';

export default function Main() {
  const { activeChat, chatsEmails } = useContext(context);

  return (
    <main className="main">
      {(activeChat && (
        <>
          <Header />
          <MessagesList />
          <Form />
        </>
      )) || <Alert friendsNumber={chatsEmails.length} />}
    </main>
  );
}
