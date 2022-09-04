import axios from "axios";
import { showAlert } from "./alerts";

export const addProduct = async (product) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/products",
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

export const deleteProduct = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/v1/products/${id}`,
    });
    console.log(res);
    if (res.statusText === "No Content") {
      window.location.href = "/admin/view-product";
    }
  } catch (err) {
    showAlert("error", err);
  }
};
