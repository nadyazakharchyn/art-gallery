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
        gallery:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gallery'
        }
    },
    {
        timestamps: true,
    }
);

export const Art = mongoose.model('Art', artSchema);