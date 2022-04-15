import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Redirect} from 'react-router-dom';
import Routes, {RenderRoutes} from "./routing";
import '/src/stylesheet.css';
import AppPath from './AppPath.constants';
import ErrorBoundary from './components/shared/ErrorBoundary';


ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<BrowserRouter basename={'/'}>
				{!localStorage.getItem('auth') && <Redirect to={AppPath.LOGIN}/>}
				<RenderRoutes routes={Routes}/>
				{
					localStorage.getItem('auth')
						? [AppPath.LOGIN].includes(location.pathname)
							? <Redirect to={AppPath.WELCOME}/>
							: <Redirect to={location.pathname}/>
						: <Redirect to={AppPath.LOGIN}/>
				}
			</BrowserRouter>
		</ErrorBoundary>
	</React.StrictMode>,
    document.getElementById('app')
)
