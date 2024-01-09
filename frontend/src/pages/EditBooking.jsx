import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBooking = () => {
  const [date, setDate] = useState('');
  const { id } = useParams();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/bookings/${id}`)
    .then((response) => {
        setDate(response.data.date)
        setStatus(response.data.status)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [])
  
  const handleEditBooking = () => {
    const data = {
      date,
      status
    };
    setLoading(true);
    axios
      .patch(`http://localhost:5555/bookings/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Booking</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Status</label>
          <select value={status || ''} onChange={(e) => setStatus(e.target.value)} required>
            <option value="" disabled>Select Status</option>
            <option value="Scheduled" >Scheduled</option>
            <option value="Canceled" >Canceled</option>
            <option value="Completed" >Completed</option>
          </select>
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBooking}>
          Save
        </button>
      </div>
    </div>
  )
}
const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default EditBooking