import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    namePost: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
    },

},
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
)

export default mongoose.model("Post", postSchema)