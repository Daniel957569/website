import axios from "axios";
import { toast } from "react-toastify";

const urlCurrent = "http://localhost:3001/api/";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export function registerUser(user) {
  return axios.post(urlCurrent + "customers", {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
