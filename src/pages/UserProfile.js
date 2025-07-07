import React from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { username } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-green-400">Profile: {username}</h1>
    </div>
  );
}

export default UserProfile;
