require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const connectDB = async() => {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-web.mfcbb.mongodb.net/mern-web?retryWrites=true&w=majority`,{
            useNewUrlParser:true,
            useUnifiedTopology:true,

        })
        console.log('MongoDB connected')
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()
const app = express()
app.use(express.json())
app.use(cors())
//app.get('/',(req,res) => res.send('hello world'))

app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> console.log(`Server start on port ${PORT}`))