const express = require("express");
const purchaseController = require("./../controllers/purchaseController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.post("/address", purchaseController.setProductsToBuy);

module.exports = router;
