import React, { useState, useRef } from 'react';
import S from './Header.styled';
import { useNavigate } from 'react-router-dom';
import { DropdownArrow } from '../../assets';
import { ProfileImage } from '..';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, loginState } from '../../atom';
import { useSignOut, useLogin, useReadProfileImage, useOutsideClick } from '../../hooks';

const Header = () => {
	const { isLogin } = useLogin();
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();

	const [openDrop, setOpenDrop] = useState<boolean>(false);
	const [userInfo, setUserState] = useRecoilState(userState);

	const setLoginState = useSetRecoilState(loginState);

	const { mutate: signOut } = useSignOut({ setUserState, setLoginState });
	const { data: profileImage } = useReadProfileImage(isLogin);

	const onClickMy = () => {
		if (!isLogin) {
			navigate('/signin');
		} else {
			setOpenDrop(prev => !prev);
		}
	};

	const handleLogOutButtonClick = () => {
		signOut();
		navigate('/');
		setOpenDrop(false);
	};

	const handleLogoClick = () => {
		navigate('/');
	};

	useOutsideClick(dropdownRef, openDrop, setOpenDrop);

	return (
		<S.Header $isLogin={isLogin}>
			<div className='header'>
				<section className='header-leftside'>
					<div className='header__logo' onClick={handleLogoClick}>
						<img
							className='logo'
							src='/logo_typo_large.webp'
							srcSet='/logo_typo_small.webp 600w, /logo_typo_medium.webp 900w, /logo_typo_large.webp 1280w'
							loading='eager'
							sizes='(max-width: 600px) 600px, (max-width: 900px) 900px, 1280px'
							alt='logo_typo'
						/>
						{isLogin && <span className='university'>{userInfo?.university}</span>}
					</div>
				</section>
				<section>
					<div className='header__menu'>
						<div className='header__menu--my' ref={dropdownRef}>
							<section onClick={onClickMy}>
								{isLogin ? (
									<article className='icon-container'>
										<div className='icon-border'>
											<ProfileImage url={profileImage?.imageUrl} size='3rem' />
										</div>
										<img src={DropdownArrow} alt='드롭다운 아이콘' />
									</article>
								) : (
									<span className='login'>로그인</span>
								)}
							</section>
							{openDrop && (
								<div className='dropdown'>
									<div
										className='menu'
										onClick={() => {
											setOpenDrop(false);
											navigate(`/profile/${userInfo?.userId}`);
										}}
									>
										프로필
									</div>
									<div
										className='menu'
										onClick={() => {
											setOpenDrop(false);
											navigate('/portfolio/management');
										}}
									>
										포트폴리오
									</div>
									<div
										className='menu'
										onClick={() => {
											setOpenDrop(false);
											navigate('/account');
										}}
									>
										계정 설정
									</div>
									<div
										className='menu'
										onClick={() => {
											setOpenDrop(false);
											navigate('/management/bookmark');
										}}
									>
										구인글 관리
										<hr />
									</div>
									<div className='menu logout' onClick={handleLogOutButtonClick}>
										로그아웃
									</div>
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		</S.Header>
	);
};

export default Header;
