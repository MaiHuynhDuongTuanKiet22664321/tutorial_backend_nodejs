import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },

},
    {
        timestamps: true
    }
)


export default mongoose.model("User", userSchema)