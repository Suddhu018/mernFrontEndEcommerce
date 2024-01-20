import React, { useState } from "react";
export function Filter({ productlist, handlesetProductlist }) {
  let userActualSearch = JSON.parse(localStorage.getItem("searchedProduct")); //list of all the product which was search
  let minCostOfTheProduct = productlist[0].productPrice;
  let maxCostOfTheProduct = productlist[0].productPrice;
  for (let i = 1; i < productlist.length; i++) {
    if (productlist[i].productPrice < minCostOfTheProduct) {
      minCostOfTheProduct = String(productlist[i].productPrice);
    }
    if (productlist[i].productPrice > maxCostOfTheProduct) {
      maxCostOfTheProduct = String(productlist[i].productPrice);
    }
  }
  function moveslidePrice() {
    const paisa = document.getElementById("priceslide").value;
    document.getElementById("moneyvalue").innerHTML = paisa;
    let allproductsAfterFilter = [];
    for (let i = 0; i < userActualSearch.length; i++) {
      if (userActualSearch[i].productPrice <= Number(paisa)) {
        allproductsAfterFilter.push(userActualSearch[i]);
      }
    }
    handlesetProductlist(allproductsAfterFilter);
  }
  return (
    <div className="bg-mainBoxes">
      {" "}
      <div className="mx-auto w-full  bg-mainBoxes border-2">
        <div className="px-2">
          <div className="flex flex-col  md:flex-row">
            <span className=" ml-2 text-xl font-bold text-Written">
              Filters
            </span>
            {/* <div className="grid grid-cols-4 gap-x-6 gap-y-4">
          <button className="flex items-center justify-center text-sm font-semibold">
            Set Price
          </button>
        </div> */}
          </div>
        </div>
        <div className="rounded-md bg-mainBoxes px-2 py-6 md:px-8">
          <div className="space-y-4 md:flex md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-3 md:space-y-0">
              <span className="font-semibold text-Written">Max Price:</span>
              <input
                onChange={moveslidePrice}
                id="priceslide"
                type="range"
                min={minCostOfTheProduct}
                max="300000"
                defaultValue={maxCostOfTheProduct}
                class="appearance-none w-full h-2 bg-black rounded-md outline-none slider-thumb-bg-btnC"
              ></input>
              <div
                id="moneyvalue"
                className="flex items-center justify-center rounded-md bg-white px-3 py-1 font-medium"
              >
                {maxCostOfTheProduct}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
