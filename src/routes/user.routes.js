import { Router } from "express";
import { registerUser, login } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()

router.post('/register', registerUser)
router.post('/login', login)

// Protected routes - cần authentication
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ user: req.user, message: 'Profile accessed successfully' })
})

router.put('/profile', authMiddleware, (req, res) => {
    res.json({ user: req.user, message: 'Profile updated successfully' })
})

router.delete('/account', authMiddleware, (req, res) => {
    res.json({ user: req.user, message: 'Account deleted successfully' })
})

export default router;