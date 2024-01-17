import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

// const Galleries = () => {
//     const [galleries, setGalleries] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [user, setUser] = useState('');
//     useEffect(() => {
//       const {token} = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
//       console.log(token)
//       setIsLoggedIn(!!token);
//       setLoading(true);
//       axios
//         .get(`http://localhost:5555/users/user/${token}`, {headers: {
//           Authorization: `Bearer ${token}`,
//         },})
//         .then((response) => {
//             const { user } = response.data;
//             setUser(user);
            
//             setLoading(false);
//         })
//         .catch((error) => {
//           console.log(error);
//           setLoading(false);
//         });
//       axios
//         .get('http://localhost:5555/galleries')
//         .then((response) => {
//             setGalleries(response.data.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.log(error);
//           setLoading(false);
//         });
//     }, []);
const Galleries = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    setIsLoggedIn(!!token);

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/users/user/token`, 
          { withCredentials: true });

        const { user } = response.data;
        setUser(user);
        //console.log(user);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchGalleries = async () => {
      try {
        const response = await axios.get('http://localhost:5555/galleries');
        setGalleries(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    fetchGalleries();
  }, []);

  const handleLogout = () => {
    axios.post('http://localhost:5555/users/logout');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/users/login';
  };

    return (
      
      <div className='p-4'>
        <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Our galleries</h1>
        <Link to={`/users/login`}> 
          {!isLoggedIn && (
            <Link to={`/users/login`} className='p-2 bg-sky-300 m-8'>Login</Link>
          )}
        </Link >
        <Link to={`/users/profile/${user._id}`}> 
          {isLoggedIn && (
            // Render the user profile icon if the user is logged in
            <FaUser className='text-2xl text-blue-500' />
          )}
        </Link >
        <Link to={`/users/logout/`}> 
          {isLoggedIn && (
            // Render the user profile icon if the user is logged in
            <button onClick={handleLogout}>Logout</button>
          )}
        </Link >
        <Link to={`/bookings/user/${user._id}`}> 
          {isLoggedIn && (
            // Render the user profile icon if the user is logged in
            <button>Bookings</button>
          )}
        </Link >
        {/* {!isLoggedIn ? (
          // Show the "Login" button if user is not logged in
          <Link to={`/users/login`} className='p-2 bg-sky-300 m-8'>Login</Link>
        ) : (
          // Show the user icon if user is logged in
          <Link to={`/users/profile/${user._id}`}>
            <FaUser className='text-2xl text-blue-500' />
          </Link>
        )} */}
        </div>
        {loading ? (
          <Spinner />
        ):(
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                {/* <th className='border border-slate-600 rounded ms'>No</th> */}
                <th className='border border-slate-600 rounded ms'>Title</th>
                <th className='border border-slate-600 rounded ms'>Address</th>
                <th className='border border-slate-600 rounded ms'>Artworks</th>
              </tr>
            </thead>
            <tbody>
              {galleries.map((gallery, index) => (
                <tr key={gallery._id} className='h-8'>
                  
                  <td className='border border-slate-700 rounded md text-center'>
                    {gallery.title}
                  </td>
                  <td className='border border-slate-700 rounded md text-center'>
                    {gallery.address}
                  </td>
                  <td className='border border-slate-700 rounded md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/galleries/${gallery._id}/arts`}>
                        <BsInfoCircle className='text-2xl text-green-800'/>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  export default Galleries;