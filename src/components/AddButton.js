import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {createIncomeJWT, createExpenseJWT} from "../api/api";

function AddButton({ buttonName, setCreateStatus }) { 
  const [isAdd, setIsAdd] = useState(false);
  const entryRef = useRef();
  const valueRef = useRef();
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  
  const toggleModal = () => {
    setIsAdd(!isAdd);
  };

  const addData = async (e) => {
    e.preventDefault();
    if(!entryRef) {
      console.log("No entry entered");
      return;
    }

    if(!valueRef) {
      console.log("No value for entry entered");
      return;
    }

    const _entry = entryRef.current.value;
    const _value = parseInt(valueRef.current.value);
    const _category = buttonName; 
    
    switch (_category) {
      case "Income":
        if (token && email) {
          await createIncomeJWT(email, token, _entry, _value);
        }
        break;

      case "Expense":
        if (token && email) {
          await createExpenseJWT(email, token, _entry, _value);
        }
        break;

      default:
        console.log("Unknown category. You haven't chosen either Income or Expense category.");
    }
    setCreateStatus(true);
    toggleModal();

  };

  return (
    <>
      <button
        className="bg-white text-gray-700 active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={toggleModal}
      >
        <FontAwesomeIcon className="pr-3" icon={faPlus} />
        {buttonName}
      </button>

      {isAdd && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-2xl px-4 h-[300px] md:h-auto">
                <div className="bg-white rounded-lg shadow-xl border relative dark:bg-gray-700">
                <div className="flex justify-between p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-gray-700 text-l uppercase lg:text-2xl font-semibold dark:text-white">
                    Add {buttonName}
                    </h3>

                    <div className="h-[230px] w-full mx-auto mt-[5px] p-8 space-y-2 rounded">
                    <form
                        onSubmit={addData}
                        className="flex flex-col space-y-3 text-gray-500"
                    >
                        <input
                        ref={entryRef}
                        className="border-2 rounded p-2"
                        type="text"
                        placeholder="Entry"
                        name="entry"
                        />
                        <input
                        ref={valueRef}
                        className="border-2 rounded p-2"
                        type="number"
                        placeholder="0"
                        name="value"
                        />
                        <div className="flex pt-3 justify-between">
                        <button
                            className="w-[150px] rounded shadow-md bg-red-600 text-white p-2"
                            type="button"
                            onClick={toggleModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="w-[150px] rounded shadow-md bg-gray-900 text-white p-2"
                            type="submit"
                        >
                            Add {buttonName}
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
      
    </>
  );
}

export default AddButton;
