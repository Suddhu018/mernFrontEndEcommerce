import { NavBar } from "./NavBar";
import { useEffect } from "react";
import ImageSlideShow from "./ImageSlideShow";
import ProductFrontEnd from "./Products";
import Footer from "./Footer";
function HomePage(props) {
  return (
    <>
      <div className="bg-mainBody h-screen">
        <NavBar cartItem={props.cartItem}></NavBar>
        <ImageSlideShow></ImageSlideShow>
        <ProductFrontEnd
          handlesetproductdata={props.handlesetproductdata}
        ></ProductFrontEnd>
        <Footer></Footer>
      </div>
    </>
  );
}
export default HomePage;
