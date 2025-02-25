const Vendor=require('../models/Vendor');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotEnv=require('dotenv')

dotEnv.config();

const secretKey=process.env.whatIsYourName;

const vendorRegister=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const vendorEmail=await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("Email.already exists");
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const newVendor=new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save();
        res.status(201).json({message:"Vendor resgistered successfully"})
        console.log('registed');

    }catch(error){
       console.error(error);
       res.stauts(500).json({error:"internal server issue"})
    }

}


const vendorLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
          const vendor=await Vendor.findOne({email});
          if(!vendor||!(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"Invalid username or password"})
          }
          const token=jwt.sign({vendorId:vendor._id },secretKey,{expiresIn:"1h"})
          
          const vendorId=vendor._id;



          res.status(200).json({success:"Login Successful",token,vendorId})
          console.log(email,"this is a token",token)
          
    }
    catch(error){
       console.log(error);
       res.status(500).json({error:"internal server error"});
    }
}

const getAllVendors=async(req,res)=>{
    try{
        const vendors=await Vendor.find().populate('firm');
        res.json({vendors})

    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"internal server error"});
    }
}

const getVendorById=async(req,res)=>{
    const vendorId=req.params.id;
    try{
        const vendor=await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({error:"Vendor not found"})
        }
        const vendorFirmId=vendor.firm[0]._id;
        res.status(200).json({vendorId,vendorFirmId,vendor})
        console.log(vendorFirmId)
    }catch(error){
        console.log(error);
        res.status(500).json({error:"invalid server error"});
    }
}


module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}