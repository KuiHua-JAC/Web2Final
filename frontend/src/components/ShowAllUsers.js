import React, { useEffect, useState } from 'react';

export default function ShowAllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:1339/user');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-screen-20">
      <h1 className="text-center text-5xl font-bold capitalize italic text-black mb-16">
        Update Username
      </h1>
      <ul className="text-center text-1l font capitalize italic text-black mb-16">
        {users.map((user) => (
          <li key={user.id}>
            {console.log(user)}
            <p>Username: {user.username}</p>
            <p>Name: {user.firstname} {user.lastname}</p>
            <p>Email: {user.email}</p>
            <p>Is Admin: {user.isadmin.toString()}</p>
            <br></br>
            <br></br>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}


