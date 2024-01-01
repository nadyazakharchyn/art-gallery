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
        arts: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'Art'}
        ],
        bookings: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'Booking'}
        ]
    },
    {
        timestamps: false,
    }
);

export const Gallery = mongoose.model('Gallery', gallerySchema);