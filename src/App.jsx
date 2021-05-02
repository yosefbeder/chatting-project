import React, { useContext, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Chatting/Main';
import { db, auth, provider } from './firebase';
import Login from './components/Login/Login';
import Context from './store/context';
import { v4 as uuid } from 'uuid';

export default function App() {
  const [user, setUser] = useState(null);
  const [chatsEmails, setChatsEmails] = useState([]);
  const [activeChat, setActiveChat] = useState('');

  useEffect(() => {
    if (user) {
      db.ref(`/users/${parseEmail(user.email)}/chats/`).once(
        'value',
        snapshot => {
          if (snapshot.val()) {
            const snapshotArr = Object.keys(snapshot.val()).map(
              email => `${email}@gmail.com`,
            );

            setChatsEmails(snapshotArr);
            setActiveChat(snapshotArr[0]);
          }
        },
      );
    }
  }, [user]);

  const parseEmail = email => {
    const emailArr = email.split('');
    return emailArr.slice(0, emailArr.lastIndexOf('@')).join('');
  };

  const signIn = async () => {
    // getting the data that I'll need from user object
    const {
      additionalUserInfo: {
        isNewUser,
        profile: { email, name, picture: thumbnail },
      },
    } = await auth.signInWithPopup(provider);

    const info = { email, name, thumbnail };

    // adding the user to the database
    if (isNewUser) {
      db.ref(`users/${parseEmail(email)}/info`).set(info);
    }

    // updating the state
    setUser(info);
  };

  const signOut = () => {
    auth.signOut();
    setUser(null);
    setActiveChat(null);
    setChatsEmails([]);
  };

  const addChat = () => {
    // getting the email
    const email = prompt('Enter the Email Address');

    // check if the user exists
    if (email) {
      db.ref(`/users/${parseEmail(email)}/info`).once('value', snapshot => {
        if (!snapshot.val()) {
          alert("This user isn't existed");
        } else if (email === user.email) {
          alert('This is you!');
        } else if (chatsEmails.includes(email)) {
          alert('User is already existed');
        } else {
          // adding the chat to the state
          const copy = [...chatsEmails];
          copy.push(email);
          setChatsEmails(copy);

          // adding the chat to the backend with a message

          const updates = {};
          const fMId = uuid();

          updates[
            `users/${parseEmail(user.email)}/chats/${parseEmail(email)}/${fMId}`
          ] = {
            provider: user.email,
            content: 'Hey I want to be your friend 😎😎😎',
            date: new Date().toISOString(),
          };

          updates[
            `users/${parseEmail(email)}/chats/${parseEmail(user.email)}/${fMId}`
          ] = {
            provider: user.email,
            content: 'Hey I want to be your friend 😎😎😎',
            date: new Date().toISOString(),
          };

          db.ref().update(updates);
        }
      });
    } else {
      return;
    }
  };

  const onChatSelect = email => {
    setActiveChat(email);
  };

  const transformToArr = obj => {
    const arr = [];

    for (const [key, value] of Object.entries(obj)) {
      arr.push({ ...value, id: key });
    }

    return arr;
  };

  return user ? (
    <Context.Provider
      value={{
        user,
        signOut,
        addChat,
        chatsEmails,
        parseEmail,
        activeChat,
        onChatSelect,
        transformToArr,
      }}
    >
      <div className="app">
        <Sidebar />
        <Main />
      </div>
    </Context.Provider>
  ) : (
    <Login onSignIn={signIn} />
  );
}
