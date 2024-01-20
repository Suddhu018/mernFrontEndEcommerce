import React from "react";
import { Wrench, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  function movetoSettings() {
    navigate("/sellerSetting");
  }
  function movetodashboard() {
    navigate("/sellerDasboard");
  }
  return (
    <aside className="flex w-[18%] flex-col overflow-y-auto border-r bg-neutral-900 px-5 py-8">
      <a href="#"></a>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">
              content
            </label>
            <a
              className="hover:cursor-pointer flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              onClick={movetodashboard}
            >
              <BarChart className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="http://localhost:5173/sell"
            >
              <img
                className="h-5 w-5"
                aria-hidden="true"
                src="../Assets/checklist.png"
              />
              <span className="mx-2 text-sm font-medium">Add Products</span>
            </a>

            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/"
            >
              <img
                className="h-5 w-5"
                aria-hidden="true"
                src="../Assets/home.png"
              />
              <span className="mx-2 text-sm font-medium">HomePage</span>
            </a>
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">
              Customization
            </label>

            <a
              className="hover:cursor-pointer flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              onClick={movetoSettings}
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Edit Product</span>
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
