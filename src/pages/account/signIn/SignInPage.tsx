import React, { useState, useEffect } from 'react';
import S from './SignInPage.styled';
import { NaverLogin } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useCheckExist } from '../../../hooks';
import { useSetRecoilState } from 'recoil';
import { userState, loginState } from '../../../atom';
import { MeeteamLogoLarge } from '../../../assets';
import secureLocalStorage from 'react-secure-storage';

const SignInPage = () => {
	const navigate = useNavigate();
	const [callBack, setCallBack] = useState(true);

	const getAuthCode = () => {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get('code');
	};

	const setUserState = useSetRecoilState(userState);
	const setLoginState = useSetRecoilState(loginState);

	const handleNaverSignInSuccess = () => {
		if (secureLocalStorage.getItem('ACCESS_TOKEN_KEY')) {
			return navigate('/campus');
		}
		return navigate('/signup/school');
	};

	const { mutate } = useCheckExist({
		onSuccess: handleNaverSignInSuccess,
		setUserState: setUserState,
		setLoginState: setLoginState,
	});

	useEffect(() => {
		const code = getAuthCode();
		!code && setCallBack(false);
		code && mutate({ authorizationCode: code });
	}, [mutate]);

	return (
		<S.SignInPageLayout $callBack={callBack}>
			<header className='sign-in__header'>
				<img src={MeeteamLogoLarge} alt='밋팀로고' fetchpriority='high' />
			</header>
			<article className='sign-in__wrapper'>
				<div className='sign-in__social-login-marker'>
					<hr className='sign-in__horizon' />
					<span className='sign-in__subtitle'>소셜 계정 로그인</span>
					<hr className='sign-in__horizon' />
				</div>
				<div>
					<NaverLogin />
				</div>
			</article>
		</S.SignInPageLayout>
	);
};

export default SignInPage;
