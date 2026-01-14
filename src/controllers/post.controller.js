import Post from "../models/post.model.js";

const createPost = async(req, res) =>{
    try {
        const {namePost,description} = req.body;

        if(!namePost || !description){
            return res.status(400).json({message:"All fields are required"})
        }

        const post = await Post.create({namePost,description})
        return res.status(201).json({message:"Post created successfully",post})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export {
    createPost
}