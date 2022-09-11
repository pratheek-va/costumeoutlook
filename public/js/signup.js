import axios from "axios";
import toastr from "toastr";

toastr.options.closeDuration = 2000;
toastr.options.closeEasing = "swing";

export const signup = async (name, phoneNumber, email, password) => {
  console.log(name, phoneNumber, email, password);
  try {
    const res = await axios.post("/api/v1/users/signup", {
      name,
      phoneNumber,
      email,
      password,
    });

    if (res.data.status === "success") {
      toastr.success("Signed in successfully!", "success");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    toastr.error(err.response.data.message, "error");
  }
};
