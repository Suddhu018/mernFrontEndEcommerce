import "./App.css";
import SignIn from "../Components/SignIn";
import { Route, Routes } from "react-router-dom";
import SignUp from "../Components/SignUp";
import Cart from "../Components/Cart";
import ForgotPassword from "../Components/ForgotPassword";
import ProductOverview from "../Components/ProductOverView";
import { useEffect, useState } from "react";
import Sell from "../Components/Sell";
import SellerDasboard from "../Components/SellerDasboard";
import logInStore from "../Store/logIn";
import { Checkout } from "../Components/Checkout";
import ProductSearch from "../Components/ProductSearch";
import { YourOrder } from "../Components/YourOrder";
import Accounts from "../Components/Accounts";
import OnClickProductOverview from "../Components/OnClickProductOverview";
import { searchedProduct } from "../Components/NavBar";
import SellerSetting from "../Components/SellerSetting";
function App() {
  const logIn = logInStore((state) => state.logIn);
  const [productdata, setproductdata] = useState("");
  function handlesetproductdata(a) {
    setproductdata(a);
  }
  const [finalPrice, setFinalPrice] = useState(0);
  function handlesetFinalPrice(a) {
    setFinalPrice(a);
  }
  const [searchedProduct, setsearchedProduct] = useState([]);
  function handlesearchProduct(a) {
    setsearchedProduct(a);
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <SignIn handlesetproductdata={handlesetproductdata}></SignIn>
          }
        />
        <Route path="/sign_up" element={<SignUp></SignUp>} />
        <Route path="forgot_pass" element={<ForgotPassword></ForgotPassword>} />
        <Route
          path="/product_overview"
          element={
            <ProductOverview productdata={productdata}></ProductOverview>
          }
        />
        <Route
          path="/user/cart"
          element={<Cart handlesetFinalPrice={handlesetFinalPrice}></Cart>}
        />
        <Route path="/sell" element={<Sell></Sell>} />
        <Route
          path="/sellerDasboard"
          element={
            logIn ? <SellerDasboard></SellerDasboard> : <SignIn></SignIn>
          }
        />
        <Route
          path="/userInfo"
          element={<Checkout finalPrice={finalPrice}></Checkout>}
        />
        <Route
          path="/ProductSearch/:searchedProduct"
          element={
            <ProductSearch
              handlesearchProduct={handlesearchProduct}
            ></ProductSearch>
          }
        />
        <Route path="/YourOrder" element={<YourOrder></YourOrder>} />
        <Route path="/YourAccount" element={<Accounts></Accounts>} />
        <Route
          path="/sellerSetting"
          element={<SellerSetting></SellerSetting>}
        />
        <Route
          path="/OnClickProductOverview"
          element={
            <OnClickProductOverview
              searchedProduct={searchedProduct}
            ></OnClickProductOverview>
          }
        />
      </Routes>
    </>
  );
}

export default App;
