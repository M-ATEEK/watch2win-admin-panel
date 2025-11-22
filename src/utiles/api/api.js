import axios from "../../axios-instance";

export const postApi = (route, dataObj) => {
	return axios.post(route, dataObj);
};
export const putApi = (route, dataObj) => {
	return axios.put(route, dataObj);
};
export const patchApi = (route, dataObj) => {
	return axios.patch(route, dataObj);
};

export const getApi = (route) => {
	return axios.get(route);
};

export const removeApi = (route, data) => {
	if (data) {
		return axios.delete(route, {
			data: data,
			headers: {
				"content-type": "application/x-www-form-urlencoded;charset=utf-8",
			},
		});
	} else {
		return axios.delete(route);
	}
};
