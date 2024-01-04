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
        },
        images: [
            {
              public_id: {
                type: String,
                required: true,
              },
              url: {
                type: String,
                required: true,
              },
            },
          ],
    },
    {
        timestamps: true,
    }
);

export const Art = mongoose.model('Art', artSchema);