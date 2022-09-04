import axios from "axios";
import { showAlert } from "./alerts";

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
      showAlert("success", "Added to cart successfully");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
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
    showAlert("error", err.response.data.message);
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
    showAlert("error", err.response.data.message);
  }
};
