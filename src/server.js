// varaiables
require('dotenv').config({
    path:'./config/config.env'
})
// connect to database
require('./DB/connect')

const express=require('express')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const morgan = require('morgan')
// imports
const userRoutes = require('./Routes/userRoute')
const productRoutes = require('./Routes/productRoute')
const orderRoutes = require('./Routes/orderRoute')
const uploads= require('./Routes/uploads')
const app = express()
// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
        origin:process.env.CLIENT_URL,
        credentials:true
}))
app.use(cookieParser())
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}


// routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads',uploads)
app.get('/api/paypal/config',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})
// imports
const {PORT}=process.env

app.listen(PORT,()=>{console.log(`Port ${PORT} is running`)})