import axios from "axios";
import toastr from "toastr";

toastr.options.closeMethod = "fadeOut";
toastr.options.closeDuration = 2000;
toastr.options.closeEasing = "swing";

export const addToCart = async (product) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/cart/add-to-cart",
      data: {
        product,
      },
    });

    if (res.data.status === "success") {
      toastr.success("Added to cart successfully", "success");
    }
  } catch (err) {
    toastr.error(err.response.data.message, "Error");
  }
};

export const deleteFromCart = async (id) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/cart/delete-from-cart",
      data: {
        id,
      },
    });

    if (res.data.status === "success") {
      window.location.href = "/cart";
    }
  } catch (err) {
    toastr.error(err.response.data.message, "error");
  }
};

export const goToAddress = async (products) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/purchase/address",
      data: {
        cart: products,
      },
    });

    if (res.data.status === "success") {
      window.location.href = `/address/${res.data.token}`;
    }
  } catch (err) {
    toastr.error(err.response.data.message, "error");
  }
};
