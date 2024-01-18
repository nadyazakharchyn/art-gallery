import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ModalPage from './ModalPage';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const GalleryBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/bookings/gallery/${id}/`, { withCredentials: true })
      .then( (response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    axios
      .get(`http://localhost:5555/galleries/${id}`)
      .then((response) => {
        setGalleryTitle(response.data.title);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);

  const getUserDetails = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5555/users/profile/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return {};
    }
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Bookings for {galleryTitle} gallery</h1>
        {/* <Link to={`/bookings/${id}`}>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link> */}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <table className='w-full border-separate border-spacing-2'>
            <thead>
            <tr>
              <th className='border border-slate-600 rounded ms'>Date</th>
              <th className='border border-slate-600 rounded ms'>User</th>
              <th className='border border-slate-600 rounded ms'>Status</th>
              <th className='border border-slate-600 rounded ms'>Edit</th>
            </tr>
          </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className='h-8'>
                  <td className='border border-slate-700 rounded md text-center'>{getFormattedDate(booking.date)}</td>
                  <td className='border border-slate-700 rounded md text-center'>{booking.user}</td>
                  <td className='border border-slate-700 rounded md text-center'>{booking.status}</td>
                  <td className='border border-slate-700 rounded md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      {/* Open modal on edit icon click */}
                      
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

export default GalleryBookings;