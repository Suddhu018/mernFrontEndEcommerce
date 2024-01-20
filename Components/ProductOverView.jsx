import React, { useEffect } from "react";
import { Star, ChevronDown } from "lucide-react";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import cartStore from "../Store/cart";
import { useState } from "react";
import ProductReview from "./ProductReview";
// {
//     productdetails: "Iphone 15",
//     productCompany: "Apple",
//     productImg: "../Assets/iphone-15-pro-202309.jpeg",
//       productPrice: "72,000",
//   }

////3/1/24 ka kaam refresh hone pe data loose ho jaata hai learn how to manage that
export default function ProductOverview(props) {
  const increaseCartItem = cartStore((state) => state.increaseCartItem);
  function saveToCart(details) {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json",
    });
    fetch("https://mern-backend-ecommerce-eight.vercel.app/addToCart", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(details),
    }).then(function (response) {
      if (response.status == 200) {
        response.json().then(function (data) {
          console.log(data.cart);
          document.getElementById("cartDisp").innerHTML = `${data.cart}`;
        });
      }
    });
  }
  return (
    <>
      <NavBar></NavBar>
      <div>
        <section className="overflow-hidde text-Written bg-write2">
          <div className="mx-auto max-w-5xl px-5 py-24 ">
            <div className="mx-auto flex flex-wrap items-center lg:w-4/5 bg-mainBoxes overflow-hidden p-6 rounded-3xl">
              <img
                alt="Apple"
                className="h-64 w-full object-cover lg:h-96 lg:w-1/2 rounded-2xl"
                src={props.productdata.productImage}
              />
              <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                <h2 className="text-sm font-semibold tracking-widest text-Written">
                  {props.productdata.productCompany}
                </h2>
                <h1 className="my-4 text-3xl font-semibold text-Written">
                  {props.productdata.productName}
                </h1>
                <div className="my-4 flex items-center">
                  <span className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500" />
                    ))}
                  </span>
                </div>
                <p className="leading-relaxed text-subWritten">
                  {props.productdata.productDescription}
                </p>

                <div className="flex items-center justify-between">
                  <span className="title-font text-xl font-bold text-Written">
                    ₹{props.productdata.productPrice}
                  </span>
                  <button
                    onClick={() => {
                      saveToCart({
                        productImage: props.productdata.productImage,
                        productName: props.productdata.productName,
                        productCompany: props.productdata.productCompany,
                        productDescription:
                          props.productdata.productDescription,
                        productPrice: props.productdata.productPrice,
                      });
                    }}
                    type="button"
                    className="rounded-md bg-btnC px-3 py-2 text-sm font-semibold text-Written shadow-sm hover:bg-red-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ProductReview productdata={props.productdata}></ProductReview>
      <Footer></Footer>
    </>
  );
}
