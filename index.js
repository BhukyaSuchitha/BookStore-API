
require('dotenv').config();
const express = require('express')

const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const app = express()
const User = require('./models/user')

const path = "/Users/bhukya.suchitha/Documents/bookstore-main"

app.use(express.json())
app.use(express.static(path))

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
// console.log(database)

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})



const routes = require('./routes/routes');



app.use('/', routes)




app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})