import React from 'react';

function UserCard({ user }) {
  return (
    <div className="bg-gray-800 p-4 rounded flex items-center space-x-4 hover:bg-gray-700 transition">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <p className="text-green-400 font-bold">{user.login}</p>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline text-sm"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

export default UserCard;
