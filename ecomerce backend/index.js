const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
let products = require('./models/productsmodel')
let users = require('./models/usermodel')
let mail = require('../utils/gmail')
const secretkey = process.env.JWT_SECRET_KEY || 'charansecretkey'


const app = express()
const port = 3000

const mongoURI = 'mongodb+srv://annepuvishal89_db_user:Vishal%402005@cluster0.9ijxzfm.mongodb.net/?appName=Cluster0'

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...')
        await mongoose.connect(mongoURI)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        throw error
    }
}

// middlewares
app.use(cors())
app.use(express.json())
app.get('/products', async (req, res) => {
    try {
        let allproducts = await products.find()
        res.status(200).json(allproducts)
    } catch (error) {
        res.json({ msg: error.message })
    }
})

app.post('/products', async (req, res) => {
    try {
        await products.create(req.body)
        res.status(201).json({ msg: "Product saved successfully" })
    } catch (error) {
        res.json({ msg: error.message })
    }
})

app.post('/bulkproducts', async (req, res) => {
    try {
        await products.insertMany(req.body)
        res.status(201).json({ msg: "Products are saved successfully" })
    } catch (error) {
        res.json({ msg: error.message })
    }
})

app.put('/products/:id', async (req, res) => {
    try {
        await products.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({ msg: "Product is updated successfully" })
    } catch (error) {
        res.json({ msg: error.message })
    }
})

app.delete('/products/:id', async (req, res) => {
    try {
        await products.findByIdAndDelete(req.params.id)
        res.status(201).json({ msg: "Product is deleted successfully" })
    } catch (error) {
        res.json({ msg: error.message })
    }
})

// Registration
app.post('/register', async (req, res) => {
    try {
        const { username, password, email, role } = req.body
        if (!username || !password || !email || !role) {
            return res.json({ msg: "Missing Fields" })
        }
        // check the user already exist or not
        let checkuser = await users.findOne({ username })
        if (checkuser) return res.json({ msg: "User already exists" })
        // hash the password
        let hashpassword = await bcrypt.hash(password, 10)
        await users.create({ username, password: hashpassword, email, role })
        // generate a json web token
        // payload,secretkey,expiry date
        let payload = { username: username, emailaddress: email, role: role }
        let token = jwt.sign(payload, secretkey, { expiresIn: '1hr' })

        // Email sending is best-effort (shouldn't break registration)
        try {
            await mail(email, username)
        } catch (mailErr) {
            console.error('Mail send failed:', mailErr.message)
        }

        res.status(200).json({ msg: "Registration successful", token })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`Server is running on ${port}`)
        })
    } catch (error) {
        console.error('Failed to connect to database:', error.message)
        process.exit(1)
    }
}

startServer()

app.post('/login', async (req, res) => {
    try{
        const {username,password}=req.body
        if(!username||!password) return res.json({"msg":"missing fields"})
        let checkuser=await users.findOne({username})
        if(!checkuser) return res.status(403).json({"msg":"user not found"})
        let ishashverified=await bcrypt.compare(password,checkuser.password)
        if(!ishashverified) return res.status(403).json({"msg":"username or password is empty"})
        let payload = { username: username, emailaddress: checkuser.email, role: checkuser.role }
        let token = jwt.sign(payload, secretkey, { expiresIn: '1hr' })
        res.status(200).json({ msg: "Login successful", token })
        
    }catch(error){
        res.status(500).json({ msg: error.message })
    }
})
