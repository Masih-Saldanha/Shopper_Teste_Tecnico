import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function getDriversListFromDatabase() {
  return axios.get(`${BASE_URL}/driver/list`);
};

const driverService = {
  getDriversListFromDatabase,
};

export default driverService;