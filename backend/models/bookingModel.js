import mongoose from "mongoose";

const bookingSchema = mongoose.Schema (
    {
        date:{
            type: Date,
            required: true,
        },
        gallery:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gallery'
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status:{
            type: String,
            required: true
        }
    },
    {
        timestamps: false,
    }
);

export const Booking = mongoose.model('Booking', bookingSchema);