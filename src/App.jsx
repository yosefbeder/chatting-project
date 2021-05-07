import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Chatting/Main';
import { db, auth, provider } from './firebase';
import Login from './components/Login/Login';
import Context from './store/context';
import { v4 as uuid } from 'uuid';
import Paper from '@material-ui/core/Paper';
const parseEmail = email => {
  const emailArr = email.split('');
  const i = email.lastIndexOf('@');
  return emailArr.slice(0, i).join('');
};

export default function App() {
  const [user, setUser] = useState();
  const [chatsEmails, setChatsEmails] = useState([]);
  const [chats, setChats] = useState([]);
  const [userMessages, setUserMessages] = useState({});
  const [activeChat, setActiveChat] = useState('');
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
  - sign in
  - send user data to the database if user is new
  */

  useEffect(() => {
    setIsLoading(true);
    const userData = JSON.parse(localStorage.getItem('USER_DATA'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const signIn = async () => {
    try {
      //sign in
      setIsLoading(true);

      const data = await auth.signInWithPopup(provider);

      const {
        isNewUser,
        profile: { email, name, picture: thumbnail },
      } = data.additionalUserInfo;
      setUser({ email, name, thumbnail });

      // sending data to the database

      if (isNewUser) {
        db.ref(`/users/${parseEmail(email)}/info`).set({
          email,
          name,
          thumbnail,
        });
      }

      localStorage.setItem(
        'USER_DATA',
        JSON.stringify({ email, name, thumbnail }),
      );
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      setTimeout(() => setError(null), 3000);
    }
  };

  // get user data from the local storage if it's existed

  /*
  - get chatsEmails and update it whenever something is changed in the database
  - get messages and update it whenever something is chnaged in the database
  */

  useEffect(() => {
    // getting chatsEmails and messages and adding an event listener to update them

    if (user) {
      db.ref(`/users/${parseEmail(user.email)}/chats`).on('value', snapshot => {
        if (snapshot.val()) {
          const emails = Object.keys(snapshot.val()).map(
            email => `${email}@gmail.com`,
          );

          if (!emails.includes(activeChat)) {
            setActiveChat('');
          }

          if (JSON.stringify(chatsEmails) !== JSON.stringify(emails)) {
            setChatsEmails(emails);
          }

          setUserMessages(() => {
            const messagesObj = snapshot.val();
            Object.keys(messagesObj).map(key => {
              if (!messagesObj[key].messages) {
                messagesObj[key].messages = [];
              }
              return messagesObj;
            });
            return messagesObj;
          });
        } else {
          setActiveChat('');
          setChatsEmails([]);
        }
      });
    }

    return () => {
      if (user) {
        db.ref(`/users/${parseEmail(user.email)}/chats`).off();
      }
    };
  }, [user, activeChat, chatsEmails]);

  // get chats and update it

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          if (chatsEmails.length === 0) setChats([]);
          else {
            const newChats = await Promise.all(
              chatsEmails.map(async chatEmail => {
                let info;
                await db
                  .ref(`users/${parseEmail(chatEmail)}/info`)
                  .once('value', snapshot => {
                    info = snapshot.val();
                  });
                return info;
              }),
            );

            setChats(newChats);
          }
        } catch (err) {
          setError("Couldn't fetch user chats");
        }
        setIsLoading(false);
      })();
    }
  }, [chatsEmails]);

  // Profile Functions:

  const signOut = () => {
    auth.signOut();
    setUser(null);
    setChats([]);
    setUserMessages([]);
    setChatsEmails([]);
    setActiveChat('');
    localStorage.removeItem('USER_DATA');
  };

  const addChat = async email => {
    try {
      if (email === user.email) throw new Error('This is you!');
      if (chatsEmails.includes(email))
        throw new Error('User is existed already');
      let isExisted;
      await db
        .ref(`/users/${parseEmail(email)}/info`)
        .once('value', snapshot => {
          if (!snapshot.val()) isExisted = false;
          if (snapshot.val()) isExisted = true;
        });
      if (!isExisted) throw new Error("This user isn't even using or app");
      if (isExisted) {
        const updates = {};

        updates[
          `/users/${parseEmail(user.email)}/chats/${parseEmail(email)}`
        ] = { isExisted, messages: [] };
        updates[
          `/users/${parseEmail(email)}/chats/${parseEmail(user.email)}`
        ] = {
          isExisted,
          messages: [],
        };

        db.ref().update(updates);
      }
    } catch (err) {
      alert(err);
    }
  };

  // ChatsList Functions:

  const onChatSelect = email => {
    setActiveChat(prev => {
      if (prev === email) return '';
      return email;
    });
  };
  // Header Functions

  const resetChat = email => {
    // locally

    setUserMessages(prev => {
      prev[parseEmail(email)].messages = [];
      return prev;
    });

    // database

    db.ref(
      `/users/${parseEmail(user.email)}/chats/${parseEmail(email)}/messages`,
    ).remove();
    db.ref(
      `/users/${parseEmail(email)}/chats/${parseEmail(user.email)}/messages`,
    ).remove();
  };

  const deleteChat = email => {
    // locally

    const newChatsEmails = [...chatsEmails];
    newChatsEmails.splice(newChatsEmails.indexOf(parseEmail(email)), 1);

    setActiveChat('');
    setChatsEmails(newChatsEmails);

    // database
    db.ref(
      `/users/${parseEmail(user.email)}/chats/${parseEmail(email)}`,
    ).remove();
    db.ref(
      `/users/${parseEmail(email)}/chats/${parseEmail(user.email)}`,
    ).remove();
  };

  // Message Functions

  const updateActiveChatMessages = () => {
    db.ref(
      `/users/${parseEmail(user.email)}/chats/${parseEmail(
        activeChat,
      )}/messages`,
    ).set(userMessages[parseEmail(activeChat)].messages);
    db.ref(
      `/users/${parseEmail(activeChat)}/chats/${parseEmail(
        user.email,
      )}/messages`,
    ).set(userMessages[parseEmail(activeChat)].messages);
  };

  const deleteMessage = id => {
    // locally
    const messages = userMessages[parseEmail(activeChat)].messages;
    const i = messages.findIndex(message => message.id === id);
    if (messages[i].provider === user.email) {
      messages.splice(i, 1);
      setUserMessages();
      setValue(value => value + 1);

      // database

      updateActiveChatMessages();
    }
  };

  const viewMessageInfo = id => {
    const { date, content, provider } = userMessages[
      parseEmail(activeChat)
    ].messages.find(message => message.id === id);
    alert(`Content: ${content}\nDate: ${date}\nWriter: ${provider}`);
  };

  // Form Functions

  const addMessage = content => {
    // locally

    if (content) {
      setUserMessages(prev => {
        prev[parseEmail(activeChat)].messages.push({
          id: uuid(),
          content,
          date: new Date().toString(),
          provider: user.email,
        });

        return prev;
      });

      setValue(value => value + 1);

      // database

      updateActiveChatMessages();
    }
  };

  return user && !isLoading & !error ? (
    <Context.Provider
      value={{
        user,
        signOut,
        addChat,
        chats,
        chatsEmails,
        userMessages,
        value,
        activeChat,
        onChatSelect,
        parseEmail,
        resetChat,
        deleteChat,
        viewMessageInfo,
        deleteMessage,
        addMessage,
      }}
    >
      <Paper elevation={10} className="app">
        <Sidebar />
        <Main />
      </Paper>
    </Context.Provider>
  ) : (
    <Login onSignIn={signIn} isLoading={isLoading} error={error} />
  );
}
