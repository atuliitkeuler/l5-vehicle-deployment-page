import React from "react";
// @ts-ignore
import loader from '../../assets/images/loader.svg'

const Loader = () => {
	return (
		<div>
			<img src={loader} alt={loader}/>
		</div>
	);
}

export default Loader;
