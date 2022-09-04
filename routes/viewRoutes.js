const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/", viewsController.getOverview);
router.get("/tshirt/:slug", viewsController.getProduct("TSHIRT"));
router.get("/shirt/:slug", viewsController.getProduct("SHIRT"));
router.get("/pant/:slug", viewsController.getProduct("PANT"));
router.get("/cap/:slug", viewsController.getProduct("CAP"));

router.get("/admin/login", viewsController.adminLogin);
router.get(
  "/admin/panel",
  authController.restrictTo("admin"),
  viewsController.adminPage
);
router.get("/admin/add-product/:brand", viewsController.addProduct);
router.get("/admin/delete-product", viewsController.deleteProduct);
router.get("/admin/orders", viewsController.getOrders);
router.get("/admin/view-product", viewsController.getViewProducts);

router.get("/tshirts/:brand", viewsController.getProducts("Tshirts", "TSHIRT"));

router.get(
  "/address/:token",
  authController.protect,
  viewsController.getAddressForm
);
router.post("/thankyou", viewsController.getThankYouPage);
router.get("/shop", viewsController.getAllProducts);
router.get("/cart", authController.protect, viewsController.getCart);
router.get("/signup", viewsController.getSignupForm);
router.get("/login", viewsController.getLoginForm);

module.exports = router;
