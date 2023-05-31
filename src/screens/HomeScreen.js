import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import AddButton from "../components/AddButton";
import Table, { SelectColumnFilter, CategoryPill } from "../components/Table";
import TransactionTotal from "../shared/TransactionTotal";
import AddEntry from "../shared/AddEntry";
import DoughnutChart from "../components/DoughnutChart";
import { 
  getAllIncomesJWT, 
  getAllExpensesJWT, 
  updateIncomeJWT, 
  updateExpenseJWT, 
  deleteIncomeJWT,
  deleteExpenseJWT,
} from "../api/api";


function HomeScreen() {
  const history = useNavigate();
  const entryRef = useRef();
  const valueRef = useRef();
  const [entries, setEntries] = useState([]);
  const [editedStatus, setEditedStatus] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [editEntry, setEditEntry] = useState();
  const [editValue, setEditValue] = useState();
  const [editedCategory, setEditedCategory] = useState();
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  let incomeTotal = 0;
  let expenseTotal = 0;

  incomeTotal = TransactionTotal(entries, "Income");
  expenseTotal = TransactionTotal(entries, "Expense");

  async function Mutations() {
    const incomes = await getAllIncomesJWT(email, token);
    const expenses = await getAllExpensesJWT(email, token);

    let allEntries = [];    

    incomes?.data?.income.forEach((income) => {
      const incomeEntry = {
        id: income.id,
        entry: income.name,
        value: parseInt(income.value),
        category: "Income",
      }
      const firstBatch = AddEntry(incomeEntry, allEntries);
      allEntries = [...firstBatch];
  
    })
    expenses?.data?.expense.forEach((expense) => {
      const expenseEntry = {
        id: expense.id,
        entry: expense.name,
        value: parseInt(expense.value),
        category: "Expense",
      }
      const finalBatch = AddEntry(expenseEntry, allEntries);
      allEntries = [...finalBatch];
    })

    return allEntries;
   }

  
  useEffect(() => {    
    async function fetchAllEntries() {
      const allEntries = await Mutations();
      setEntries(allEntries);
     }
     fetchAllEntries();
     setCreateStatus(false);
     setEditedStatus(false);

     if (!email) {
      history("/");
     }

  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [
    email,
    token,
    editedStatus, 
    createStatus,  
    history
  ]);

  const toggleEditModal = () => {
    setIsEdit(!isEdit);
  };

  const handleEdit = async (row) => {
     const edit = await Mutations();
     const dataToEdit = edit.find(
      (mutation) => mutation.category === row.original.category &&
      mutation.id === row.original.id);
    
    setEditId(dataToEdit.id);
    setEditEntry(dataToEdit.entry);
    setEditValue(dataToEdit.value);
    setEditedCategory(dataToEdit.category);
    toggleEditModal();

  }

  const handleDelete = async (row) => {
    const deleteData = await Mutations();
    const dataToDelete = deleteData.find(
      (mutation) => mutation.category === row.original.category &&
      mutation.id === row.original.id);

    const _id = parseInt(dataToDelete.id);
    const _category = dataToDelete.category;
    
    if (dataToDelete) {
      switch (_category) {
        case "Income":
          deleteIncomeJWT(_id, email, token);
          break;
        
        case "Expense":
          deleteExpenseJWT(_id, email, token);
          break;

        default:
          console.log("Category Unknown. Nothing to delete");

      }
      setEditedStatus(true);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Entry",
        accessor: "entry",
      },
      {
        Header: "Value",
        accessor: "value",
      },
      {
        Header: "Category",
        accessor: "category",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: CategoryPill,
      },
      {
        Header: "Balance",
        accessor: "balance",
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <button
            className="px-3 py-1 uppercase font-bold text-xs rounded-lg shadow-lg hover:opacity-75 bg-blue-600 text-white"
            onClick={(e) => {
              e.preventDefault()
              handleEdit(row)
            }}
          >
            Edit {row.original.category}
          </button>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => (
          <button
            className="px-3 py-1 uppercase font-bold text-xs rounded-lg shadow-lg hover:opacity-75 bg-blue-600 text-white"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(row)
            }}
          >
            Delete {row.original.category}
          </button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []

  );  

  const data = React.useMemo(() => entries, [entries]);

  const editData = async (e) => {
    e.preventDefault();

    const _id = parseInt(editId);
    const _entry = entryRef.current.value;
    const _value = parseInt(valueRef.current.value);
    const _category = editedCategory;   

    switch (_category) {
      case "Income":
        await updateIncomeJWT(_id, email, token, _entry, _value);
        break;

      case "Expense":
        await updateExpenseJWT(_id, email, token, _entry, _value);
        break;

      default:
        console.log("Unknown category. You haven't chosen either Income or Expense category.");
    }
    setEditedStatus(true);
    console.log("Update complete");
    toggleEditModal();

  }

  return (
    <div className="">
      <Nav />

      <main className="min-h-screen bg-white text-gray-900 pt-8">
        <section className="min-h-screen overflow-x-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="flex my-5 space-x-5 justify-center">
              
              <AddButton                
                buttonName="Income"
                addEntry={AddEntry}
                setCreateStatus={setCreateStatus}
                               
              />
              
              <AddButton                
                buttonName="Expense"
                addEntry={AddEntry} 
                setCreateStatus={setCreateStatus}                               
              />
              
            </div>

            <div className="flex justify-center">
              <div className="mt-4 overflow-x-auto">
                <Table columns={columns} data={data} />
              </div>
            </div>
          </div>
        </section>
        <section className="min-h-screen">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <div className="">
              <div className="mb-3">
                <DoughnutChart
                  incomeLabel="Income"
                  expenseLabel="Expense"
                  incomeTotal={incomeTotal}
                  expenseTotal={expenseTotal}
                />
              </div>
            </div>
          </div>
        </section>

        {isEdit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-2xl px-4 h-[300px] md:h-auto">
                <div className="bg-white rounded-lg shadow-xl border relative dark:bg-gray-700">
                <div className="flex justify-between p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-gray-700 text-l uppercase lg:text-2xl font-semibold dark:text-white">
                    Edit {editedCategory}
                    </h3>

                    <div className="h-[230px] w-full mx-auto mt-[5px] p-8 space-y-2 rounded">
                    <form
                        onSubmit={editData}
                        className="flex flex-col space-y-3 text-gray-500"
                    >
                        <input 
                        ref={entryRef}                       
                        className="border-2 rounded p-2"
                        type="text"                        
                        name="entry"                        
                        defaultValue={editEntry}
                        />
                        <input 
                        ref={valueRef}
                        className="border-2 rounded p-2"
                        type="number"                        
                        name="value"
                        placeholder="0"
                        defaultValue={editValue}
                        />
                        <div className="flex pt-3 justify-between">
                        <button
                            className="w-[150px] rounded shadow-md bg-red-600 text-white p-2"
                            type="button"
                            onClick={toggleEditModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="w-[150px] rounded shadow-md bg-gray-900 text-white p-2"
                            type="submit"
                        >
                            Edit {editedCategory}
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default HomeScreen;
