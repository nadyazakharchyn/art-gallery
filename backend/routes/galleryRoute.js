import express from 'express';
import { createGallery,
    getGalleries,
    getGalleryArts } from '../controllers/galleryController.js';

const router = express.Router();

router
  .route("/arts")
  .post(createGallery);

router
  .route("/")
  .get(getGalleries);

router.get ("/:id/arts", getGalleryArts);

  export default router;