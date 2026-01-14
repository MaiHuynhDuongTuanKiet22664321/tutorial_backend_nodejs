import User from "../models/user.model.js"

const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        //validate
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        //check if user exists
        const userExists = await User.findOne({ email: email.toLowerCase() })
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        //create user
        const user = await User.create({
            userName,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        })

        return res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, userName: user.userName, email: user.email, password: user.password }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export {registerUser}