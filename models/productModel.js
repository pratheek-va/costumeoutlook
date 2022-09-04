const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
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
    companyName: {
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
    slug: String,
    price: {
      type: Number,
      required: [true, "A product must have a name"],
    },
    sizes: Array,
    category: {
      type: String,
      required: [true, "A product must have a category"],
    },
    images: Array,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.companyName + " " + this.name, { lower: true });
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
