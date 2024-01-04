import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBooking = () => {
  const [loading, setLoading] = useState(false);
  const { user_id } = useParams();
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/galleries`)
      .then((response) => {
        console.log(response.data);
        setGalleries(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleGalleryChange = (e) => {
    const selectedGalleryId = e.target.value;
    const gallery = galleries.find((g) => g._id === selectedGalleryId);
    setSelectedGallery(gallery);
  };

  const handleDateChange = (event) => {
    setBookingDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const gallery_id = selectedGallery._id;
    const date = bookingDate;
    const formData = {
      date,
      gallery_id,
      user_id,
    };

    axios
      .post(`http://localhost:5555/bookings/`, formData)
      .then((response) => {
        console.log('Booking created', response.data);
        setLoading(false);
        showNotification("Booking Submitted");
        // Optionally, you can redirect the user after submitting the form
        // navigate('/success'); // Replace '/success' with your desired success page
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showNotification = (message) => {
    // Check if the browser supports notifications
    if ("Notification" in window) {
      // Request permission to show notifications
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // Create a notification
          new Notification(message);
        }
      });
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='text-xl mr-4 text-gray-500' htmlFor="gallery">Choose a Gallery:</label>
          <select value={selectedGallery._id || ''} onChange={handleGalleryChange} required>
            <option value="" disabled>Select a Gallery</option>
            {galleries.map((gallery) => (
              <option key={gallery._id} value={gallery._id}>{gallery.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className='text-xl mr-4 text-gray-500' htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={bookingDate.date} onChange={handleDateChange} min={getFormattedDate(new Date())}
            max="2024-02-28"/>
        </div>
        <button className='p-2 bg-sky-300 m-8' type="submit">Create Booking</button>
      </form>
    </div>
  );
};

const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default CreateBooking;



// const CreateBookings = () => {
//   const [date, setDate] = useState('');
//   const [gallery, setGallery] = useState('');
//   const [user, setUser] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();

//   const handleSaveBooking = () => {
//     const data = {
//       date,
//       gallery_id,
//       user_id,
//     };
//     setLoading(true);
//     axios
//       .post(`http://localhost:5555/bookings/${gallery_id}/${user_id}`, data)
//       .then(() => {
//         setLoading(false);
//         enqueueSnackbar('Booking Created successfully', { variant: 'success' });
//         navigate('/');
//       })
//       .catch((error) => {
//         setLoading(false);
//         enqueueSnackbar('Error', { variant: 'error' });
//         console.log(error);
//       });
//   };
//   const handleGetGallery = () => {
//     const data = {
//       gallery
//     };
//     setLoading(true);
//     axios
//       .post(`http://localhost:5555/bookings/${gallery_id}/${user_id}`, data)
//       .then(() => {
//         setLoading(false);
//         enqueueSnackbar('Booking Created successfully', { variant: 'success' });
//         navigate('/');
//       })
//       .catch((error) => {
//         setLoading(false);
//         enqueueSnackbar('Error', { variant: 'error' });
//         console.log(error);
//       });
//   };
//   return (
//     <div className='p-4'>
//       <BackButton />
//       <h1 className='text-3xl my-4'>Create Booking</h1>
//       {loading ? <Spinner /> : ''}
//       <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-gray-500'>Date</label>
//           <input
//             type='date'
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2 w-full'
//           />
//         </div>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-gray-500'>Gallery</label>
//           <input
//             type='text'
//             value={gallery_id}
//             onChange={(e) => setGallery(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2  w-full '
//           />
//         </div>
        
//         <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CreateBooks