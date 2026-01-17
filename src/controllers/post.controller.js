import Post from "../models/post.model.js";

const createPost = async(req, res) =>{
    try {
        const {namePost,description,age} = req.body;

        if(!namePost || !description || !age){
            return res.status(400).json({message:"All fields are required"})
        }

        const post = await Post.create({namePost,description,age})
        return res.status(201).json({message:"Post created successfully",post})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get a post
const getPostByName = async(req,res)=>{
    try {
        const {namePost} = req.body
        if(!namePost){
            return res.status(400).json({message:"All fields are required"}) 
        }
        const post = await Post.findOne({ namePost: namePost });
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({message:"Internal server error",error})
    }
}

// get all posts
const getAllPost = async(req,res) =>{
    try {
        const getPost = await Post.find();
        return res.status(200).json(getPost);
    } catch (error) {
        return res.status(500).json({message:"Internal server error",error})
    }
}

export {
    createPost,
    getAllPost,
    getPostByName
}