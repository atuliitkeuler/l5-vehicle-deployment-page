import {ComponentType} from "react";
import App from "./App";
import {Route, Switch} from "react-router-dom";
import React from "react";
import FourOhFour from "./components/shared/FourOhFour.component";
import WelcomeComponent from "./components/shared/welcome.component";
import LoginComponent from './containers/auth/login.component';
import formComponent from "./containers/l5-vehicle-deployment/l5_vehicle_deployment.component";
import DeleteVehicleComponent from "./containers/l5-vehicle-deployment/delete_vehicle.component";
import UpdateVehicleComponent from "./containers/l5-vehicle-deployment/update_vehicle.component";

interface RouteProps {
	path: string;
	key: string;
	exact: boolean;
	component: ComponentType
}

const Routes: Array<RouteProps> = [
	{
		path: '/',
		key: 'app',
		exact: true,
		component: App
	},
	{
		path: '/login',
		key: 'login',
		exact: true,
		component: LoginComponent
	},
	{
		path: '/welcome',
		key: 'test',
		exact: true,
		component: WelcomeComponent
	},
	{
		path: '/l5',
		key: 'l5-form',
		exact: true,
		component: formComponent
	},
	{
		path: '/delete',
		key: 'delete_vehicle',
		exact: true,
		component: DeleteVehicleComponent
	},
	{
		path: '/update',
		key: 'update_vehicle',
		exact: true,
		component: UpdateVehicleComponent
	}
]

const RouteWithSubRoutes = (route: any) => {
	return (
		<Route
			path={route.path}
			exact={route.exact}
			render={props => <route.component {...props} routes={route.routes} />}
		/>
	);
}

export const RenderRoutes = ({routes}: any) => {
	return (
		<Switch>
			{
				routes.map((route: RouteProps) => <RouteWithSubRoutes {...route} />)
			}
			<Route component={FourOhFour} />
		</Switch>
	);
}

export default Routes;
