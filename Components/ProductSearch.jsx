import { useEffect, useState } from "react";
import { searchedProduct, NavBar } from "./NavBar";
import { useNavigate } from "react-router-dom";
import plist from "../Store/plist";
import Footer from "./Footer";
import { Filter } from "./FIlters";

export default function ProductSearch({ handlesearchProduct }) {
  const navigate = useNavigate();
  const list = plist((state) => state.list);
  const searchItem = plist((state) => state.searchItem);
  const [productlist, setProductlist] = useState([]);
  function handlesetProductlist(a) {
    setProductlist(a);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json",
    });
    const item = list;
    //to set local localStorage about what item was searched

    let a = "";
    searchItem(a);

    if (token != null && item != "") {
      fetch("https://mern-backend-ecommerce-eight.vercel.app/searchproduct", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ item: item }),
      }).then(function (response) {
        response.json().then(function (data) {
          if (localStorage.getItem("searchedProduct")) {
            localStorage.removeItem("searchedProduct");
            localStorage.setItem("searchedProduct", JSON.stringify(data.item));
          } else {
            localStorage.setItem("searchedProduct", JSON.stringify(data.item));
          }
          setProductlist(data.item);
        });
      });
    }
  }, [searchedProduct, location.key]);
  function moveToProductClickOverview(ele) {
    handlesearchProduct(ele);
    navigate("/OnClickProductOverview");
  }
  return (
    <>
      <NavBar></NavBar>
      {productlist.length == 0 ? (
        <div className="flex justify-center h-screen items-center">
          <img src="../Assets/nproduct.png" className="w-[580px]" />
        </div>
      ) : (
        <div className="flex flex-col mt-[47px] bg-lightblue h-screen">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 ">
                <Filter
                  productlist={productlist}
                  handlesetProductlist={handlesetProductlist}
                ></Filter>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-slate-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-Written"
                      >
                        <span>Product</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-Written"
                      >
                        Company Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-Written"
                      >
                        Price
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-Written"
                      >
                        Description
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">show</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-lightblue">
                    {productlist.map((ele, index) => (
                      <tr
                        key={index}
                        className="hover:cursor-pointer"
                        onClick={() => {
                          moveToProductClickOverview(ele);
                        }}
                      >
                        <td className="whitespace-nowrap px-4 py-4 h-[100px] ">
                          <div className="flex items-center">
                            <div className=" h-[100%] w-[120px] flex-shrink-0">
                              <img
                                className=" h-[100%] w-[120px] rounded-xl object-cover"
                                src={ele.productImage}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {ele.productName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900 ">
                            {ele.productCompany}
                          </div>
                          <div className="text-sm text-gray-700">{}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            ₹{ele.productPrice}
                          </span>
                        </td>
                        <td className=" px-4 py-4 text-sm text-gray-700">
                          {ele.productDescription}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </>
  );
}
