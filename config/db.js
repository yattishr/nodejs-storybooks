const mongoose = require('mongoose')
const dotenv = require('dotenv')


// Load config file
dotenv.config({ path: './config.env' })

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongoDB Connected on: ${conn.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
        console.log(`Mongo uri is: ${process.env.MONGO_URI}`)
    }
}

module.exports = connectDB