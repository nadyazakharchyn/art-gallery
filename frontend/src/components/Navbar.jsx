import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome, FaUser } from 'react-icons/fa';
import {Link} from 'react-router-dom';

const Navbar=()=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    setIsLoggedIn(!!token);

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/users/user/token`, 
          { withCredentials: true });
        const { user } = response.data;
        if (user.role === 'admin') {
          setisAdmin(true)
        };
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };  
    fetchUser();
  }, []);

  const handleLogout = () => {
    axios.post('http://localhost:5555/users/logout');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/users/login';
  };

  return (
    <div>
    <nav style={{ background: '#58092A', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          
          <Link to='/' style={{ color: '#F8DAE6', textDecoration: 'none', padding: '5px 10px' }}>Home</Link>

          {!isLoggedIn && (
            <Link to='/users/login' style={{ color: '#F8DAE6', textDecoration: 'none', padding: '5px 10px' }}>Login</Link>
          )}

          {isLoggedIn && (
            <Link to={`/users/profile/${user._id}`} style={{ color: '#F8DAE6', textDecoration: 'none', padding: '5px 10px' }}>
              Profile
            </Link>
          )}
          {isAdmin && (
            <Link to={`/users/`} style={{ color: '#F8DAE6', textDecoration: 'none', padding: '5px 10px' }}>
              Users
            </Link>
          )}

          {isLoggedIn && (
            <button onClick={handleLogout} style={{ color: '#F8DAE6',  border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
          )}

          {isLoggedIn && (
            <Link to={`/bookings/user/${user._id}`} style={{ color: '#F8DAE6', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
              Bookings
            </Link>
          )}

    </nav>
    </div>
  );

}

export default Navbar;