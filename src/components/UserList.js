import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

function UserList({ users, loading, isSearching, setUsers }) {
  const [since, setSince] = useState(0);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleScroll = useCallback(() => {
    if (!hasMore || loadingMore) return;
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
    if (nearBottom) {
      fetchUsers(since);
    }
  }, [since, loadingMore, hasMore]);
  // Only fetch all users if NOT searching
  useEffect(() => {
    if (!isSearching && users.length === 0) {
      fetchUsers(0);
    }
  }, [isSearching]);

  // Infinite scroll only if NOT searching
  useEffect(() => {
    if (!isSearching) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isSearching]);

  const fetchUsers = async (sinceParam) => {
    if (loadingMore) return;
    try {
      setLoadingMore(true);
      const response = await axios.get(
        `https://api.github.com/users?since=${sinceParam}&per_page=30`
      );
      const newUsers = response.data;
      if (newUsers.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prev) => [...prev, ...newUsers]);
        setSince(newUsers[newUsers.length - 1].id);
      }
      setError('');
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setLoadingMore(false);
    }
  };

  

  return (
    <div>
      {error && <p className="text-red-400">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {(loading || loadingMore) && <p className="text-gray-400 mt-4">Loading more users...</p>}
      {!hasMore && !isSearching && <p className="text-gray-500 mt-4">No more users to load.</p>}
    </div>
  );
}

export default UserList;
