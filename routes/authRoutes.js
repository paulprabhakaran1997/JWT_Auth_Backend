const express = require('express');
const authRoutes = express.Router();
const User = require('../models/UserModel');
const Product = require("../models/Productmodel");
const { hashGenerate, hashValidator } = require("../helpers/hashing");
const { tokenGenerator } = require('../helpers/token');
const authVerify = require('../helpers/authVerify')

authRoutes.post('/signup', async (req, res) => {
    try {
        console.log("Inside Signup")
        const existingUser = await User.findOne({ email: (req.body.email).toLowerCase() });
        if (existingUser) {
            res.status(409).json({ type: 'error', message: `Email ${req.body.email} already Exists` })
        } else {
            const hashPassword = await hashGenerate(req.body.password)

            const user = new User({
                username: req.body.username,
                email: (req.body.email).toLowerCase(),
                password: hashPassword
            });
            const savedUser = await user.save();
            res.status(200).json(savedUser);
        }

    } catch (error) {
        res.status(400).json(error)
    }
});

authRoutes.post('/login', async (req, res) => {
    try {
        console.log("REQ.BODY.Email = ", req.body.email)
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            res.status(400).json({ type: 'error', message: 'Invalid Email' })
        } else {
            const checkPassword = await hashValidator(req.body.password, existingUser.password);
            if (!checkPassword) {
                res.status(400).json({ type: 'error', message: 'Invalid Password' })
            } else {
                const token = tokenGenerator(existingUser.email);
                // res.cookie("jwt", token, { httpOnly: true })
                res.status(200).json({ type: 'success', message: 'Login successful', username: existingUser.username, token: token })
            }
        }
    } catch (error) {
        res.status(400).json(error)
    }
});

authRoutes.post('/api/addProduct', authVerify, async (req, res) => {
    try {
        const id = req.body.id
        console.log("Prod Id = ", id);

        if (id === '0') {
            const product = new Product({
                name: req.body.name,
                price: req.body.price
            })
            const savedProduct = await product.save();
            res.status(200).json({type : 'success' , message : `Product ${id === '0' ? 'Added' : 'Updated'} Successfully` , data : savedProduct})
        } else {
            const savedProduct = await Product.findByIdAndUpdate(id , {
                $set : {
                    name: req.body.name,
                    price: req.body.price
                }
            },{new : true})
            res.status(200).json({type : 'success' , message : `Product ${id === '0' ? 'Added' : 'Updated'} Successfully` , data : savedProduct})
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
});


authRoutes.get('/api/getProducts', authVerify, async (req, res) => {
    try {
        const product = await Product.find();
        console.log("Products = ", product);
        res.status(200).json({ type: 'success', data: product })
    } catch (error) {
        res.status(400).json(error)
    }
})

authRoutes.delete('/api/deleteProducts/:id', authVerify, async (req, res) => {
    try {
        console.log("Inside Del Req");
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ type: 'success', message : 'Product Deleted Successfully' })
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = authRoutes;