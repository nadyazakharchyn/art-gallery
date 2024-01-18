import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const Arts = () => {
  const [arts, setArts] = useState([]);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [isAdmin, setisAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    setIsLoggedIn(!!token);  
    axios
      .get(`http://localhost:5555/galleries/${id}`)
      .then((response) => {
        setGalleryTitle(response.data.title);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5555/galleries/${id}/arts`)
      .then((response) => {
        setArts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5555/users/user/token`, 
            { withCredentials: true });
          const { user } = response.data;
          if (user.role === 'admin') {
            setisAdmin(true)
          };
          console.log(isAdmin)
          setUser(user);
        } catch (error) {
          console.log(error);
        }
    };
    fetchUser();
      
  }, []);
  const handlePlanVisit = () => {
    if (isLoggedIn) {
      navigate(`/bookings/${user._id}`);
    } else {
      navigate('/users/login');
    }
  };


  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>{galleryTitle} Gallery </h1>
        {!isAdmin && (<button className='p-2 bg-sky-300 m-8' onClick={handlePlanVisit}>Plan a visit</button>)}
        <Link to={`/bookings/gallery/${id}`}>
          {isAdmin && (
              <button>View bookings</button>
            )}
          
        </Link>
      </div>
      <div className='flex justify-between items-center'>
        <h3 className='text-3xl my-8'>Artworks List</h3>
        <Link to={`/arts/${id}`}>
          {isAdmin && (
              <MdOutlineAddBox className='text-sky-800 text-4xl' />
            )}
          
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded ms'>Title</th>
              <th className='border border-slate-600 rounded ms'>Artist</th>
              {isAdmin && (<th className='border border-slate-600 rounded ms'>Operations</th>)}
            </tr>
          </thead>
          <tbody>
          {arts.map((art) => (
            <tr key={art._id} className='h-8'>
              <td className='border border-slate-700 rounded md text-center'>{art.title}</td>
              <td className='border border-slate-700 rounded md text-center'>{art.artist}</td>
              {isAdmin && (
                <td className='border border-slate-700 rounded md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/arts/details/${art._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/arts/edit/${art._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/arts/delete/${art._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
        </table>
      )}
    </div>
  );
};

export default Arts;

