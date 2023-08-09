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

router.post('/change-password/:id', ChangePassword);

// 4.) ========== CHANGE ADDRESS ==========
router.put('/change-address/:id', updateAddress)

// 5.) ========== CHANGE USER DETAILS ==========
router.put('/update-user/:id', updateUserDetails)

// 6.) ========== PAYMENT CHECKOUT ==========
router.post('/payment-checkout', PaymentController)

router.post('/paymentverification/:email', paymentVerification)

// 7.) ========== ORDER DETAILS ==========
router.get('/orders/:email', OrderControllers)

// 8.) ========== ORDER DELETE ==========
router.get('/deleteOrders/:id', orderDelete)

// 9.) ========== FAVRIOTE RESTAURENTS ==========

// database store
router.post('/favRestaurent/:email', FavouriteRestaurents)
// get favriotes restaurents (user)
router.get('/favItems/:email', getFavrioteController)
// delete favriotes restaurents (user)
router.get('/deleteFavriotes/:id', FavDelete);



module.exports = { router };