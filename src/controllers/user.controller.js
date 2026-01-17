import User from "../models/user.model.js"
import RefreshToken from "../models/refreshToken.model.js"
import { generateAccessToken, generateRefreshToken } from '../service/token.service.js'

const registerUser = async (req, res) => {
    try {
        const username = req.body.username || req.body.userName
        const { email, password } = req.body;

        //validate
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        //check if user exists
        const userExists = await User.findOne({ email: email.toLowerCase() })
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        //create user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        })

        return res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, username: user.username, email: user.email, password: user.password }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        await RefreshToken.create({
            user: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        return res.status(200).json({
            accessToken,
            refreshToken,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export { registerUser, login }