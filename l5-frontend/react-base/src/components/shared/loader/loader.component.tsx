import React from "react";
// @ts-ignore
import loader from '../../../assets/images/loader.svg'
import './loader.component.css';

const Loader = (props: any) => {
	return (
		<div className={props.type}>
			<img src={loader} alt={loader}/>
			{props.message ? <div>{props.message}</div> : ''}
		</div>
	);
}

export default Loader;
