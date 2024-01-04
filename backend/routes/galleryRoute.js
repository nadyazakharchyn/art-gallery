import express from 'express';
import { createGallery,
    getGalleries,
    getGalleryArts, 
    getGalleryById} from '../controllers/galleryController.js';

const router = express.Router();
router
  .route("/")
  .post(createGallery);
router
  .route("/")
  .get(getGalleries);
router.get ("/:id/arts", getGalleryArts);
router
  .route("/:id")
  .get(getGalleryById);
export default router;