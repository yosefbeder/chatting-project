import React, { useContext, useEffect, useState } from 'react';
import context from '../../store/context';
import Chat from './Chat';
import { db } from '../../firebase';
import Message from '../Chatting/Message';

export default function ChatsList() {
  const {
    user,
    chatsEmails,
    parseEmail,
    activeChat,
    onChatSelect,
    transformToArr,
  } = useContext(context);
  const [chatsList, setChatsList] = useState([]);
  const [lastMessagesInfo, setLastMessagesInfo] = useState([]);
  const [chatsInfo, setChatsInfo] = useState([]);

  useEffect(async () => {
    // get chats info from the database

    const newChatsInfo = await Promise.all(
      chatsEmails.map(async chatEmail => {
        // getting chatEmail data
        let info;

        await db
          .ref(`users/${parseEmail(chatEmail)}/info`)
          .once('value', snapshot => {
            info = snapshot.val();
          });

        return info;
      }),
    );

    // getting lastMessage and lastActive
    const newMessagesInfo = await Promise.all(
      chatsEmails.map(async chatEmail => {
        let lastMessage;

        await db
          .ref(`users/${parseEmail(chatEmail)}/chats/${parseEmail(user.email)}`)
          .once('value', snapshot => {
            if (snapshot.val()) {
              const messages = transformToArr(snapshot.val());
              lastMessage = messages[messages.length - 1];
            }
          });

        return lastMessage;
      }),
    );

    setChatsInfo(newChatsInfo);
    setLastMessagesInfo(newMessagesInfo);
  }, [chatsEmails]);

  console.log(lastMessagesInfo, chatsInfo);

  useEffect(() => {
    // set chatsList in another useEffect to be able to select chats fast and reduce re-evaluation
    if (chatsInfo.length !== 0 && lastMessagesInfo.length !== 0) {
      setChatsList(
        lastMessagesInfo.map((messageInfo, i) => {
          const { email, name, thumbnail } = chatsInfo[i];
          const { date, content, provider } = messageInfo;

          return (
            <Chat
              key={i}
              email={email}
              name={name}
              thumbnail={thumbnail}
              lastActive={date}
              lastMessage={`${
                provider === user.email ? `You: ${content}` : content
              }`}
              active={email === activeChat}
              onSelect={onChatSelect}
            />
          );
        }),
      );
    }
  }, [lastMessagesInfo, chatsInfo, activeChat]);

  return <div className="chatsList">{chatsList}</div>;
}
