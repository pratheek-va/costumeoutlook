const cryptr = require("cryptr");

const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

exports.getProducts = (categoryName, code) => {
  return catchAsync(async (req, res, next) => {
    const companyName = req.params.brand.split("-").join(" ").split(" ");
    let name = "";
    for (let i = 0; i < companyName.length; i++) {
      name += companyName[i][0].toUpperCase() + companyName[i].slice(1);
      name += " ";
    }
    const products = await Product.find({
      $and: [{ companyName: name }, { category: code }],
    });

    res.status(200).render("product", {
      title: categoryName,
      products,
    });
  });
};

exports.getOverview = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  const len = products.length;
  res.status(200).render("base", {
    products,
    len,
  });
});

exports.getThankYouPage = (req, res, next) => {
  res.status(200).render("thankyou");
};

exports.getCart = catchAsync(async (req, res, next) => {
  const cartProducts = (await User.findOne({ _id: res.locals.user._id })).cart;
  res.status(200).render("cart", {
    cartProducts,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).render("shop", {
    products,
  });
});

exports.getProduct = (category) => {
  return catchAsync(async (req, res, next) => {
    const product = await Product.findOne({
      category: category,
      slug: req.params.slug,
    });

    res.status(200).render("productDetails", {
      title: category.toLowerCase() + "s",
      product,
    });
  });
};

exports.getAddressForm = catchAsync(async (req, res, next) => {
  const c = new cryptr("myTotallySecretKey");
  const checkoutItems = (await User.findOne({ _id: res.locals.user._id }))
    .checkoutItems;
  try {
    const decryptedString = c.decrypt(req.params.token);
    if (JSON.stringify(checkoutItems) == decryptedString)
      res.status(200).render("address");
    else res.status(401).redirect("/");
  } catch (err) {
    res.status(401).redirect("/");
  }
});

exports.getSignupForm = (req, res, next) => {
  res.status(200).render("signup");
};

exports.getLoginForm = (req, res, next) => {
  res.status(200).render("login");
};

exports.adminLogin = (req, res, next) => {
  res.status(200).render("login");
};

exports.adminPage = (req, res, next) => {
  res.status(200).render("adminPage");
};

exports.addProduct = (req, res, next) => {
  res.status(200).render("adminAddProduct", {
    brand: req.params.brand,
  });
};

exports.deleteProduct = (req, res, next) => {
  res.status(200).render("adminDeleteProduct");
};

exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).render("orders", {
    orders,
  });
});

exports.getViewProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).render("viewProducts", {
    products,
  });
});
