import { useEffect, useState } from "react";
import Footer from "./Footer";
import { Upload, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
let profileLocation = "../Assets/user.png";
export default function Accounts() {
  const navigate = useNavigate();
  const [userinformation, setuserinformation] = useState({});
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
          setuserinformation(data.user);
        });
      }
    });
  }, []);
  function applyEdit() {
    document.getElementById("add").disabled = 0;
    document.getElementById("gender").disabled = 0;
    document.getElementById("mob").disabled = 0;
  }
  function saveInfo() {
    const address =
      document.getElementById("add").value == ""
        ? document.getElementById("add").placeholder
        : document.getElementById("add").value;

    const gender =
      document.getElementById("gender").value == ""
        ? document.getElementById("gender").placeholder
        : document.getElementById("gender").value;

    const phoneNumber =
      document.getElementById("mob").value == ""
        ? document.getElementById("mob").placeholder
        : document.getElementById("mob").value;

    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json",
    });

    fetch("https://mern-backend-ecommerce-eight.vercel.app/updateAccount", {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        address,
        gender,
        phoneNumber,
      }),
    }).then(function (response) {
      if (response.status == 200) {
        // Disable the input fields
        document.getElementById("add").disabled = true;
        document.getElementById("gender").disabled = true;
        document.getElementById("mob").disabled = true;
        console.log("Successful");
        document.getElementById("?success").innerHTML = "Successfully Edited";
      } else {
        document.getElementById("nosuccess").innerHTML = "Error";
      }
    });
  }
  function setpic() {
    document.getElementById("profilepic").className =
      "fixed  z-10 flex justify-center items-center w-[100%] h-screen backdrop-blur-sm";
  }
  function desetProfile() {
    document.getElementById("profilepic").className = "hidden";
  }
  //upload profile pic
  function submitForm(e) {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
    });
    fetch("https://mern-backend-ecommerce-eight.vercel.app/profilePicUpload", {
      method: "POST",
      headers: headers,
      body: formData,
    }).then(function (response) {
      if (response.status == 200) {
        document.getElementById("successfulluploaded").innerHTML =
          "Succfully Uploaded Profile Pic";
        response.json().then(function (data) {
          setTimeout(() => {
            document.getElementById("successfulluploaded").innerHTML = "";
            desetProfile();
            setuserinformation(data.user);
          }, 2000);
        });
      }
    });
  }

  return (
    <>
      <NavBar></NavBar>
      <div id="profilepic" className="hidden">
        <div className="flex flex-col  items-center w-[50%] bg-red-300 rounded-3xl h-[50%] opacity-75 ">
          {" "}
          <div className="w-[100%]">
            <img
              src="../Assets/close.png"
              className="w-[20px] float-right m-4 hover:cursor-pointer"
              onClick={desetProfile}
            />
          </div>
          <div className="flex flex-col w-[100%] h-[70%] justify-center items-center">
            <div className="text-black text-2xl mb-10">
              Upload Your Profile Pic
            </div>
            <div className="text-lime-400" id="successfulluploaded"></div>
            <div className="relative">
              {" "}
              <input
                name="avatar"
                type="file"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={submitForm}
              />
              <button
                type="button"
                class="bg-btnC text-white py-2 px-4 rounded-md shadow-md"
              >
                Select Picture
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-mainBody flex justify-center items-center mt-[40px]">
        <div className="h-2/3 w-[70%] pb-[10px] bg-mainBoxes">
          <div className="flex flex-col justify-center items-center">
            <div className="text-Written mt-[20px]">
              <div className="w-[100%] flex justify-center">
                {" "}
                <span className="text-xl text-Dred">Profile Details</span>
              </div>

              <div className="w-[100%] flex justify-center mt-[20px] ">
                {" "}
                <img
                  src={
                    userinformation.image == "../Assets/user.png"
                      ? "../Assets/user.png"
                      : "../ProfilePicuploads/" + userinformation.image
                  }
                  className="w-[70px] hover:cursor-pointer mb-[10px]"
                  onClick={setpic}
                />
              </div>
              <div className="flex w-[100%] justify-center">
                {" "}
                <span className="mt-[20px] text-2xl">
                  {userinformation.name}
                </span>
              </div>

              <div>
                {" "}
                <span className="mt-[20px]">{userinformation.email}</span>
              </div>
              <div
                id="?success"
                className="text-lime-400 flex w-[100%] justify-center"
              ></div>
              <div
                id="nosuccess"
                className="text-red-400 flex w-[100%] justify-center"
              ></div>
            </div>
            <div className="text-Written w-[100%] mt-[50px] flex-col">
              <div className="flex  justify-around mb-[10px]">
                Address :{" "}
                <input
                  id="add"
                  className="w-[300px] bg-mainBoxes border-2 rounded-md placeholder-qw p-2"
                  placeholder={userinformation.address}
                  disabled
                ></input>
              </div>
              <div className="flex justify-around mb-[10px]">
                Gender :
                <input
                  id="gender"
                  className="w-[300px] bg-mainBoxes border-2 rounded-md p-2"
                  placeholder={userinformation.gender}
                  disabled
                ></input>
              </div>
              <div className="flex justify-around mb-[10px]">
                Mob Number :
                <input
                  id="mob"
                  className="w-[310px] bg-mainBoxes border-2 rounded-md p-2"
                  placeholder={userinformation.phoneNumber}
                  disabled
                ></input>
              </div>
              <div className="flex justify-around mb-[10px] mt-[100px]">
                <button
                  onClick={applyEdit}
                  className=" bg-btnC border-2 rounded-md p-2 w-[110px] hover:bg-red-500 hover:text-black"
                >
                  Edit
                </button>
                <button
                  onClick={saveInfo}
                  className=" bg-btnC border-2 rounded-md p-2 w-[110px] hover:bg-red-500 hover:text-black"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
