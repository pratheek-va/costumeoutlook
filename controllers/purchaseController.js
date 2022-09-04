const cryptr = require("cryptr");

const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.setProductsToBuy = catchAsync(async (req, res, next) => {
  console.log(req.body.cart);
  await User.updateOne(
    { _id: res.locals.user._id },
    { $set: { checkoutItems: req.body.cart } }
  );
  const c = new cryptr("myTotallySecretKey");
  const encryptedString = c.encrypt(JSON.stringify(req.body.cart));
  res.status(200).json({
    status: "success",
    token: encryptedString,
  });
});
