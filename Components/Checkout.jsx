import React, { useEffect, useState } from "react";
import { Home, ChevronRight, ShoppingCart } from "lucide-react";

const steps = ["Personal Information", "Payment Method", "Confirmation"];
import { useNavigate } from "react-router-dom";
export function Checkout(props) {
  const navigate = useNavigate();
  function movetocart() {
    navigate("/user/cart");
  }
  const [user, setuser] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
    });
    fetch("https://mern-backend-ecommerce-eight.vercel.app/userInfo2", {
      headers: headers,
    }).then(function (response) {
      if (response.status == 200) {
        response.json().then(function (data) {
          setuser(data.user);
        });
      }
    });
  }, []);
  /////to create razorpay order
  ///creating the razorpay order
  function handleFinalPayment(data) {
    var options = {
      key: "rzp_test_PlxVDRwT83pnDt", // Enter the Key ID generated from the Dashboard
      amount: Number(data.amount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Electronics",
      description: "Test Transaction",
      image: "../Assets/lion_616412.png",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      theme: {
        color: "#EE2B2B",
      },
    };
    var rzp = new window.Razorpay(options);
    rzp.open();
  }
  function createOrder(totalAmount) {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json",
    });
    if (totalAmount > 0) {
      fetch("https://mern-backend-ecommerce-eight.vercel.app/createOrder", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ totalAmount: totalAmount }),
      }).then(function (response) {
        if (response.status == 200) {
          response.json().then(function (data) {
            console.log(data.order);
            handleFinalPayment(data.order);
          });
        }
      });
    }
  }
  return (
    <div className="flex justify-center items-center w-[100] bg-mainBody">
      <div className="mx-auto w-full max-w-7xl bg-mainBoxes rounded-2xl py-2">
        <div className="mx-auto my-4 max-w-2xl md:my-6">
          {/* Form */}
          <div className="overflow-hidden rounded-xl bg-lightblue p-4 shadow">
            <div className="mb-4 flex items-center rounded-lg py-2">
              <div className="mr-2 rounded-full bg-gray-100  p-2 text-black">
                <ShoppingCart size={20} />
              </div>
              <div className="flex flex-1">
                <p className="text-sm font-medium">
                  Your sub total is{" "}
                  <strong id="netvalue">₹{props.finalPrice}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={movetocart}
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                View Items
              </button>
            </div>
            <p className="text-sm font-bold text-gray-900">Personal Info</p>
            <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  id="firstName"
                  placeholder="Enter your first name"
                ></input>
              </div>

              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your last name"
                  id="lastName"
                ></input>
              </div>
              <div className="col-span-2 grid">
                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <span
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                  >
                    {user.email}
                  </span>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-900">
                  Payment details
                </h3>

                <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                  <div className="col-span-3 sm:col-span-4">
                    <label
                      htmlFor="cardNum"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card number
                    </label>
                    <div className="mt-1">
                      <input
                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="1234 5678 1234 5678"
                        id="cardNum"
                      ></input>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-3">
                    <label
                      htmlFor="expiration-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="expiration-date"
                        id="expiration-date"
                        autoComplete="cc-exp"
                        className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVV
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="cvc"
                        id="cvc"
                        autoComplete="csc"
                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-lighblue ">
                <img src="../Assets/gojo.jpg" className="rounded-xl" />
              </div>
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-900">
                  Shipping address
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        autoComplete="street-address"
                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postal-code"
                        name="postal-code"
                        autoComplete="postal-code"
                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 grid">
                <button
                  type="button"
                  onClick={createOrder}
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
