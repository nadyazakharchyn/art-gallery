import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserFromToken,
  getUsers
} from '../controllers/authController';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(authorizeRoles("admin"), getUsers);
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile/:id')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
// router.get('/user/token', getUserFromToken, (req, res) => {
//     //const user = req.user;
//     //console.log(user)
//     //res.json({ user });
//   });
router.get('/user/token', getUserFromToken)
export default router;