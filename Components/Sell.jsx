// mainBody: "rgb (12,10,9) ",
//     mainBoxes: "rgb (27,23,25) ",
//     btnC: "rgb (12,10,9) ",
//     borDER: "rgb (39,39,42) ",
//     mainWritten: "rgb (242,242,242) ",
//     subWritten: "rgb (161,161,169) ",
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import logInStore from "../Store/logIn";
export default function Sell() {
  const setlogIn = logInStore((state) => state.setlogIn);
  function verifySeller() {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
    });
    fetch("https://mern-backend-ecommerce-eight.vercel.app/sellerDashboard", {
      headers: headers,
    }).then(function (response) {
      if (response.status == 200) {
        setlogIn();
        navigate("/sellerDasboard");
      } else {
        navigate("/");
      }
    });
  }
  const navigate = useNavigate();
  function handleProductListing() {
    const token = localStorage.getItem("token");
    const productName = String(document.getElementById("productName").value);
    const productCompany = String(
      document.getElementById("productCompany").value
    );
    const productPrice = Number(document.getElementById("productPrice").value);
    const productDescription = String(
      document.getElementById("productDescription").value
    );
    const productImage = String(document.getElementById("productImage").value);
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json", ///this is very important otherwise this will give undefined body type at the backend
    });

    if (
      productName &&
      productCompany &&
      productPrice &&
      productDescription &&
      productImage
    ) {
      fetch(`https://mern-backend-ecommerce-eight.vercel.app/sell`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          productName: productName,
          productCompany: productCompany,
          productPrice: productPrice,
          productDescription: productDescription,
          productImage: productImage,
        }),
      }).then(function (response) {
        if (response.status == 200) {
          document.getElementById("Error").innerHTML = "";
          document.getElementById("Success").innerHTML =
            "Product Listed Successfully Navigating To Main Page";
          setTimeout(() => {
            navigate("/");
          }, 4000);
        } else {
          document.getElementById("Success").innerHTML = "";
          document.getElementById("Error").innerHTML =
            "Was Not Able to List Product Try Again";
        }
      });
    }
  }
  return (
    <>
      <NavBar></NavBar>
      <div className="flex justify-center items-center bg-mainBody">
        <section className="rounded-xl border-borDER border-2 w-[30%] bg-mainBoxes mt-10">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-2xl font-bold leading-tight text-Written">
                Want to Sell?? Please give the product details.
              </h2>
              <span
                onClick={verifySeller}
                className="text-Dred underline mt-2 hover:cursor-pointer"
              >
                See you selling dashboard
              </span>
              <div id="Error" className="text-Dred mt-2"></div>
              <div id="Success" className="text-lime-600 mt-2"></div>
              <form method="POST" className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-Written"
                    >
                      {" "}
                      Product Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex text-Written h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        id="productName"
                        placeholder="Product Name"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-Written"
                    >
                      {" "}
                      Product's Company{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex text-Written h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        id="productCompany"
                        placeholder="Product's Company"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-Written"
                      >
                        {" "}
                        Product Description{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full text-Written rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id="productDescription"
                        type="text"
                        placeholder="Product Description"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-Written"
                      >
                        {" "}
                        Product Price{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full text-Written rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id="productPrice"
                        type="number"
                        placeholder="Product Price"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-Written"
                      >
                        {" "}
                        Product Image Location{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full text-Written rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id="productImage"
                        type="text"
                        placeholder="Product Image Location"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleProductListing}
                      className="bg-btnC text-black relative inline-flex w-full items-center justify-center rounded-md border border-gray-400  px-3.5 py-2.5 font-semibold transition-all duration-200 hover:text-Written"
                    >
                      List Product <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-mainBody h-11"></div>
      <Footer></Footer>
    </>
  );
}
