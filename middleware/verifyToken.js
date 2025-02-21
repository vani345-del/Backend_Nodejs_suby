const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
require("dotenv").config()

const secreteKey=process.env.whatIsYourName;

const verifyToken=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(401).json({error:"Token is required"});

    }
    try{
        const decoded=jwt.verify(token,secreteKey)
        console.log(decoded);
        const vendor=await Vendor.findById(decoded.vendorId);
        console.log(vendor);
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        req.vendorId=vendor._id
        next()

    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Invalid token"});
    }
}
module.exports=verifyToken