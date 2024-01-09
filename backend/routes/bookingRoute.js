import express from 'express';
import { createBooking, editBooking, getBookingsForUser, getBookingsForGallery, myBookings} from '../controllers/bookingController';
import { isAuthenticatedUser, protect } from '../middleware/authMiddleware.js'
import { getBookingById } from '../controllers/bookingController';
const router = express.Router();

// router
//   .route("/:gallery_id/:user_id")
//   .post(createBooking);
router
  .route("/")
  .post(createBooking);
router
  .route("/:booking_id")
  .patch(editBooking)
router
  .route("/:id")
  .get(getBookingById)
//router.route('/user/:user_id').get(isAuthenticatedUser, getBookingsForUser);
router.get('/user/:user_id', getBookingsForUser);
router.get('/gallery/:gallery_id', getBookingsForGallery);
//router.route("/me").get(protect, myBookings);
export default router;