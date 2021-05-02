import React, { useContext } from 'react';
import context from '../../store/context';
import ChatsList from './ChatsList';
import Profile from './Profile';
import Search from './Search';

export default function Sidebar() {
  const { activeChat } = useContext(context);

  return (
    <div className="sidebar">
      {activeChat ? (
        <>
          <Profile />
          <Search />
          <ChatsList />
        </>
      ) : (
        <div>Start a new Chat</div>
      )}
    </div>
  );
}
