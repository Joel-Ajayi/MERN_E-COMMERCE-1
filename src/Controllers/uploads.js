const cloudinary = require('cloudinary');
const fs = require('fs');
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
const Products = require('../Models/productModel');

// configure cloudinary
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
  });

exports.uploadProductImage = async (req,res) =>{
    try{
        const file = req.file;
        const {_id} = req.params
       
        const product = await Products.findOne({_id})

       if(_id){
        if(!product){
          return res.status(404).json({ error: "Product does not exist" });
        }
       }
  
        if (!file) {
            return res.status(400).json({ error: 'No product Image was uploaded' });
          }
    
          cloudinary.v2.uploader.upload(
            file.path,
            {
              folder: 'Product'
            },
            async (err, result) => {
              try {
                if (err) {
                  removeTmp(file.path);
                  throw err;
                }
                removeTmp(file.path);

                if(product){
                  product.image={public_id:result.public_id,url:result.secure_url}
                  product.save()
                }
                  
                res.status(200).json({msg:{public_id:result.public_id,url:result.secure_url}})

              } catch (err) {
                return res.status(500).json({
                  error: err.message,
                });
              }
            }
          );
    }catch(error){
        return res.status(500).json({
            error: error.message,
          });
    }
    
}

exports.destroyProductImage= async (req,res)=>{
    try {
        const {public_id} = req.body
        if (!public_id) return res.status(400).json({ error: 'No product Image was selected' });

          cloudinary.v2.uploader.destroy(
            public_id,
            async (err, result) => {
                if (err) throw err;

                res.status(200).json({msg:'Image Deleted'})
              }
          );
        
    } catch (error) {
        return res.status(500).json({
            error: error.message,
          });
    }
   

}

const removeTmp = (path) => {
  fs.unlinkSync(path, (err) => {
    if (err) throw new Error();
  });
};