import mongoose from "mongoose";

const gallerySchema = mongoose.Schema (
    {
        title:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: false,
    }
);

export const Gallery = mongoose.model('Gallery', gallerySchema);