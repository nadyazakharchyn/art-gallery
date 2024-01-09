import express from 'express';
import { createBooking, editBooking, getBookingsForUser, getBookingsForGallery, myBookings} from '../controllers/bookingController';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
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
  .get(getBookingById);
router
  .route("/user/:user_id")
  .get(protect, getBookingsForUser)
//router.get('/user/:user_id', getBookingsForUser);
router
  .route("/gallery/:gallery_id")
  .get(protect, authorizeRoles("admin"), getBookingsForGallery)
//router.get('/gallery/:gallery_id', getBookingsForGallery);
export default router;