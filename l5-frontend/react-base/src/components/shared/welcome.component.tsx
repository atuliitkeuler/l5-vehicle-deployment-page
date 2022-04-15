import React from "react";
import {getLocalStoreItem} from '../../utils';

const WelcomeComponent = () => {
	return (
		<h1>Welcome {getLocalStoreItem('user')?.full_name || 'Stranger'}!</h1>
	);
}

export default WelcomeComponent;
