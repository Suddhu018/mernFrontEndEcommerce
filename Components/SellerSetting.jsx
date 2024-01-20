import { useEffect, useState } from "react";
import DashboardProductList from "./DashboardProductList";
import Footer from "./Footer";
import SideBar from "./SideBar";

export default function SellerSetting() {
  const [dataArrived, setdataArrived] = useState(false);
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    ///first fetch the data about the person selling from the backend
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
    });
    fetch("https://mern-backend-ecommerce-eight.vercel.app/sellerInfo", {
      headers: headers,
    }).then(function (response) {
      response.json().then(function (data) {
        setProductList(data.productListed);
        setdataArrived(true);
      });
    });
  }, []);
  function deleteProductListing(a, b) {
    var productName = a;
    var productCompany = b;
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json",
    });
    fetch("https://mern-backend-ecommerce-eight.vercel.app/deleteProduct", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        productName: productName,
        productCompany: productCompany,
      }),
    }).then(function (response) {
      response.json().then(function (data) {
        if (response.status == 200) {
          setProductList(data);
          setdataArrived(true);
        } else {
          console.log("error while removing");
        }
      });
    });
  }
  return (
    <div className="bg-mainBoxes h-screen">
      <div className="flex border-b-2 h-[90%]">
        <SideBar></SideBar>
        <div className=" flex flex-col  w-[80%] ">
          <div className=" flex justify-center items-center border-b-2 m-4 pb-4">
            {" "}
            <p id="dashName" className="text-Written text-3xl">
              Settings
            </p>
          </div>
          <div className="w-[100%] overflow-scroll">
            {!dataArrived ? (
              <div id="products" className="text-Written text-3xl">
                Loading
              </div>
            ) : productList.length == 0 ? (
              <div className="text-Written text-3xl overflow-hidden flex flex-col justify-center items-center">
                {" "}
                <img src="../Assets/nproduct.png" className="w-[480px]" />
                <p className="Written mt-10">No Products Listed</p>
              </div>
            ) : (
              productList.map((ele, index) => (
                <div
                  key={index}
                  className="text-subWritten  m-1 bg-write2 h-[115px]"
                >
                  <div className="flex">
                    {" "}
                    <div className=" mr-3 w-[150px] h-[115px] overflow-hidden">
                      <img src={ele.productImage} />
                    </div>
                    <div className="flex flex-col overflow-scroll ">
                      {" "}
                      <div className="flex  text-2xl">
                        <div className="w-[33%]"></div>
                        <div className="w-[33%] flex justify-center">
                          <span className="mr-5 text-red-400">
                            {ele.productCompany}
                          </span>
                          <span className=" text-red-500">
                            {" "}
                            {ele.productName}
                          </span>
                        </div>
                        <div className="w-[33%] flex justify-end">
                          <button>
                            <img
                              src="../Assets/bin.png"
                              className="w-[30px] mr-3"
                              onClick={() => {
                                deleteProductListing(
                                  ele.productName,
                                  ele.productCompany
                                );
                              }}
                            />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span>{ele.productDescription}</span>

                        <span className="text-Written flex justify-end m-2">
                          {`Price:-${ele.productPrice}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
