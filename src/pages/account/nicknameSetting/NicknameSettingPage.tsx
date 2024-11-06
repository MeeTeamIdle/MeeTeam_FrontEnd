import React, { useState, useEffect } from 'react';
import S from './NicknameSettingPage.styled';
import { SIGN_UP_DATA } from '../signUp/SignUpData';
import { useNavigate } from 'react-router-dom';
import { useNaverSignUp, useCheckDuplicateNickname, useDebounce } from '../../../hooks';
import { useSetRecoilState } from 'recoil';
import { userState, loginState } from '../../../atom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input, PrimaryBtn } from '../../../components';

interface FormValues {
	nickname: string;
}

const NicknameSettingPage = () => {
	const title = `밋팀에서 사용하실\n닉네임을 설정해주세요`;

	const navigate = useNavigate();

	const { register, handleSubmit, watch, formState } = useForm<FormValues>({
		mode: 'onChange',
	});
	const { isDirty, isValid } = formState;

	const setUserState = useSetRecoilState(userState);
	const setLoginState = useSetRecoilState(loginState);

	const checkNaverSignUpInSuccess = () => {
		navigate('/signup/complete', { replace: true });
		localStorage.removeItem('naverSignUpState');
		localStorage.removeItem('submitEmailState');
	};

	const { mutate } = useNaverSignUp({
		onSuccess: checkNaverSignUpInSuccess,
		setUserState,
		setLoginState,
	});

	const naverSignUpHandler: SubmitHandler<FormValues> = data => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('emailcode');

		code && mutate({ emailCode: code, nickname: data.nickname });
	};

	const nickname = useDebounce(watch('nickname'));
	const authKeys = ['checkDuplicateNickname', nickname];
	const { data } = useCheckDuplicateNickname(authKeys, isDirty && isValid && !!nickname);

	const [duplicateNicknameValidation, setDuplicateNicknameValidation] = useState('');
	const [duplicated, setDuplicated] = useState(false);

	const checkDuplicateNickname = () => {
		if (data && !data.isEnable) {
			setDuplicateNicknameValidation(() => '이미 사용중인 닉네임입니다');
			setDuplicated(true);
		} else if (data?.isEnable) {
			setDuplicateNicknameValidation(() => '사용가능한 닉네임입니다');
			setDuplicated(false);
		}
	};

	useEffect(() => checkDuplicateNickname(), [data?.isEnable]);

	return (
		<S.NicknameSettingPageLayout>
			<header className='account__header'>
				<h1>{title}</h1>
			</header>
			<S.NicknameSettingPageForm onSubmit={handleSubmit(naverSignUpHandler)}>
				{SIGN_UP_DATA.map(
					({ name, ...props }, index) =>
						name === 'nickname' && (
							<S.NicknameSettingPageContainer key={index}>
								<Input
									register={register}
									formState={formState}
									name={name}
									{...props}
									duplicated={duplicated}
									duplicatedMessage={isValid ? duplicateNicknameValidation : ''}
								/>
							</S.NicknameSettingPageContainer>
						)
				)}
				<div>
					<PrimaryBtn title='확인' type='submit' disabled={!isValid || duplicated} />
				</div>
			</S.NicknameSettingPageForm>
		</S.NicknameSettingPageLayout>
	);
};
export default NicknameSettingPage;
