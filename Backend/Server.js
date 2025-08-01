import express from 'express'
import cors from 'cors'
// import bodyParser from 'body-parser'
import 'dotenv/config'
import mongoose from 'mongoose'

//import Routes----------
import LocationRouter from './routes/locationRouter.js'
import PropertieRouter from './routes/propertiesRouter.js'
import UserRouter from './routes/userRouter.js'


let app = express()
app.use(cors())
app.use(express.json())


//Mongo Conn------------
mongoose.connect(process.env.MONGODB_URI).then(
    console.log("Mongodb conn.......")
)

//Routes-------------
app.get('/',(req, res)=>{
    res.send("Welcome to api...")
})

app.use('/location', LocationRouter)
app.use('/properties', PropertieRouter)
app.use('/user', UserRouter)


//Listening-------------
app.listen(process.env.PORT, (req,res)=>{
    console.log('Server is running on 5000')
})