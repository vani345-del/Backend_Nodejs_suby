const vendorContoller=require('../controllers/vendorController');
const express=require('express');
const router=express.Router();

router.post('/register',vendorContoller.vendorRegister);
router.post('/login',vendorContoller.vendorLogin);
router.get('/all-vendors',vendorContoller.getAllVendors);
router.get('/single-vendor/:id',vendorContoller.getVendorById);
module.exports=router;