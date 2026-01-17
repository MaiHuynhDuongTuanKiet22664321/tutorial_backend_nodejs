import { Router } from "express";
import { createPost, getAllPost, getPostByName } from "../controllers/post.controller.js";

const router = Router()

router.post('/create', createPost)
router.get('/getAll',getAllPost)
router.get('/getByName',getPostByName)

export default router