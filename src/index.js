import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

// Import app and database
import app from './app.js'
import { mongoDB } from './config/database.js'

const startServer = async () => {
    try {
        await mongoDB()

        app.on('error', (error) => {
            console.error('App error:', error)
            process.exit(1)
        })

        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Startup error:', error)
        process.exit(1)
    }
}

startServer()
