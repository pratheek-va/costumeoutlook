const express = require("express");
const cartController = require("./../controllers/cartController");

const router = express.Router();

router.post("/add-to-cart", cartController.addToCart);
router.post("/delete-from-cart", cartController.deleteFromCart);

module.exports = router;
