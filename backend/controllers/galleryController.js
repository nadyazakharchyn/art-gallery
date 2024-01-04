import express from 'express';
import { Gallery } from '../models/galleryModel.js';

const createGallery = async (req, res) => {
    try{
        const newGallery = {
            title: req.body.title,
            address: req.body.address,
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

const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findById(id);
    return res.status(200).json(gallery);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
}

const getGalleryArts = async (req, res) => {
    try {
        const id = `${req.params.id}`;
        const gallery = await Gallery.findById(id);

        if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
        }

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
    getGalleryArts,
    getGalleryById
}