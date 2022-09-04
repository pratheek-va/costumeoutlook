import axios from "axios";

export const displayRazorPay = async (order) => {
  const res = await axios.post("/payment/razorpay", {
    order,
  });

  const data = res.data;

  var options = {
    key: data.keyId,
    amount: data.amount,
    currency: data.currency,
    name: order.name,
    description: "Test Transaction",
    image: "/img/New Project - Copy.jpg",
    order_id: data.id,
    callback_url: "http://127.0.0.1:8000/thankyou",

    prefill: {
      name: order.name,
      email: data.email,
      contact: order.phoneNumber,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  var rzp1 = new window.Razorpay(options);

  rzp1.open();
};
