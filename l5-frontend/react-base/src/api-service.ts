import axios, {AxiosError} from 'axios';
import environment from "./env/environment";
import ErrorComponent from "./components/shared/error.component";
// import SnackbarComponent from "./components/shared/snackbar.component";

axios.interceptors.request.use((config) => {
	let authToken = localStorage.getItem('auth');

	if (authToken) {
		config.headers = {
			'Authorization': authToken
		}
	}

	if (config.url?.includes('login')) {
		config = {
			...config,
			data: {
				...config.data,
				fcm_token: ''
			}
		}
	}
	return config;
});

export const getRequest = async (endpoint: string, params: any) => await axios
	.get(`${environment.BASE_URL}/${endpoint}`, {
		params,
	}).catch(handleError);

export const postRequest = async (endpoint: string, params: any) => await axios
	.post(
		`${environment.BASE_URL}/${endpoint}`,
		{...params},
		{
			headers: {
				'client': 'web',
			}
		}).catch(handleError);

const handleError = (error: AxiosError) => {
	if (!navigator.onLine) {
		// return SnackbarComponent({message: 'Please check your Internet connection and try again!'});
	}

	if (error.response?.status === 500) {
		return ErrorComponent(error.response);
	} else if ([401, 403, 404].includes(Number(error.response?.status))) {
		localStorage.clear();
		return ErrorComponent(error.response);
	} else {
		return ErrorComponent(error.response || error);
	}

	throw(error);
}

