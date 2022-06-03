import axios from "axios";

// login user
const login = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/loginWithUsername",
    userData
  );
  return response.data;
};

// login user with email
const loginWithEmail = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/loginWithEmail",
    userData
  );
  return response.data;
};

// register user
const registerUser = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/createUser",
    userData
  );
  return response.data;
};

const authService = {
  login,
  loginWithEmail,
  registerUser,
};

export default authService;
