import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

const Galleries = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
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