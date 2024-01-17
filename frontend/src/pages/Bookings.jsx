import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [user, setUser] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/users/profile/${id}`, { withCredentials: true })
      .then((response) => {
        setUser(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:5555/bookings/user/${id}/`, { withCredentials: true })
      .then(async (response) => {
        const bookingsWithGalleryTitles = await Promise.all(
          response.data.map(async (booking) => {
            const galleryDetails = await getGalleryDetails(booking.gallery);
            return { ...booking, galleryTitle: galleryDetails.title };
          })
        );
        setBookings(bookingsWithGalleryTitles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const getGalleryDetails = async (galleryId) => {
    try {
      const response = await axios.get(`http://localhost:5555/galleries/${galleryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching gallery details:', error);
      return {};
    }
  };


  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>User's bookings for {user}</h1>
        <Link to={`/bookings/${id}`}>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <table className='w-full border-separate border-spacing-2'>
            <thead>
            <tr>
              <th className='border border-slate-600 rounded ms'>Date</th>
              <th className='border border-slate-600 rounded ms'>Gallery</th>
              <th className='border border-slate-600 rounded ms'>Status</th>
              <th className='border border-slate-600 rounded ms'>Edit</th>
            </tr>
          </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className='h-8'>
                  <td className='border border-slate-700 rounded md text-center'>{getFormattedDate(booking.date)}</td>
                  <td className='border border-slate-700 rounded md text-center'>{booking.galleryTitle}</td>
                  <td className='border border-slate-700 rounded md text-center'>{booking.status}</td>
                  <td className='border border-slate-700 rounded md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/bookings/edit/${booking._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         
        
        </div>
      )}
    </div>
  );
};
const getFormattedDate = (date) => {
  var date = new Date(date)
  date = date.toLocaleString('uk-UA', {year:'numeric', month: 'numeric', day:'numeric'  });
  return date;
};

export default Bookings;