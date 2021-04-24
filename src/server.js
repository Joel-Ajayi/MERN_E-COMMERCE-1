require('dotenv').config({
    path:'./config/config.env'
})
const {PORT} = process.env
const express= require('express')

const usersRoute= require('./Routes/usersRoute')

const app= express()

app.use(usersRoute)

app.listen(PORT,()=>{
    console.log(`PORT 5000 RUNNING`)
})