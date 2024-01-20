// mainBody: "rgb (12,10,9) ",
//     mainBoxes: "rgb (27,23,25) ",
//     btnC: "rgb (12,10,9) ",
//     borDER: "rgb (39,39,42) ",
//     mainWritten: "rgb (242,242,242) ",
//     subWritten: "rgb (161,161,169) ",
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();
  function handleSignUp() {
    const userName = document.getElementById("name").value;
    const userEmail = document.getElementById("email").value;
    const userPassword = document.getElementById("password").value;
    const headers = new Headers({
      email: userEmail,
      password: userPassword,
      name: userName,
    });
    if (userEmail && userName && userPassword) {
      fetch(`https://mern-backend-ecommerce-eight.vercel.app/sign_up`, {
        method: "POST",
        headers: headers,
      }).then(function (response) {
        if (response.status == 200) {
          navigate("/");
        } else if (response.status == 400) {
          document.getElementById("Error").innerHTML = "User Already Exist";
        }
      });
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-mainBody">
      <section className="rounded-xl border-borDER border-2 w-[30%] bg-mainBoxes">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-2xl font-bold leading-tight text-Written">
              Sign up to create account
            </h2>
            <p className="mt-2text-sm text-Written ">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-semibold text-Written transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
              <div id="Error" className="text-Dred mt-2"></div>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-Written"
                  >
                    {" "}
                    Full Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex text-Written h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      id="name"
                      placeholder="Full Name"
                    ></input>
                  </div>
                </div>
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
                      className="flex text-Written h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      id="email"
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
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full text-Written rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      id="password"
                      placeholder="Password"
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleSignUp}
                    className="bg-btnC text-black relative inline-flex w-full items-center justify-center rounded-md border border-gray-400  px-3.5 py-2.5 font-semibold transition-all duration-200 hover:text-Written"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
