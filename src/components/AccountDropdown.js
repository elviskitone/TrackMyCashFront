import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { createPopper } from "@popperjs/core";
import { signoutJWT, deleteJWTUser } from "../api/api";

const AccountDropdown = () => {
  const history = useNavigate();

  /* Delete modal state*/
  const [isOpen, setIsOpen] = useState(false);
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const alias = localStorage.getItem("alias");
  const dispatch = useDispatch();

  /* Dropdown props */
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ],
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <a
        className="text-gray-500 block"
        href="#account"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center text-center flex">
          <span className="w-[42px] h-10 bg-gray-700 text-white hover:opacity-75 inline-flex items-center justify-center rounded-full">
            <FontAwesomeIcon icon={faUser} />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={`
          ${dropdownPopoverShow ? "block" : "hidden"}
          absolute right-0 w-48 bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1`}
        style={{ minWidth: "12rem" }}
      >
        {!email && (
          <>
            <a
              href="/register"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:opacity-75"
              onClick={(e) => {
                e.preventDefault();
                history("/register");
              }}
            >
              Register
            </a>
            <a
              href="/"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:opacity-75"
              onClick={(e) => {
                e.preventDefault();
                history("/");
              }}
            >
              Signin
            </a>
          </>
        )}

        {email && (
          <>
            <a
              href="#change_username"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:opacity-75"
              onClick={(e) => {
                e.preventDefault();                
                history("/change_username");
              }}
            >
              Change username
            </a>
            <a
              href="#change_password"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:opacity-75"
              onClick={(e) => {
                e.preventDefault();
                if (!token) {
                  alert("Can't change google password from here!");
                  setDropdownPopoverShow(false);
                  return;
                }
                history("/change_password");
              }}
            >
              Change password
            </a>
            <a
              href="/"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:opacity-75"
              onClick={(e) => {                
                if(token && email) {
                  signoutJWT(email, token);
                  localStorage.clear();
                  dispatch(logout());
                  history("/");

                } else {
                  localStorage.clear();
                  history("/");
                }
              }}
            >
              Logout
            </a>
            <div className="h-0 my-2 border-solid border-gray-100"></div>
            <a
              href="#delete_account"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:opacity-75"
              onClick={(e) => {
                e.preventDefault();
                toggleModal();
              }}
            >
              Delete account
            </a>
          </>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-xl px-4 h-[300px] md:h-auto">
            <div className="bg-white rounded-lg shadow-xl border relative dark:bg-gray-700">
              <div className="p-2 border-b rounded-t dark:border-gray-600">
                <h3 className="pt-2 items-center text-center text-red-600 text-l uppercase lg:text-2xl font-semibold dark:text-white">
                  Account Removal
                </h3>

                <div className="h-auto w-full mx-auto mt-[5px] p-8 space-y-2 rounded">
                  
                  <div className="flex flex-col space-y-1 text-gray-500">
                    <span className="text-lg text-red-500 pb-5 text-center">
                      Are you sure you want to delete the account ?
                    </span>
                    <div className=" flex pt-3 justify-between">
                      <button
                        className="w-[150px] rounded shadow-md bg-green-600 text-white p-2 ml-8"
                        type="button"
                        onClick={toggleModal}
                      >
                        Keep Account
                      </button>
                      <button
                        className="w-[150px] rounded shadow-md bg-red-600 text-white p-2 mr-8"
                        onClick={(e) => {                          
                          if(token && email) {
                            const deleteConfirmed = deleteJWTUser(email, token);
                            if (deleteConfirmed) {                            
                              localStorage.clear();
                              dispatch(logout());
                              alert(`ACCOUNT DELETED: ${alias}`);
                              history("/"); 
                            }                            
                                                     
                          } else {
                            history("/");
                          }
                        }}
                      >
                        Confirm Deletion
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
