const Product=require('../models/Product');
const multer=require('multer')
const Firm=require('../models/Firm')
const path=require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload=multer({storage:storage});

const addProduct=async(req,res)=>{
    try {
           const {productName,price,category,bestseller,description}=req.body;
           const image=req.file? req.file.filename:undefined;

           const firmId=req.params.firmId;
           const firm=await Firm.findById(firmId);

           if(!firm){
            return res.status(404).json({error:"no firm found"});
           }
           const product=new Product({
            productName,price,category,bestseller,description,image,firm:firm._id
           })
           const savedProduct=await product.save();

           firm.product.push(savedProduct);
           await firm.save();
           res.status(200).json(savedProduct)


    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal issue"})
    }
}


const getProductByFirm=async(req,res)=>{
    try {
        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId);
        
          if(!firm){
            return res.status(404).json({error:"NO firm founud"});
          }
          const retaurantName=firm.firmName;
          const products=await Product.find({firm:firmId});
          res.status(200).json({retaurantName,products});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
    
}

const deleteProductById=async(req,res)=>{
    try {
        const productId=req.params.productId;
        const deleteProduct=await Product.findByIdAndDelete(productId);
        if(!deleteProduct){
            return res.status(404).json({error:"No product found"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
        
    }
}

module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById}