import axios from "axios";
import { showAlert } from "./alerts";

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
      showAlert("success", "Signed in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
