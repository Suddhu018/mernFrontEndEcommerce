import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavBar } from "./NavBar";
import Footer from "./Footer";

let username = "";
let email = "";
let add = "";
let phoneNumber = "";
export const YourOrder = () => {
  const [purchasedProduct, setpurchasedProduct] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json",
    });
    fetch("https://mern-backend-ecommerce-eight.vercel.app/userInfo2", {
      headers: headers,
    }).then(function (response) {
      if (response.status == 200) {
        response.json().then(function (data) {
          console.log(data);
          username = data.user.name;
          email = data.user.email;
          add = data.user.address;
          phoneNumber = data.user.phoneNumber;
          setpurchasedProduct(data.user.puchasedProducts);
        });
      }
    });
  }, []);
  return (
    <div className="bg-mainBody">
      <NavBar></NavBar>
      <div className="bg-mainBody mb-[50px] h-[20px]"></div>
      {purchasedProduct.length == 0 ? (
        <div className="h-screen flex justify-center items-center">
          <img src="../Assets/nproduct.png" className="w-[580px]" />
        </div>
      ) : (
        <div className="bg-mainBody">
          <div className="mx-auto my-4 max-w-6xl px-2  bg-mainBody">
            <h2 className="text-3xl font-bold text-Dred">Order Details</h2>
            <div className="mt-3 text-sm text-Written">
              Check the status of recent and old orders & discover more products
            </div>
            <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row bg-mainBoxes">
              <div className="w-full border-r border-gray-300 bg-bg-mainBoxes md:max-w-xs">
                <div className="p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 bg-mainBoxes">
                    {[
                      ["Name", username],
                      ["Email", email],
                      ["Phone Number", phoneNumber],
                      ["Address", add],
                      ["Order Status", "Confirmed"],
                    ].map(([key, value]) => (
                      <div key={key} className="mb-4">
                        <div className="text-sm font-semibold text-Written">
                          {key}
                        </div>
                        <div className="text-sm font-medium text-subWritten">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-x-4">
                    <button
                      type="button"
                      className="rounded-md bg-btnC px-3 py-2 text-sm font-semibold text-white shadow-smfocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:text-black"
                    >
                      View Order
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-btnC px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:text-black"
                    >
                      View Invoice
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-scroll h-[600px] bg-mainBoxes">
                <div className="p-8">
                  <ul className="-my-7 divide-y divide-gray-200 bg-mainBoxes text-Written">
                    {purchasedProduct.map((ele, index) => (
                      <li
                        key={index}
                        className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                      >
                        <div className="flex flex-1 items-stretch">
                          <div className="flex-shrink-0">
                            <img
                              className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                              src={ele.productImage}
                              alt={ele.imageSrc}
                            />
                          </div>

                          <div className="ml-5 flex flex-col justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-bold text-Written">
                                {ele.productName}
                              </p>
                              <p className="mt-1.5 text-sm font-medium text-gray-500">
                                {}
                              </p>
                            </div>

                            <p className="mt-4 text-sm font-medium text-subWritten">
                              x {ele.productFreq}
                            </p>
                          </div>
                        </div>

                        <div className="ml-auto flex flex-col items-end justify-between">
                          <p className="text-right text-sm font-bold text-emerald-600">
                            ₹ {Number(ele.productPrice * ele.productFreq)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <hr className="my-8 border-t border-t-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer></Footer>
    </div>
  );
};
