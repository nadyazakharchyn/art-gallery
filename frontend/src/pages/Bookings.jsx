import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/bookings/user/${id}/`)
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  return (
    
    <div className='p-4'>
      <div className='flex justify-between items-center'>
      <h1 className='text-3xl my-8'>User's bookings</h1>
      </div>
      {loading ? (
        <Spinner />
      ):(
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded ms'>Date</th>
              <th className='border border-slate-600 rounded ms'>Gallery</th>
              <th className='border border-slate-600 rounded ms'>Status</th>
            </tr>
          </thead>
          <tbody>
            
            {bookings.map(booking => (
              <tr key={booking._id} className='h-8'>
                <td className='border border-slate-700 rounded md text-center'>
                  {booking.date}
                </td>
                <td className='border border-slate-700 rounded md text-center'>
                  {booking.gallery}
                </td>
                <td className='border border-slate-700 rounded md text-center'>
                  {booking.status}
                </td>
                <td className='border border-slate-700 rounded md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/bookings/${booking._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600'/>
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
  // return(
  //   <div>
  //     <h2>Art List for Gallery</h2>
  //     <ul>
  //       {arts.map(art => (
  //         <li key={art._id}>{art.title}</li>
  //       ))}
  //     </ul>
  //   </div>
  // )
};

export default Bookings;