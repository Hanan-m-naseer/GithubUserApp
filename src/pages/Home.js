import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import UserList from '../components/UserList';
import axios from 'axios';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
  if (!query) return;

  // Reset user list so old infinite scroll users vanish
  setUsers([]);
  setIsSearching(true);
  setLoading(true);
  setError('');

  try {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${query}`
    );
    setUsers(response.data.items);
  } catch (err) {
    setError('Error fetching search results');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-400 mb-4">Github UserList</h1>
      
      <SearchBar onSearch={handleSearch} />
      {isSearching && (
  <button
    onClick={() => {
      setUsers([]);
      setIsSearching(false);
    }}
    className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
  >
    Clear Search
  </button>
)}
      
      {error && <p className="text-red-400">{error}</p>}
      
      <UserList users={users} loading={loading} isSearching={isSearching} setUsers={setUsers} />
    </div>
  );
}

export default Home;
