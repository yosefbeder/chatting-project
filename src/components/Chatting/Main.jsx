import React, { useContext } from 'react';
import Header from './Header';
import MessagesList from './MessagesList';
import Form from './Form';

export default function Main() {
  return (
    <main className="main">
      {(true && (
        <>
          <Header />
          <MessagesList />
          <Form />
        </>
      )) ||
        'Please Select a Chat'}
    </main>
  );
}
