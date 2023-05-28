import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AccountDropdown from "./AccountDropdown";

function Nav() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const email = localStorage.getItem("email");
  const alias = localStorage.getItem("alias");

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white shadow-xl">
      <div className="container px-4 mx-auto flex flex-wrap items-center">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-600"
            href={email ? "/home": "/"}
          >
            Track My Cash App
          </a>
          <button
            className="text-gray-700 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        {/* User */}
        <div
          className={
            "lg:flex flex-grow items-center justify-end" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <div className="flex items-center">
            <span className="px-2">{alias ? alias : (email ? email : "")}</span>
            <AccountDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
