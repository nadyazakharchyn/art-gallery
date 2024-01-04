import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ModalPage from './ModalPage';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for programmatic navigation


  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/bookings/user/${id}/`)
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

  const handleShowModal = () => {
    setModalShow(false);
  };

  // Close modal
  const handleCloseModal = () => {
    setModalShow(false);
  };


  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>User's bookings</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <table className='w-full border-separate border-spacing-2'>
            {/* ... Table header */}
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className='h-8'>
                  <td className='border border-slate-700 rounded md text-center'>{booking.date}</td>
                  <td className='border border-slate-700 rounded md text-center'>{booking.galleryTitle}</td>
                  <td className='border border-slate-700 rounded md text-center'>{booking.status}</td>
                  <td className='border border-slate-700 rounded md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      {/* Open modal on edit icon click */}
                      <MdOutlineAddBox
                        className='text-2xl text-red-600'
                        onClick={handleShowModal}
                      />
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

export default Bookings;