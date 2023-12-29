import mongoose from "mongoose";

const artSchema = mongoose.Schema (
    {
        title:{
            type: String,
            required: true,
        },
        artist:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Art = mongoose.model('Art', artSchema);