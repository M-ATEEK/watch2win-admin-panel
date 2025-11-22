import * as api from "../utiles/api/index";

export const getDifficultyLevel = () => {
	const url = "admin/difficulty";
	return api.getApi(url);
};
