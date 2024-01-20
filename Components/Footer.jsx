import { ChevronRight } from "lucide-react";
import React from "react";

export default function Footer() {
  function sendEmail() {
    const email = document.getElementById("email").value;
    document.getElementById(
      "success"
    ).innerHTML = `Email sent successfully at ${email}`;
    setTimeout(() => {
      document.getElementById("success").innerHTML = "";
    }, 4000);
  }
  return (
    <>
      <footer className="w-full bg-mainBoxes text-Written p-5">
        <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
          <img className="w-[100px] rounded-3xl" src="../Assets/estore.png" />
          <div className="w-full px-4 md:w-1/2 lg:px-0">
            <h1 className="max-w-sm text-3xl font-bold">Connect With Us</h1>
            <h2 id="success" className="text-lime-400"></h2>
            <form className="mt-4 inline-flex w-full items-center md:w-3/4">
              <input
                id="email"
                className="flex text-write h-10 w-full rounded-md p-2"
                type="email"
                placeholder="Email"
              ></input>
              <button
                type="button"
                onClick={sendEmail}
                className="ml-4 rounded-full bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </form>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3">
            {Array.from({ length: 1 }).map((_, i) => (
              <div key={i} className="mb-8 lg:mb-0">
                <p className="mb-6 text-lg font-semibold text-Dred ">Company</p>
                <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
                  <li>About us</li>
                  <li>Company History</li>
                  <li>Our Team</li>
                  <li>Our Vision</li>
                </ul>
              </div>
            ))}
            {Array.from({ length: 1 }).map((_, i) => (
              <div key={i} className="mb-8 lg:mb-0">
                <p className="mb-6 text-lg font-semibold text-Dred ">
                  Make Money With Us
                </p>
                <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
                  <li>Sell Online</li>
                  <li>Become an Affiliate</li>
                  <li>Advertise Your Product</li>
                  <li>Advertise Your Product</li>
                </ul>
              </div>
            ))}
            {Array.from({ length: 1 }).map((_, i) => (
              <div key={i} className="mb-8 lg:mb-0">
                <p className="mb-6 text-lg font-semibold text-Dred ">
                  Connet With Us
                </p>
                <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
                  <a href="https://www.linkedin.com/in/sudhanshu-shekhar-20aa4a21b">
                    <li>LinkedIn</li>
                  </a>
                  <a href="https://twitter.com/sudhans1718">
                    <li>Twitter</li>
                  </a>
                  <li>Instagram</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
