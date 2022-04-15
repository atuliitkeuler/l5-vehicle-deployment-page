import React from "react";
// @ts-ignore
import error500 from '../../assets/images/error-500.svg';

const Error500 = () => {
	return (
		<div className={'flex flex-justify-center'}>
			<img alt={'500.svg'} src={error500}/>
		</div>
	);
}

export default Error500;
