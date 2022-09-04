const express = require("express");
const paymentController = require("./../controllers/paymentController");

const router = express.Router();

router.post("/razorpay", paymentController.pay);
router.post("/verification", paymentController.paymentVerification);

module.exports = router;
