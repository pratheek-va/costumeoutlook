const catchAsync = require("./../utils/catchAsync");
const key = require("../constants/key");
const Order = require("./../models/orderModel");
const User = require("./../models/userModel");

const crypto = require("crypto");
const shortid = require("shortid");
const Razorpay = require("razorpay");

let orders = [];
let userId;

exports.pay = catchAsync(async (req, res) => {
  const payment_capture = 1;
  let sum = 0;
  userId = res.locals.user._id;
  const deliveryCharge = 40;
  const order = req.body.order;

  const razorpay = new Razorpay({
    key_id: key.id,
    key_secret: key.secret,
  });

  const products = (await User.findOne({ _id: res.locals.user._id }))
    .checkoutItems;

  const currency = "INR";

  products.forEach((product) => {
    sum += product.amount;
    order.product = product;
    order.email = res.locals.user.email;
    orders.push(order);
  });

  const options = {
    amount: (sum + deliveryCharge) * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      keyId: key.id,
      id: response.id,
      email: res.locals.user.email,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.paymentVerification = catchAsync(async (req, res) => {
  const secret = "12345678";

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  const razorpayPaymentId = req.body.payload.payment.entity.id;

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    orders.forEach(async (order) => {
      order.paymentId = razorpayPaymentId;
      await Order.create(order);
    });

    await User.updateOne({ _id: userId }, { $set: { checkoutItems: [] } });

    orders = [];

    res.status(200).json({
      status: "sucess",
    });
  } else {
    res.status(400).json({
      status: "Failed",
    });

    orders = [];
  }
});
