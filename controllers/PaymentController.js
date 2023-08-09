const Orders = require("../models/userOrder"); 
require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const PaymentController = async(req, res)=>{

    try{

        const {totalamt, GST, Delivery} = req.body;
        const paynow = totalamt + GST + Delivery;

        var instance = new Razorpay({ 
            key_id: process.env.RAZORPAY_ID_KEY, 
            key_secret: process.env.RAZORPAY_SECRET_KEY
         })

        var options = {
            amount: Number(paynow*100),  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };

        instance.orders.create(options, function(err, order) {
            res.status(200).send({
                success: true,
                data:order,
              });
        }); 

    }
    catch(err){
        console.log(err);
        return res.status(200).send({
            success: false,
            message: "Something went Wrong!"
        })
    }

}

const paymentVerification = async(req, res)=>{
 
  // Total Amount ----------
  const pay = req.body.totalamt + req.body.GST + req.body.Delivery;

  // User ID ------------
  const email = req.params.email;

  // Orders Food Items --------------
  const items = req.body.foodsItem;
  
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    
    // orders Item saved into database-------------
    const data = await new Orders({
      emailID: email,
      orderID: razorpay_order_id,
      paymentID: razorpay_payment_id,
      payments: pay,
      ordersItem: items
      }).save()

    res.status(200).send({
        success: true,
        message:"Your Order is now Placed !"
    })
    
  } else {
    res.status(200).json({
      success: false,
      message:"Your Order is not Placed !"
    });
  }
}
 

module.exports = {PaymentController, paymentVerification};