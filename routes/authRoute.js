const express = require("express");

// SIGN UP
const {signupController} = require("../controllers/signupController");

// LOGIN
const {loginController} = require("../controllers/loginController");
//const { requireSignIn } = require("../middlewares/authMiddleware");

// FORGET-PASSWORD
const {forgetPasswordController} = require("../controllers/forgetPasswordController");
const {resetPasswordVerified} = require("../controllers/resetPasswordVerified");
const {updatePassword} = require("../controllers/updatePassword");
const {ChangePassword} = require("../controllers/ChangePassword");

// UPDATE ADDRESS
const {updateAddress} = require("../controllers/updateAddress");

// UPDATE USER DETAILS
const {updateUserDetails} = require("../controllers/updateUserDetails");

//PAYMENT CHECKOUT
const {PaymentController, paymentVerification} = require("../controllers/PaymentController");

// ORDER GET DETAILS
const {OrderControllers} = require("../controllers/OrderControllers");

// ORDER DELETE
const {orderDelete} = require("../controllers/orderDelete");

// Favouite Restaurents
const { FavouriteRestaurents } = require("../controllers/FavouriteRestaurents");
const {getFavrioteController} = require("../controllers/getFavrioteController");
const {FavDelete} = require("../controllers/FavDelete");

const {requireSignIn} = require("../middlewares/authMiddleware");

// using express's Router for routing the requests
const router = express.Router();

// ===================================== creating the endpoints =====================================

// 1.) ========== SIGN UP ==========
router.post('/signup', signupController)

// 2.) ========== LOG IN ==========
router.post('/login', loginController)

// 3.) ========== FORGET PASSWORD ==========
router.post('/forget-password', forgetPasswordController)

router.get('/reset-password2/:id/:token', resetPasswordVerified)

router.post('/reset-password/:id/:token', updatePassword)

router.post('/change-password/:id', requireSignIn, ChangePassword);

// 4.) ========== CHANGE ADDRESS ==========
router.put('/change-address/:id', requireSignIn, updateAddress)

// 5.) ========== CHANGE USER DETAILS ==========
router.put('/update-user/:id', requireSignIn, updateUserDetails)

// 6.) ========== PAYMENT CHECKOUT ==========
router.post('/payment-checkout', requireSignIn, PaymentController)

router.post('/paymentverification/:email', requireSignIn, paymentVerification)

// 7.) ========== ORDER DETAILS ==========
router.get('/orders/:email', requireSignIn, OrderControllers)

// 8.) ========== ORDER DELETE ==========
router.get('/deleteOrders/:id', requireSignIn, orderDelete)

// 9.) ========== FAVRIOTE RESTAURENTS ==========

// database store
router.post('/favRestaurent/:email', requireSignIn, FavouriteRestaurents)
// get favriotes restaurents (user)
router.get('/favItems/:email', requireSignIn, getFavrioteController)
// delete favriotes restaurents (user)
router.get('/deleteFavriotes/:id', requireSignIn, FavDelete);

router.post('/payNow', requireSignIn, (req, res)=>{
    console.log("FETCH")
    return res.status(200).send({
        success : true,
        message : "Fetched!"
    }) 
})



module.exports = { router };