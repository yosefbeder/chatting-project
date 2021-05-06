import React from 'react';
import ChatsList from './ChatsList';
import Profile from './Profile';
import Search from './Search';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Profile />
      <Search />
      <ChatsList />
    </div>
  );
}
