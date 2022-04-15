import React, {useState} from "react";
import {Link} from "react-router-dom";
import {getRequest} from "./api-service";
import {AxiosResponse} from "axios";
// @ts-ignore
import logo from './assets/images/eul-logo.svg';
import Loader from "./components/shared/loader.component";

const App = () => {
	/**
	 * Sample  state implementation
	 */
	const [data, updateData] = useState([]);

	const [loader, updateLoader] = useState(false);

	const [error, handleError] = useState(null);

	/**
	 * Sample API call and state update triggering
	 */
	const fetchAnalyticsData = async () => {
		updateLoader(true);
		return  await getRequest(
			'fleet-analytics',
			{
				cities: '[all]',
				vehicles: '[all]',
				last_n_days: 1,
				clients: '[all]'
			})
			.then((resp: AxiosResponse) => {
				updateLoader(false);
				updateData(resp.data.charts);
			})
			.catch((error) => {
				updateLoader(false);
				handleError(error);
			});

	}

    return (
    	<>
			<div>
				<img src={logo} alt={'logo'} title={'Image load testing'}/>
				<h1>Euler Motors</h1>
			</div>
			<h3>Root Component (working on default route '/')</h3>

			<div>
				<h3><Link to={'/welcome'}>Test Route</Link></h3>
			</div>

			<div>
				<button onClick={fetchAnalyticsData}>Fetch Data from API call</button>

				<div>API data will appear below</div>
				{
					loader
						? <Loader/>
						: data.map((chart: any, key) => <div key={key}>{chart.title}: {chart.value}</div>)
				}

				{ error ? <h3>Something went wrong</h3> : null}
			</div>
		</>
    );
}


export default App;
