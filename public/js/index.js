import "@babel/polyfill";
import { login, logout } from "./login";
import { signup } from "./signup";
import { displayRazorPay } from "./payment";
import { addToCart, goToAddress, purchaseItem } from "./cart";
import { addProduct, deleteProduct } from "./product";
import { deleteFromCart } from "./cart";
import { showAlert } from "./alerts";

const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector(".form--signup");
const paymentButton = document.querySelector("#gform");
const addToCartButton = document.querySelector("#btn");
const buyNowButton = document.querySelector("#btn1");
const checkoutButton = document.querySelector(".checkout");
const deleteButtons = document.querySelectorAll(".delete");
const addProductButton = document.querySelector(".add-product");
const deleteProductButtons = document.querySelectorAll(".delete-product");
const logoutButton = document.querySelector(".logout");

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });

if (logoutButton)
  logoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    logout();
  });

if (signupForm)
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phoneNumber = document.querySelector("#phone").value;
    const password = document.querySelector("#password").value;
    signup(name, phoneNumber, email, password);
  });

if (paymentButton)
  paymentButton.addEventListener("submit", function (e) {
    e.preventDefault();
    const order = {
      name: document.querySelector("#name").value,
      phoneNumber: document.querySelector("#phone").value,
      address: document.querySelector("#address").value,
      state: document.querySelector("#state").value,
      zipcode: document.querySelector("#zipcode").value,
      city: document.querySelector("#city").value,
    };
    displayRazorPay(order);
  });

if (addToCartButton)
  addToCartButton.addEventListener("click", function (e) {
    let size = "";
    const inputs = document.querySelectorAll(".rb");
    inputs.forEach((input) => {
      if (input.checked == true) size = input.value;
    });

    if (size == "") {
      showAlert("failed", "Please provide your size");
      return;
    }

    const product = {
      id: document.querySelector(".product-id").textContent,
      name: document.querySelector(".py-2").textContent,
      companyName: document.querySelector("title").textContent.split(" | ")[0],
      amount: Number.parseInt(
        document.querySelector("#amount").textContent.slice(4)
      ),
      size: size,
      quantity: Number.parseInt(document.querySelector(".qty").value),
      image: document.querySelector(".d-block").getAttribute("src"),
    };
    addToCart(product);
  });

if (buyNowButton)
  buyNowButton.addEventListener("click", function (e) {
    e.preventDefault();
    let size = "";
    const inputs = document.querySelectorAll(".rb");
    inputs.forEach((input) => {
      if (input.checked == true) size = input.value;
    });

    if (size == "") {
      showAlert("failed", "Please provide your size");
      return;
    }

    const product = {
      name: document.querySelector(".py-2").textContent,
      companyName: document.querySelector("title").textContent.split(" | ")[0],
      amount: Number.parseInt(
        document.querySelector("#amount").textContent.slice(4)
      ),
      size: size,
      quantity: Number.parseInt(document.querySelector(".qty").value),
    };
    const products = [product];
    goToAddress(products);
  });

if (checkoutButton)
  checkoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    const products = [];
    const items = document.querySelectorAll(".product-cart");

    console.log(items);

    items.forEach((item) => {
      const product = {
        name: item.querySelector(".h6cart").textContent,
        companyName: item.querySelector(".paracart").textContent,
        quantity: Number.parseInt(item.querySelector("#quantity").value),
        amount: Number.parseInt(item.querySelector("#price").textContent),
        size: document.querySelector(".size"),
      };
      products.push(product);
    });
    goToAddress(products);
  });

if (deleteButtons)
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", function (e) {
      const target = e.target.parentNode.parentNode;
      const deleteId = target.querySelector(".product-id").textContent;
      deleteFromCart(deleteId);
    });
  });

if (addProductButton)
  addProductButton.addEventListener("submit", function (e) {
    e.preventDefault();
    const sizes = [];
    const images = [];
    const checkboxes = document.querySelectorAll("#check:checked");

    const imageFiles = document.querySelector("#image").files;

    for (const i in imageFiles) {
      if (i != "length") {
        console.log(i);
        const file = imageFiles[i];
        const reader = new FileReader();
        reader.onload = (function (theFile) {
          return function (e) {
            const binaryData = e.target.result;
            const base64String =
              `data:image/${theFile.name.split(".")[1]};base64,` +
              window.btoa(binaryData);
            images.push(base64String);
          };
        })(file);
        reader.readAsBinaryString(file);
      } else break;
    }
    for (let i = 0; i < checkboxes.length; i++) {
      sizes.push(checkboxes[i].value);
    }
    const companyName =
      document.querySelector("#category").textContent === "NEW"
        ? document.querySelector("#company-name").value
        : document.querySelector("#company-name").textContent;
    const product = {
      name: document.querySelector("#name").value,
      companyName,
      sizes,
      images: images,
      price: Number.parseInt(document.querySelector("#price").value),
      deprecatedPrice: Number.parseInt(document.querySelector("#dprice").value),
      category: document.querySelector("#category").textContent,
    };

    console.log(product);
    setTimeout(() => {
      addProduct(product);
    }, 2000);
  });

if (deleteProductButtons)
  deleteProductButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", function (e) {
      const target = e.target.parentNode.parentNode.parentNode;
      const id = target.querySelector(".product-id").textContent;
      deleteProduct(id);
    });
  });
