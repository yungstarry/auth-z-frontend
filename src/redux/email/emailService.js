import axios from "axios";
import { API_URL } from "../features/auth/authService";

//send automated email

//register user
const sendAutomatedEmail = async (emailData) => {
  const response = await axios.post(API_URL + "sendautomatedemail", emailData);
  return response.data.message;
};

const emailService = {
    sendAutomatedEmail
}

export default emailService