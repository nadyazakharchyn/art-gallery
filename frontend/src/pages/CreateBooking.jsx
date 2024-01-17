import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBooking = () => {
  const { user_id } = useParams();
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

// Function to check if a date is a Monday
const isMonday = (date) => {
  return date.getDay() === 1; // Sunday is 0, Monday is 1, and so on
};

// Function to filter out Mondays
const filterMondays = (date) => {
  return !isMonday(date);
};

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
        setTimeout(() => {
          navigate("/");
        }, 1000);
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
  // Function to get the date two months from today
  const getTwoMonthsFromToday = () => {
    const today = new Date();
    today.setMonth(today.getMonth() + 2);
    return today;
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
          <DatePicker 
          selected={bookingDate} onChange={(date) => setBookingDate(date)} 
          filterDate={filterMondays} // Apply the filter function
          placeholderText="Select a date"
          value={bookingDate.date} minDate={new Date()}
          maxDate={getTwoMonthsFromToday()}
          />
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


