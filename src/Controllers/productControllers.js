const Products = require('../Models/productModel');


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

exports.deleteProduct = async (req,res) =>{
  try {
    const { _id } = req.params;
    if (!_id)
      return res.status(400).json({ error: "No identity was provided" });

    await Products.findByIdAndDelete(_id);
    res.json({ msg: "Product deleted" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

exports.updateProduct = async (req,res) =>{
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      countInStock,
    } = req.body;
  
    const {_id} = req.params
    const product = await Products.findOne({_id})
  
    if(!product)
     return res.status(404).json({ error: "Product does not exist" });
  
     product.name=name
     product.description=description
     product.brand=brand
     product.category=category
     product.countInStock=countInStock
     product.price=price
  
     await product.save()
  
     res.status(200).json({msg:'Product updated'})
  
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
  
}

exports.createProduct = async (req, res) => {
  try {
    
    const {
      name,
      description,
      brand,
      category,
      price,
      countInStock,
      image
    } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No product Image was uploaded' });
    }

    if (
      !name ||
      !description ||
      !brand ||
      !category ||
      !price ||
      !countInStock 
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
      image
    };

      const newProduct = new Products(productForm);
      await newProduct.save();
      res.json({ msg: 'Product created Successfully' });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.updateReviews = async (req,res) =>{
  try {
    const {
      rating, comment
    } = req.body;
  
    const {_id} = req.params
    const product = await Products.findOne({_id})
  
    if(!product)
     return res.status(404).json({ error: "Product does not exist" });
     
    const reviewedAlready = product.reviews.find(r=>r.user.toString() === req.user._id.toString())
    if(reviewedAlready)
      return res.status(400).json({ error: "Product already reviewed" });
     
    const review={
      name:`${req.user.fName} ${req.user.lName}`,
      rating:Number(rating),
      comment,
      image:req.user.avatar.url || '',
      user:req.user._id
    }  

    product.reviews=product.reviews.concat(review)
    product.numReviews=product.reviews.length 
    product.rating = Number(product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length).toFixed(1)

   await product.save()
  
    res.status(200).json({msg:'Review added'})
  
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
  
}


