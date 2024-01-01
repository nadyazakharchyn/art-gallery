import express from 'express';
import { Gallery } from '../models/galleryModel.js';

const createGallery = async (req, res) => {
    try{
        const newGallery = {
            title: req.body.title,
            address: req.body.address,
            //arts: req.body.arts
          };
        
        const gallery = await Gallery.create(newGallery);
      
        return res.status(201).send(gallery);
    } catch (error){
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

const getGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.find({});
    
        return res.status(200).json({
          count: galleries.length,
          data: galleries,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
      }
}

const getGalleryArts = async (req, res) => {
    try {
        const id = `${req.params.id}`;
    
        //const gallery = await Gallery.findById(id).populate("arts");
        const gallery = await Gallery.findById(id);

        if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
        }

    // Populate the 'arts' field in the gallery with the actual art documents
        await gallery.populate('arts');
        return res.status(200).json(gallery.arts);
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
      }
}

export {
    createGallery,
    getGalleries,
    getGalleryArts
}