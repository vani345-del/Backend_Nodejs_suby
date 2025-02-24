const mongoose=require ('mongoose');

const productSchema=new mongoose.Schema({
      productName:{
        type:String,
        require:true
      },
      price:{
        type:String,
        required:true
      },
      category:{
        type:[{
            type:String,
            required:true
       }]
      },
      image:{
        type:String,
      },
      bestSeller:{
        type:Boolean
      },
      description:{
        type:String
      },
      firm:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:'Firm'
        }
    ]
});

const Product=mongoose.model('Product',productSchema);
module.exports=Product