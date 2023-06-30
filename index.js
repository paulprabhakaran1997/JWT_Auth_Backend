const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Mongo DB Connected...!!!")).catch(err => console.log(err))

// Routes

app.use('/auth',authRoutes);


app.listen(process.env.PORT,() =>{
    console.log("Server Running...!")
})