import {getRequest} from "../../api-service";
import API from "../../API_ENDPOINTS.constant";

const getRefreshToken = async () => {
	const tokenInterval = setInterval(async () => {
		return getRequest(
			API.REFRESH_TOKEN, {})
			.then((response: any) => {
				localStorage.setItem('auth', response?.data?.token);
			})
			.catch(err => {
				console.error(err);
				localStorage.clear();
				location.reload();
				clearInterval(tokenInterval);
			});
	}, 24 * 60 * 60 * 1000 - (15 * 1000));
}

export default getRefreshToken;
