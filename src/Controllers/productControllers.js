const Products = require('../Models/productModel');
const cloudinary = require('cloudinary');
const fs = require('fs');
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

exports.getAllProducts = async (req, res) => {
  try {
    const products= await Products.find({})
    res.status(200).json({msg:products});
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const {_id} = req.params
    const product = await Products.findOne({_id})
    res.status(200).json({msg:product});
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// configure cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

exports.createProduct = async (req, res) => {
  try {
    const file = req.file;
    const {
      name,
      description,
      brand,
      category,
      price,
      countInStock,
      rating,
      numReviews,
    } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No product Image was uploaded' });
    }

    if (
      !name ||
      !description ||
      !brand ||
      !category ||
      !price ||
      !countInStock ||
      !rating ||
      !numReviews
    ) {
      return res.status(400).json({ error: 'Please fill out all fields' });
    }

    let productForm = {
      user: req.user._id,
      name,
      description,
      brand,
      category,
      price:Number(price),
      countInStock:Number(countInStock),
      rating:Number(rating),
      numReviews:Number(numReviews),
    };

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
          productForm.image = result.secure_url;
          const newProduct = new Products(productForm);
          await newProduct.save();
          res.json({ msg: 'Product created Successfully' });
        } catch (err) {
          return res.status(500).json({
            error: err,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const removeTmp = (path) => {
  fs.unlinkSync(path, (err) => {
    if (err) throw new Error();
  });
};
