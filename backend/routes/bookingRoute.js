import express from 'express';
import { createBooking, editBooking, getBookingsForUser, getBookingsForGallery, myBookings} from '../controllers/bookingController';
import { isAuthenticatedUser, protect } from '../middleware/authMiddleware.js'
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

router.get('/user/:user_id', getBookingsForUser);
router.get('/gallery_id=:gallery_id', getBookingsForGallery);
router.route("/me").get(protect, myBookings);
export default router;