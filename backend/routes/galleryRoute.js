import express from 'express';
import { createGallery,
    getGalleries,
    getGalleryArts, 
    getGalleryById} from '../controllers/galleryController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();
router
  .route("/")
  .post(createGallery);
router
  .route("/")
  .get(getGalleries);
router
    .route("/:id/arts")  
    .get (getGalleryArts);
router
  .route("/:id")
  .get(getGalleryById);
export default router;