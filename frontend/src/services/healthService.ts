import axios from "axios";

import { BASE_URL } from "../constants/constants";

function getHealth() {
  return axios.get(`${BASE_URL}/health`);
};

const healthService = {
  getHealth,
};

export default healthService;