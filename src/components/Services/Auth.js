const setToken = (token) => {
	localStorage.setItem("token", token);
};

const getToken = () => {
	return localStorage.getItem("token");
};

const isAuthenticated = () => {
	if (getToken()) {
		return true;
	}

	return false;
};

export default {
	setToken: setToken,
	getToken: getToken,
	isAuthenticated: isAuthenticated,
};
