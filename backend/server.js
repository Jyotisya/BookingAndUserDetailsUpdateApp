const express  = require("express");
const { mongo, default: mongoose } = require("mongoose");
require('dotenv').config()


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
//routes
app.use('/',require('./routes/UserDetails'))

mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            app.listen(PORT,()=>{
                console.log(`server running at ${PORT}`);
            })
        })
        .catch((err)=>console.log(err))