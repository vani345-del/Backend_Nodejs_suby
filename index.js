const express=require("express");

const mongoose=require('mongoose');
const vendorRouter=require('./routes/vendorRouts')
const bodyParser=require('body-parser');
const firmRouter=require('./routes/firmRouter')
const productRoutes=require("./routes/productRouter")
const cors=require('cors');
const path=require('path')




const app=express()
const PORT= process.env.PORT||4000;
console.log(PORT);
require("dotenv").config()
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo db connected successfully"))
.catch((error)=>console.log(error))


app.use(bodyParser.json());

app.use('/vendor',vendorRouter);

app.use('/firm',firmRouter);

app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));


app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`);
 });

 app.use('/',(req,res)=>{
    res.send("<h1>Wlcomw to suby</h1>");
})
