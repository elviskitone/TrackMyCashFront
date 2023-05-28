import axios from "axios";

// Set the API endpoint URL
let API_URL;

if (process.env.NODE_ENV === "producion") {
  API_URL = process.env.REACT_APP_API_URL_RENDER;
} else { 
      API_URL = "http://localhost:3500/api";
}

//JWT Register
const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username: username,
      email: email,
      password: password,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};


// JWT Login
const signin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/authenticate`, {
      email: email,
      password: password,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

//JWT logout
const signoutJWT = async (email, token) => {
  try {
    const response = await axios.get(`${API_URL}/${email}/logout`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })

    return response;
  } catch (error) {
    console.error(error);
  }
};

// Get User by Email
const getUserByEmail = async (email, token) => {
  try {
    const response = await axios.get(`${API_URL}/${email}/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}


// Update username JWT user
const changeUsernameJWT = async (id, email, token, username) => {
  try {
    const response = await axios.put(`${API_URL}/${email}/${id}/edit`, {
      username: username,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}


// Update password JWT user
const changePasswordJWT = async (id, email, token, password) => {
  try {
    const response = await axios.put(`${API_URL}/${email}/${id}/change_password`, {
      password: password,
    }, 
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

// Delete JWT User
const deleteJWTUser = async (email, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${email}/deleteJWTUser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {    
      console.error(error);    
  }
}


const createIncomeJWT = async (email, token, name, value) => {
  try {
    const response = await axios.post(`${API_URL}/${email}/incomes`, {
      name: name,
      value: value,
    }, 
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {    
      console.error(error);    
  }
}

const getAllIncomesJWT = async (email, token) => {
  try {
    const response = await axios.get(`${API_URL}/${email}/incomes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    return response;
  } catch (error) {console.error(error)}
}

const updateIncomeJWT = async (id, email, token, name, value) => {
  try {
    const response = await axios.put(`${API_URL}/${email}/${id}/incomes`, {
      name: name,
      value: value,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {    
      console.error(error);    
  }
}

const deleteIncomeJWT = async (id, email, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${email}/${id}/incomes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {    
      console.error(error);    
  }
}

const createExpenseJWT = async (email, token, name, value) => {
  try {
    const response = await axios.post(`${API_URL}/${email}/expenses`, {
      name: name,
      value: value,
    }, 
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {    
      console.error(error);    
  }
}

const getAllExpensesJWT = async (email, token) => {
  try {
    const response = await axios.get(`${API_URL}/${email}/expenses`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {    
      console.error(error);    
  }
}

const updateExpenseJWT = async (id, email, token, name, value) => {
  try {
    const response = await axios.put(`${API_URL}/${email}/${id}/expenses`, {
      name: name,
      value: value,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {    
      console.error(error);    
  }
}

const deleteExpenseJWT = async (id, email, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${email}/${id}/expenses`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {    
      console.error(error);    
  }
}

export { 
  signup, 
  signin, 
  signoutJWT, 
  getUserByEmail,
  changeUsernameJWT, 
  changePasswordJWT,
  deleteJWTUser,
  createIncomeJWT,
  getAllIncomesJWT,
  updateIncomeJWT, 
  deleteIncomeJWT, 
  createExpenseJWT,
  getAllExpensesJWT, 
  updateExpenseJWT, 
  deleteExpenseJWT, 
};
