require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const { log } = require('console');

const dbURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../public')));

mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error("Could not connect to MongoDB...",err));


const userSchema = new mongoose.Schema({
    username: String,
    email:String,
    password:String
});

const User = mongoose.model("User",userSchema);

app.post('/register',async(req,res)=>{
    const { username, email, password} = req.body;
    try{
       const user = new User({ username, email, password});
       await user.save();
       res.status(200).send("User registered successfully!"); 
    } catch(err) {
        res.status(400).send('Error:' + err.message);
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})