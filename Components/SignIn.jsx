import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HomePage from "./HomePage";
// mainBody: "rgb (12,10,9) ",
//     mainBoxes: "rgb (27,23,25) ",
//     btnC: "rgb (12,10,9) ",
//     borDER: "rgb (39,39,42) ",
//     mainWritten: "rgb (242,242,242) ",
//     subWritten: "rgb (161,161,169) ",
export default function SignIn(props) {
  const [havetoken, sethavetoken] = useState(false);
  function handlesethavetoken() {
    sethavetoken(!havetoken);
  }
  function handleLogin() {
    const userEmail = document.getElementById("email").value;
    const userPassword = document.getElementById("password").value;
    const headers = new Headers({
      email: userEmail,
      password: userPassword,
    });
    console.log(userEmail, userPassword);
    if (userEmail && userPassword) {
      fetch(`https://mern-backend-ecommerce-eight.vercel.app/sign_in`, {
        headers: headers,
      }).then(function (response) {
        if (response.status == 200) {
          response.json().then(function (data) {
            localStorage.setItem("token", data.token);
            handlesethavetoken();
          });
        } else {
          document.getElementById("Error").innerHTML =
            "Wrong Email Or Password";
        }
      });
    }
  }
  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <HomePage handlesetproductdata={props.handlesetproductdata}></HomePage>
      ) : (
        <div className="flex justify-center items-center h-screen bg-mainBody">
          <section className="rounded-xl border-borDER border-2 w-[30%] bg-mainBoxes">
            <div className="border rounded-xl p-4 text-Written">
              For testing email: testbuyer@gmail.com
              <div>Password:1234</div>
            </div>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
              <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h3 className="text-Dred">
                  Dont share your personal Information
                </h3>
                <h3 className="text-Dred">This is Just a Project !!!!!</h3>
                <h2 className="text-2xl font-bold leading-tight text-Written">
                  Sign in to your account
                </h2>
                <p className="mt-2text-sm text-Written ">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/sign_up"
                    className="font-semibold text-Written transition-all duration-200 hover:underline"
                  >
                    Create a free account
                  </Link>
                </p>
                <div id="Error" className="text-Dred mt-2"></div>
                <form action="#" method="POST" className="mt-8">
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor=""
                        className="text-base font-medium text-Written"
                      >
                        {" "}
                        Email address{" "}
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          className="flex text-Written h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="email"
                          placeholder="Email"
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
                          Password{" "}
                        </label>
                        <Link
                          to="/forgot_pass"
                          className="text-sm font-semibold text-Written hover:underline"
                        >
                          {" "}
                          Forgot password?{" "}
                        </Link>
                      </div>
                      <div className="mt-2">
                        <input
                          className="flex text-Written h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="password"
                          id="password"
                          placeholder="Password"
                        ></input>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={handleLogin}
                        className="bg-btnC text-black relative inline-flex w-full items-center justify-center rounded-md border border-gray-400  px-3.5 py-2.5 font-semibold transition-all duration-200 hover:text-Written"
                      >
                        Get started <ArrowRight className="ml-2" size={16} />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
