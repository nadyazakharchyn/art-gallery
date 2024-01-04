import express from 'express';
import { Art } from '../models/artModel.js';
import { Gallery } from '../models/galleryModel.js';
const router = express.Router();

// Route for Save a new Art
router.post('/', async (request, response) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "arts",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;

    if (
      !request.body.title ||
      !request.body.artist 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, artist',
      });
    }
    const newArt = {
      title: request.body.title,
      artist: request.body.artist,
      gallery: request.body.gallery_id,
      images: req.body.images
    };

    const art = await Art.create(newArt);
    const savedArt = await art.save();
    const gallery = await Gallery.findById(request.body.gallery_id);
    gallery.arts.push(savedArt._id);
    await gallery.save();
    return response.status(201).send(art);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Arts from database
router.get('/', async (request, response) => {
  try {
    const arts = await Art.find({});

    return response.status(200).json({
      count: arts.length,
      data: arts,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Art from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const art = await Art.findById(id);

    return response.status(200).json(art);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update Art
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.gallery_id
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, artist, gallery_id',
      });
    }

    const { id } = request.params;

    const result = await Art.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Art not found' });
    }

    return response.status(200).send({ message: 'Art updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete artwork
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Art.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Artwork not found' });
    }

    return response.status(200).send({ message: 'Artwork deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;