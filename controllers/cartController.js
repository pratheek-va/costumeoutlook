const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const mongoose = require("mongoose");

exports.addToCart = catchAsync(async (req, res, next) => {
  await User.updateOne(
    { _id: res.locals.user._id },
    { $push: { cart: req.body.product } }
  );

  res.status(201).json({
    status: "success",
  });
});

exports.deleteFromCart = catchAsync(async (req, res, next) => {
  const cart = [];

  const cartProducts = (
    await User.findOneAndUpdate({ _id: res.locals.user._id })
  ).cart;

  let deleted = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id == req.body.id && deleted == 0) {
      deleted = 1;
      continue;
    }
    cart.push(cartProducts[i]);
  }
  await User.findOneAndUpdate(
    { _id: res.locals.user._id },
    { $set: { cart: cart } }
  );

  res.status(200).json({
    status: "success",
  });
});
