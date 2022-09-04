const mongoose = require("mongoose");
const slugify = require("slugify");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
      maxlength: [
        40,
        "A product name must have less or equal then 40 characters",
      ],
      minlength: [
        6,
        "A product name must have more or equal then 10 characters",
      ],
    },
    email: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
      maxlength: [
        40,
        "A product name must have less or equal then 40 characters",
      ],
      minlength: [
        6,
        "A product name must have more or equal then 10 characters",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
      maxlength: [
        10,
        "A product name must have less or equal then 40 characters",
      ],
      minlength: [
        10,
        "A product name must have more or equal then 10 characters",
      ],
    },
    product: Object,
    address: String,
    city: String,
    state: String,
    zipcode: String,
    paymentId: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
