const API_URL = process.env.REACT_APP_API_URL;
const IMG_URL = process.env.REACT_APP_IMG_URL || (process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api/v1', '') : '') || 'http://localhost:8000';

export default {
	API_URL: process.env.REACT_APP_API_URL,
	IMG_URL: IMG_URL,
	GOOGLE_CLIENT_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
	FACEBOOK_APP_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
};
