import React from 'react';
import Modal from '../components/Modal';

const ModalPage = ({ handleCloseModal }) => {
  const handleCancelBooking = () => {
    // Add logic to cancel the booking
    // For example, you can make an API call to update the booking status
    const status = "Canceled"
    const data = {
      status
    };

    axios
      .put(`http://localhost:5555/bookings/${id}`, data)
      .then(() => {
        navigate('/');
        console.log('Booking canceled');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
    
    handleCloseModal();
  };

  return (
    <div>
      <h1>Booking Details</h1>
      {/* Add your modal content here */}
      <Modal show={true} handleClose={handleCloseModal}>
        <p>Booking details go here...</p>
        <button onClick={handleCancelBooking}>Cancel Booking</button>
      </Modal>
    </div>
  );
};

export default ModalPage;