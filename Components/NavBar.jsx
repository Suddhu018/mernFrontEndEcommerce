// theme: {
//     extend: {},
//     colors: {
//       borDER: "rgb(39,39,42)",
//       Written: "rgb(242,242,242)",
//       subWritten: "rgb(161,161,169)",
//     },
//     backgroundColor: {
//       mainBody: "rgb(12,10,9)",
//       mainBoxes: "rgb(27,23,25)",
//       btnC: "rgb(207,54,76)",
//     },
//   },
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cartStore from "../Store/cart";
import plist from "../Store/plist";
let searchedProduct = "";
function NavBar() {
  const searchItem = plist((state) => state.searchItem);
  const cart = cartStore((state) => state.cart);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json",
    });
    if (token != null) {
      fetch("https://mern-backend-ecommerce-eight.vercel.app/userinfo", {
        headers: headers,
      }).then(function (response) {
        response.json().then(function (data) {
          console.log(data.cart);
          document.getElementById("cartDisp").innerHTML = `${data.cart}`;
        });
      });
    }
  }, []);
  function taketoCartPage() {
    navigate("/user/cart");
  }
  function taketoSellPage() {
    navigate("/sell");
  }
  function tohome() {
    navigate("/");
  }
  function taketoOrder() {
    navigate("/YourOrder");
  }
  function taketoAccounts() {
    navigate("/YourAccount");
  }
  function search() {
    searchedProduct = document.getElementById("searchbar").value;
    console.log(searchedProduct);
    searchItem(searchedProduct);
    if (searchedProduct.trim())
      navigate(`/ProductSearch/${encodeURIComponent(searchedProduct)}`);
  }
  function logout() {
    localStorage.removeItem("token");
    window.location.reload(true);
  }
  return (
    <>
      <div className="fixed top-0 left-0 w-full flex flex-col md:flex-row justify-center items-center bg-mainBoxes h-12 z-10 border-borDER border-2">
        <div className="flex justify-center items-center w-full md:w-[20%] h-10 md:px-3 py-2">
          {/* Home button */}
          <button className="flex justify-center items-center transition-all duration-200 hover:scale-105 md:mx-1">
            <span onClick={tohome} className="text-Written mx-1">
              Home
            </span>
          </button>{" "}
          {/* Your Orders button */}
          <button
            onClick={taketoOrder}
            className="text-Written mx-3 transition-all duration-200 hover:scale-105"
          >
            Your Orders
          </button>
          {/* Sell button */}
          <button
            onClick={taketoSellPage}
            className="text-Written mx-3 transition-all duration-200 hover:scale-105"
          >
            Sell
          </button>
        </div>
        {/* Search input */}
        <input
          className="flex h-10 text-Written w-full md:w-[50%] rounded-md border border-Written bg-transparent px-3 py-2 text-sm placeholder:text-subWritten m-5"
          type="text"
          id="searchbar"
          placeholder="Search for anything..."
        ></input>
        {/* Search button */}
        <button
          type="button"
          onClick={search}
          className="rounded-md bg-btnC px-3 py-2 text-sm font-semibold text-Written shadow-sm hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 hover:scale-105 md:ml-2"
        >
          Search
        </button>
        <div className="flex justify-center items-center w-full md:w-[20%] h-10 md:px-3 py-2">
          {/* Accounts button */}
          <button
            onClick={taketoAccounts}
            className="text-Written mx-4 transition-all duration-200 hover:scale-105"
          >
            Accounts
          </button>
          {/* Logout button */}
          <button
            onClick={logout}
            className="text-Written mx-4 transition-all duration-200 hover:scale-105"
          >
            Logout
          </button>
          {/* Cart button */}
          <button
            className="flex justify-center items-center"
            onClick={taketoCartPage}
          >
            <img
              className="w-10 mx-2 transition-all duration-200 hover:scale-105"
              src="../Assets/trolley.png"
            />
            <span id="cartDisp" className="text-Written ">
              {cart}
            </span>
          </button>{" "}
        </div>
      </div>
    </>
  );
}
export { NavBar, searchedProduct };
