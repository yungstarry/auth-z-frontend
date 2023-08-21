import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

//validate Email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

//register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};
//login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

//logout user
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

//Get user status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "loggedin");
  return response.data;
};

//Get user profile
const getUser = async () => {
  const response = await axios.get(API_URL + "getuser");
  return response.data;
};

//Update user profile
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateuser", userData);
  return response.data;
};

//send Verification Email
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "sendverificationemail");
  return response.data.message;
};

//verify User
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verifyuser/${verificationToken}`
  );
  return response.data.message;
};

//change Password
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changepassword", userData);
  return response.data.message;
};

//forgot  Password
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotpassword", userData);
  return response.data.message;
};

//Reset  Password
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}/resetpassword/${resetToken}`,
    userData
  );
  return response.data.message;
};
//get users
const getUsers = async () => {
  const response = await axios.get(API_URL + "getusers");
  return response.data;
};


//delete users
const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data.message;
};

//change role
const upgradeUser = async (userData) => {
  const response = await axios.post(API_URL + "upgradeuser", userData);
  return response.data.message;
};

//send login code
const sendLoginCode = async (email) => {
  const response = await axios.post(
    API_URL + `sendlogincode/${email}`
  );
  return response.data.message;
};

//login with code
const loginWithCode = async (code, email) => {
  const response = await axios.post(
    API_URL + `loginwithcode/${email}`, code
    
  );
  return response.data;
};

//login with google
const loginWithGoogle = async (userToken) => {
  const response = await axios.post(
    API_URL + "google/callback", userToken
  );
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
};

export default authService;
