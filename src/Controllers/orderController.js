const Orders = require('../Models/orderModel');


exports.getOrderById = async (req, res) => {
  const {_id} = req.params
  try {
   const order = await Orders.findOne({_id}).populate({path:'user',select:'fName fullName lName email'}).exec()

  if(!order)
  return res.status(400).json({error:'Order not found'})

   res.status(200).json({msg:order})

  } catch (error) {
    res.status(500).json({error:error.message})
  }
  
  
};

exports.updateOrderToPaid = async (req, res) => {
  const {_id} = req.params
  try {
   const order = await Orders.findOne({_id}).populate({path:'user',select:'fName fullName lName email'}).exec()

  if(!order)
  return res.status(400).json({error:'Order not found'})
  
  order.isPaid=true
  order.paidAt=new Date.now()
  order.paymentResult={
    id:req.body.id,
    status:req.body.status,
    upadte_time:req.body.update_time,
    email_address:req.body.email_address
  }

  const updatedOrder=await order.save()

   res.status(200).json({msg:updatedOrder})

  } catch (error) {
    res.status(500).json({error:error.message})
  }
  
  
};

exports.addOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    if(orderItems && orderItems.length===0)
    return res.status(400).json({error:'No order items'})

   const newOrder = Orders({
    user:req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
   }) 

   await newOrder.save()

   res.status(200).json({msg:newOrder})

  } catch (error) {
    res.status(500).json({error:error.message})
  }
  
  
};
