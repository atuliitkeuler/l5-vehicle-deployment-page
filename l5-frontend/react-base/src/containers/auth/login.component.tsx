import React, {useEffect, useState} from "react";
import {postRequest} from "../../api-service";
import API from './../../API_ENDPOINTS.constant';
import Loader from "../../components/shared/loader/loader.component";
import LOADER_TYPE from "../../loader.constant";
import {setLocalStoreItem} from "../../utils";
import './login.component.css';
// @ts-ignore
import eulerLogo from '../../assets/images/eul-logo-theme.svg'
import AppPath from "../../AppPath.constants";
import {IconButton, InputAdornment, TextField} from '@mui/material';
import {Visibility, VisibilityOff} from '@material-ui/icons';

const Login = () => {
	const [email, updateEmail] = useState('');

	const [password, updatePassword] = useState('');

	const [formError, updateFormError] = useState({message: '', isError: false});

	const [loader, updateLoader] = useState(false);

	// const EMAIL_RULE = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	useEffect(() => {
		updateFormError(formError);
	}, [formError]);

	const handleEmailInput = (event: any) => {
		// if (!EMAIL_RULE.test(event.target.value)) {
		// 	updateFormError({message: 'Please enter valid email', isError: true});
		// } else {
		// 	updateFormError({message: '', isError: false});
		// }

		updateEmail(event.target.value);
	}

	const handlePasswordInput = (event: any) => {
		if (event.target.value.length < 4) {
			updatePassword(event.target.value);
			updateFormError({message: 'Please enter password (min 4 characters)', isError: true});
		} else {
			updatePassword(event.target.value);
			updateFormError({message: '', isError: false});
		}
	}

	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordToggle = () => {
		setShowPassword(prev => !prev);
	}

	const handleLogin = async () => {
		if (email && password) {
			updateLoader(true);

			const response: any = await postRequest(
				API.LOGIN,
				{
					user_key: email,
					password: password
				}
			);

			if (response?.status === 200) {
				updateLoader(false);
				// @ts-ignore
				setLocalStoreItem('user', JSON.stringify(response && (response.data)));
				// @ts-ignore
				setLocalStoreItem('auth', response && response.data && response.data.token);
				// @ts-ignore
				setLocalStoreItem('user_id', getUserIdFromToken(response.data.token));
				location.assign(AppPath.WELCOME);
			} else {
				updateLoader(false);
				updateFormError({message: 'Invalid Credentials', isError: true});
			}
		}
	}

	const getUserIdFromToken = (token: string) => {
		if (token) {
			return JSON.parse(atob(token.split('.')[1])).user_id;
		}
	}

	return (
		<div className={'login-container'}>
			<div className={'left-section'}>
				<div className={'clip'}/>
				<div className={'left-section-content'}>
					<div className={'left-section-heading'}>{'Euler Motors'}</div>
					<div className={'left-section-subheading'}>{'Moving Today For Tomorrow'}</div>
				</div>
			</div>
			<div className={'form-container'}>
				<form className={'form'} autoComplete={'on'}>
					<img src={eulerLogo} alt={'euler-logo'}/>
					<div className={'login-title'}>Please login to continue</div>
					<TextField
						title={'email'}
						placeholder={'Username or E-mail or Phone number'}
						type={'email'}
						value={email}
						label={'Username/E-mail/Phone'}
						variant={'outlined'}
						onChange={handleEmailInput}
					/>

					<TextField
						title={'password'}
						placeholder={'°°°°°°°°°°°'}
						type={showPassword ? 'text' : 'password'}
						value={password}
						label={'Password'}
						variant={'outlined'}
						onChange={handlePasswordInput}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={handlePasswordToggle}
										edge="end"
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
					{
						formError?.isError ? <div className={'error-text'}>{formError.message}</div> : ''
					}

					{
						loader
							? <Loader type={LOADER_TYPE.COMPONENT}/>
							: <button type={"button"} disabled={formError?.isError || !email || !password} onClick={handleLogin}>Sign In</button>
					}
				</form>
			</div>
		</div>
	);
}

export default Login;
