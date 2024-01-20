import { Heart, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { redirect, useNavigate } from "react-router-dom";
import Footer from "./Footer";
function Cart(props) {
  const navigate = useNavigate();
  const map = new Map();
  const [products, setproduct] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json",
    });
    if (token != null) {
      fetch("https://mern-backend-ecommerce-eight.vercel.app/getCartItems", {
        headers: headers,
      }).then(function (response) {
        response.json().then(function (data) {
          setproduct(data.user.cart);
        });
      });
    }
  }, []);
  let totalAmount = 0;
  let deliveryCharges = 0;
  function backtoHome() {
    navigate("/");
  }
  function removeFromCart(a, b) {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json",
    });
    if (token != null) {
      fetch("https://mern-backend-ecommerce-eight.vercel.app/removeFromCart", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          productName: a,
          productCompany: b,
        }),
      }).then(function (response) {
        if (response.status == 200) {
          response.json().then(function (data) {
            document.getElementById("cartDisp").innerHTML =
              data.user.cart.length;

            setproduct(data.user.cart);
          });
        }
      });
    }
  }
  function increaseCartElement(a) {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json",
    });
    fetch(
      "https://mern-backend-ecommerce-eight.vercel.app/increaseCartElement",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(a),
      }
    ).then(function (response) {
      if (response.status == 200) {
        response.json().then(function (data) {
          console.log(data.cart);
          setproduct(data.user.cart);
        });
      }
    });
  }
  function decreaseCartElement(a) {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json",
    });
    fetch(
      "https://mern-backend-ecommerce-eight.vercel.app/decreaseCartElement",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(a),
      }
    ).then(function (response) {
      if (response.status == 200) {
        response.json().then(function (data) {
          console.log(data.cart);
          setproduct(data.user.cart);
        });
      }
    });
  }

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
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        console.log("hello", response);
        const headers = new Headers({
          "Content-Type": "application/json",
        });
        fetch(
          "https://mern-backend-ecommerce-eight.vercel.app/api/payment/verify",
          {
            headers: headers,
            method: "POST",
            body: JSON.stringify({ response }),
          }
        ).then(function (respo) {
          respo.json().then(function (data) {
            console.log(data);
            ///setpurchasedProduct
            const token = localStorage.getItem("token");
            const headers = new Headers({
              authorization: token,
              "Content-Type": "application/json",
            });
            fetch(
              "https://mern-backend-ecommerce-eight.vercel.app/setpurchasedProduct",
              {
                method: "POST",
                headers: headers,
              }
            ).then(function (response) {
              if (response.status == 200) {
                navigate("/YourOrder");
              }
            });
          });
        });
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
        body: JSON.stringify({ totalAmount: 1200 }),
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
    <>
      <NavBar></NavBar>
      <div className="bg-mainBody">
        <div className="mx-auto max-w-7xl px-2 lg:px-0 mt-[30px] bg-mainBody">
          <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight text-Written sm:text-4xl">
              Shopping Cart
            </h1>
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section
                aria-labelledby="cart-heading"
                className="rounded-lg bg-mainBoxes lg:col-span-8 h-screen overflow-scroll"
              >
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 bg-mainBoxes"
                >
                  {products.length == 0 ? (
                    <img src="../Assets/nproduct.png" className="w-[480px]" />
                  ) : (
                    products.map((product, index) => (
                      <div key={index} className="bg-mainBoxes text-Written">
                        <li className="flex py-6 sm:py-6 ">
                          <div className="flex-shrink-0 text-Written">
                            <img
                              src={product.productImage}
                              alt={product.name}
                              className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                              <div>
                                <div className="flex justify-between">
                                  <h3 className="text-sm">
                                    <a
                                      href={product.href}
                                      className="font-semibold text-Written text-xl"
                                    >
                                      {product.productName}
                                    </a>
                                  </h3>
                                </div>
                                <div className="mt-1 flex text-sm">
                                  {product.size ? (
                                    <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                      {product.size}
                                    </p>
                                  ) : null}
                                </div>
                                <div className="mt-1 flex items-end">
                                  <p className="text-xm font-medium text-Dred">
                                    {product.productPrice}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <div className="mb-2 flex">
                          <div className="min-w-24 flex">
                            <button
                              onClick={() => {
                                decreaseCartElement(product);
                              }}
                              type="button"
                              className="h-7 w-7"
                            >
                              -
                            </button>
                            <span
                              type="text"
                              className="mx-1 h-7 w-9 rounded-md border text-center"
                            >
                              {product.productFreq}
                            </span>
                            <button
                              onClick={() => {
                                increaseCartElement(product);
                              }}
                              type="button"
                              className="flex h-7 w-7 items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <div className="ml-6 flex text-sm">
                            <button
                              type="button"
                              className="flex items-center space-x-1 px-2 py-1 pl-0"
                            >
                              <Trash size={12} className="text-red-500" />
                              <span
                                onClick={() => {
                                  removeFromCart(
                                    product.productName,
                                    product.productCompany
                                  );
                                }}
                                className="text-xs font-medium text-red-500"
                              >
                                Remove
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </ul>
              </section>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-md bg-mainBoxes lg:col-span-4  p-6"
              >
                <h2
                  id="summary-heading"
                  className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-Written sm:p-4"
                >
                  Price Details
                </h2>
                <div>
                  <dl className=" space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-Written">
                        Price ({products.length} items)
                      </dt>
                      <dd
                        id="price"
                        className="text-sm font-medium text-gray-900"
                      >
                        {(() => {
                          let totalPrice = 0;

                          for (let i = 0; i < products.length; i++) {
                            totalPrice +=
                              products[i].productPrice *
                              products[i].productFreq;
                          }
                          totalAmount = totalPrice;
                          return `₹${totalPrice}`;
                        })()}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <dt className="flex items-center text-sm text-Written">
                        <span>Discount</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">₹0</dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm text-Written">
                        <span>Delivery Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        {deliveryCharges}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                      <dt className="text-base font-medium text-Written">
                        Total Amount
                      </dt>
                      <dd className="text-base font-medium text-Written">
                        ₹ {totalAmount + deliveryCharges}
                      </dd>
                    </div>
                  </dl>
                  <div className="px-2 pb-4 font-medium text-green-700">
                    You will save ₹ {deliveryCharges} on this order
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={backtoHome}
                    className="rounded-md border bg-btnC px-3 py-2 text-sm font-semibold text-Written shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:scale-105 transition-all"
                  >
                    Back to shop
                  </button>
                  <button
                    type="button"
                    id="checkout"
                    onClick={() => {
                      createOrder(totalAmount);
                    }}
                    className={
                      totalAmount > 0
                        ? "rounded-md border bg-btnC  px-3 py-2 text-sm font-semibold text-Written shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:scale-105 transition-all"
                        : "rounded-md border bg-btnC  px-3 py-2 text-sm font-semibold text-Written shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:scale-105 transition-all pointer-events-none"
                    }
                  >
                    Checkout
                  </button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}

export default Cart;
