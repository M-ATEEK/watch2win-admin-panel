import axios from "axios";
import config from "./config";
const instance = axios.create({
	baseURL: config.API_URL + "/api/v1/",
});
export default instance;
