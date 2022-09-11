import axios from "axios";
import toastr from "toastr";

toastr.options.closeMethod = "fadeOut";
toastr.options.closeDuration = 2000;
toastr.options.closeEasing = "swing";

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
      document.querySelector(".upload").textContent = "Upload";
      toastr.success("Added to cart successfully", "success");
    }
  } catch (err) {
    document.querySelector(".upload").textContent = "Upload";
    toastr.error(err.response.data.message, "error");
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
    toastr.error(err.res.data.message, "error");
  }
};
