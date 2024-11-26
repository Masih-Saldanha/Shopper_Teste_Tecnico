import axios from "axios";

import { BASE_URL } from "../constants/constants";

function getDriversListFromDatabase() {
  return axios.get(`${BASE_URL}/driver/list`);
};

const driverService = {
  getDriversListFromDatabase,
};

export default driverService;