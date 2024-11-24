import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function getHealth() {
  return axios.get(`${BASE_URL}/health`);
};

const networkRequests = {
  getHealth,
};

export default networkRequests;