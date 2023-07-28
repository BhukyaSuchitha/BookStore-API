const express = require('express')
const got = require('got')
const checkRole = require('../middeware/checkrole')
const userAuth = require('../middeware/userauth')

const validator = require('../middeware/validator')

const router = express.Router();
const bcrypt = require('bcrypt')

const BookModel = require('../models/book')
const UserModel = require('../models/user')


// To retrieve list of books with filtering options like genre,availability

router.get('/books' , async (req, res) => {
    try{
        let query = req.query
         let page = Number(req.query.page) || 1; 
         let limit = Number(req.query.limit) || 10000;

         let skip = (page - 1)*limit;
        let books = await BookModel.find().where({ 
            ...(query.title && {"title": query?.title}),
            ...(query.genre && {"genre": query?.genre}),
            ...(query.author && {"author": query?.author}),
            ...(query.available && (query.available == "true" ? {"stock" : {$gt: 0}} : {"stock" : 0}))
        }).limit(limit).skip(skip)
       
        res.status(200).json({books: books, query: query})

    }catch(err){
        res.status(500).json({message: err.message})
    }
})




router.get('/books/:id', async (req, res) => {
    try{
        let book = await BookModel.findById(req.params.id)
        res.status(200).json(book)
    }catch(err){
        res.status(404).json({message: `Book With Id ${req.params.id} is not found`})
    }
})

// To Create a new book (accesibble to admin users)

router.post('/books', userAuth,  checkRole(['admin']), validator('bookSchema') , async (req, res) => {
  
    const newBook = new BookModel({ 
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        price: req.body.price,
        stock: req.body.stock
    })

    try{
        const saveData = await newBook.save()
        res.status(200).json({data:saveData, message: 'Book data created successfully.' })
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

router.put('/books/:id', userAuth, checkRole(['admin']), async (req, res) => {
    let bookDetails = {}
    if(req.body.title) bookDetails.title = req.body.title
    if(req.body.author) bookDetails.author  = req.body.author
    if(req.body.genre) bookDetails.genre = req.body.genre
    if(req.body.price) bookDetails.price = req.body.price
    if(req.body.stock) bookDetails.stock = req.body.stock
    try{
        const updatedBook = await BookModel.findByIdAndUpdate(req.params.id,bookDetails, {returnOriginal : false})
        if(!updatedBook) return res.status(404).json({message: 'Book not found'}) 
        res.status(200).json({message: 'Book updated', newBook: updatedBook})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


router.delete('/books/:id', userAuth , checkRole(['admin']), async (req, res) => {
    try{
        let book = await BookModel.findByIdAndDelete(req.params.id)
        if(book)
        res.status(200).json({message: `Book with Id ${req.params.id} is successfully deleted`, book: book})
        else
        res.status(404).json({message: `Book with Id ${req.params.id} is not found`})
    }catch(err){
        res.status(404).json({message: `Book with Id ${req.params.id} is not found`})
    }
})

// Registration request

router.post('/auth/signup', validator('signUpSchema'), async (req, res) => {
    try{
        const validateEmail = async (email) => {
            let user = await UserModel.findOne({email: email})
            return !user
        }

        let emailNotRegistered = await validateEmail(req.body.email)
        if(!emailNotRegistered) res.status(400).json({message: `User with email ${req.body.email} is Already registered.`})


        // Encryption of password

        const password = await bcrypt.hash(req.body.password,12)

        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: password,
            role: req.body.role
        })

        await newUser.save()
        return res.status(200).json({message: "User added successfully!!"})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
})

router.post('/auth/login', validator('loginSchema') , async (req, res) => {
    try{
        console.log(req.body.email)
        let user = await UserModel.findOne({email : req.body.email})
        
        if(!user) return res.status(404).json({message: 'User Not Found'})

        let isPasswordValid = bcrypt.compareSync(req.body.password, user.password) 
        if(!isPasswordValid) return res.status(401).json({message: 'Invalid password'})
        if(req.body.role !== user.role) return res.status(401).json({message: 'Please check the entered details again!!!'})
        return res.status(200).json({message: 'Login Successfull!', userDetails: user})

    }catch(error){
        return res.status(500).json({message: "User not found"})
    }
})

router.post('/buybooks/:id',async(req,res) => { 
    
    try{ 
         let id = req.params.id
         let book = await BookModel.findById(id)
        if(book.stock == 0){
            return res.status(401).json({message:"Out of stock"})
        }
        req.body.amount = book.price
        let payment = await got.post("https://stoplight.io/mocks/skeps/book-store:master/12094368/misc/payment/process",{
            json: req.body

            
        }).json()
        console.log(payment.payment_id)
        const updatedBook = await BookModel.findByIdAndUpdate(id,{stock: book.stock-1}, {returnOriginal : false})
        res.status(200).json(payment)
        
        

    }catch(error){
        return res.status(500).json({message:error.message})
    }

})

module.exports  = router