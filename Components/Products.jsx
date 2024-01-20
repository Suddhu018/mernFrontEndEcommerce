import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ProductFrontEnd(props) {
  const navigate = useNavigate();
  function handleview(a) {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json",
    });
    console.log(headers.authorization);
    fetch("https://mern-backend-ecommerce-eight.vercel.app/product_overview", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ productName: a }),
    }).then(function (response) {
      response.json().then(function (ans) {
        if (response.status == 200) {
          props.handlesetproductdata(ans);
          navigate("/product_overview");
        } else {
          console.log("error");
        }
      });
    });
  }
  return (
    <>
      <div className="flex justify-center items-center bg-mainBody w-[100%] h-[100px] text-Written ">
        <span className="text-Dred text-5xl">The latest. </span>
        <span className="text-5xl"> Take a look at what’s new right now.</span>
      </div>
      <div className="flex justify-center items-center bg-mainBody">
        {" "}
        <img
          src="/Assets/logo.jpeg"
          alt="Logo"
          className="h-24 w-20 mb-8 mt-2"
        />
      </div>
      <div className="flex flex-wrap bg-mainBody  justify-between">
        <div
          onClick={() => {
            handleview("Iphone 15 Pro Titanium");
          }}
        >
          <div className="w-[399.99px] h-[499.99px]  ml-6 rounded-3xl border-transparent border-2 overflow-hidden transition-all duration-200 hover:scale-105 mb-7">
            <div className=" rounded-3xl">
              <p className="absolute text-3xl text-Written ml-6 mt-2">
                Iphone 15
              </p>
              <p className="absolute text-xl text-Written  ml-6 mt-12">
                Titanium
              </p>
            </div>
            <img src="../Assets/iphone-15-pro-202309.jpeg" alt="iPhone Pro" />
          </div>
        </div>
        <div
          onClick={() => {
            handleview("Iphone 15 Newphoria");
          }}
        >
          <div className="w-[399.99px] h-[499.99px] rounded-3xl overflow-hidden border-transparent border-2 transition-all duration-200 hover:scale-105 mb-7">
            <div className=" rounded-3xl">
              <p className="absolute text-3xl text-black ml-6 mt-2">
                Iphone 15
              </p>
              <p className="absolute text-xl text-black  ml-6 mt-12">
                Newphoria
              </p>
            </div>
            <img src="../Assets/iphone-15.jpeg" alt="iPhone" />
          </div>
        </div>

        <div
          onClick={() => {
            handleview("Mac Book Pro");
          }}
        >
          <div className="w-[399.99px] h-[499.99px] border-transparent overflow-hidden border-2 rounded-3xl  mr-6 transition-all duration-200 hover:scale-105 mb-7">
            <div className=" rounded-3xl">
              <p className="absolute text-3xl text-black ml-6 mt-2">
                MacBook Pro
              </p>
              <p className="absolute text-xl text-black  ml-6 mt-12">
                Space Grey
              </p>
            </div>
            <img src="../Assets/macbook-pro.jpeg" alt="MacBook Pro" />
          </div>
        </div>

        <div
          onClick={() => {
            handleview("iPad Air");
          }}
        >
          <div className="w-[399.99px] h-[499.99px] border-transparent overflow-hidden border-2 rounded-3xl  ml-6 transition-all duration-200 hover:scale-105 mb-7">
            <div className=" rounded-3xl">
              <p className="absolute text-3xl text-Written ml-6 mt-2">
                iPad Air
              </p>
              <p className="absolute text-xl text-Written  ml-6 mt-12">
                Lovable. Drawable. Magical.
              </p>
            </div>
            <img src="../Assets/ipad-air.jpeg" alt="iPad Air" />
          </div>
        </div>

        <div
          onClick={() => {
            handleview("Ultra Watch");
          }}
        >
          <div className="w-[399.99px] h-[499.99px] border-transparent  overflow-hidden border-2 rounded-3xl transition-all duration-200 hover:scale-105 mb-7">
            <div className=" rounded-3xl">
              <p className="absolute text-3xl text-black ml-6 mt-2">
                Ultra Watch
              </p>
              <p className="absolute text-xl text-black  ml-6 mt-12">
                Beyond Limits
              </p>
            </div>
            <img src="../Assets/watch-ultra.jpeg" alt="Watch Ultra" />
          </div>
        </div>
        <div
          onClick={() => {
            handleview("Watch");
          }}
        >
          <div className="w-[399.99px] h-[499.99px] border-transparent overflow-hidden border-2 rounded-3xl  mr-6 transition-all duration-200 hover:scale-105 mb-7">
            <div className=" rounded-3xl">
              <p className="absolute text-3xl text-Written ml-6 mt-2">Watch</p>
              <p className="absolute text-xl text-Written  ml-6 mt-12">
                New guts. More glory.
              </p>
            </div>
            <img src="../Assets/watch.jpeg" alt="Watch" />
          </div>
        </div>
      </div>

      {/* writing about nothing phone */}
      <div className="flex justify-center items-center bg-lightblue  w-[100%] h-[100px] text-Written ">
        <span className="text-write text-5xl mr-4">Nothing Phone</span>
        <span className="text-write2 text-5xl"> Come to the bright side.</span>
      </div>
      <div className="flex justify-center items-center bg-lightblue">
        {" "}
        <img
          src="/Assets/Untitled design.png"
          alt="Logo"
          className="w-[22%] mb-8 mt-2"
        />
      </div>
      <div className="flex bg-lightblue  justify-between w-[100%]">
        <div className="w-[50%] overflow-hidden">
          <img src="/Assets/nothing3.jpg"></img>
        </div>
        <div className="flex bg-lightblue  w-[50%] justify-center items-center">
          {" "}
          <span className="text-6xl text-Dred">N</span>
          <span className="text-6xl text-write">othing Phone 2 </span>
          <button
            onClick={() => {
              handleview("Nothing Phone 2");
            }}
            className="hover:scale-110 transition-all"
          >
            <img src="/Assets/right.png" className="w-[40px] ml-6" />
          </button>
        </div>
      </div>
      <div className="flex bg-lightblue  justify-between w-[100%]">
        <div className="w-[50%] overflow-hidden ml-7 rounded-3xl">
          <video controls autoPlay muted>
            <source src="/Assets/nothingVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex bg-lightblue w-[50%] justify-center items-center">
          <img
            src="/Assets/earstick2.jpg"
            className=" w-[40%]"
            alt="Image Alt Text"
          />
          <span className="text-6xl text-Dred">E</span>
          <span className="text-6xl text-write">ar Stick</span>
          <button
            onClick={() => {
              handleview("Ear Stick earbuds");
            }}
            className="hover:scale-110 transition-all"
          >
            <img src="/Assets/right.png" className="w-[40px] ml-6" />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center bg-lightblue  w-[100%] h-[100px] text-Written ">
        <span className="text-write text-4xl mr-4">
          A <span className="text-Dred">new</span> era.
        </span>
        <span className="text-write2 text-3xl">
          Where iconic design meets premium performance.
        </span>
      </div>
    </>
  );
}
