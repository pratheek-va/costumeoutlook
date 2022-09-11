import axios from "axios";
import toastr from "toastr";

toastr.options.closeMethod = "fadeOut";
toastr.options.closeDuration = 2000;
toastr.options.closeEasing = "swing";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      toastr.success("Logged In sucessfully", "success");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    toastr.error(err.response.data.message, "Error");
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if (res.data.status == "success") location.href = "/";
  } catch (err) {
    console.log(err.response);
    toastr.error("Error logging out! Try again.", "error");
  }
};
