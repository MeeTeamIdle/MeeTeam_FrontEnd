import React, { useEffect, useState } from 'react';
import S from './CampusToggle.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { needLoginModalState, recruitFilterState, recruitFilterStateAuth } from '../../../../atom';
import { useLogin } from '../../../../hooks';
import ModalBackground from '../../../modalBackground/ModalBackground';
import NeedLogin from '../../recruitDetail/modal/needLogin/NeedLogin';

const CampusToggle = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { isLogin } = useLogin();

	const [isCampus, setIsCampus] = useState<boolean>(false);
	const [needLoginModal, setNeedLoginModal] = useRecoilState(needLoginModalState);

	const setFilterState = useSetRecoilState(recruitFilterState);
	const setFilterStateAuth = useSetRecoilState(recruitFilterStateAuth);

	const handleCampusOutClick = () => {
		navigate('/');
		setFilterStateAuth({
			scope: 1,
			category: null,
			field: null,
			skill: [],
			role: [],
			tag: [],
			keyword: '',
			course: null,
			professor: null,
		});
		setIsCampus(false);
	};

	const handleCampusInClick = () => {
		if (!isLogin) {
			setNeedLoginModal({ isOpen: true, type: 'SCHOOL_RECRUIT' });
			return;
		}

		navigate('/campus');
		setFilterState({
			scope: 2,
			category: null,
			field: null,
			skill: [],
			role: [],
			tag: [],
			keyword: '',
			course: null,
			professor: null,
		});
		setIsCampus(true);
	};

	useEffect(() => {
		if (location.pathname === '/campus') {
			setIsCampus(true);
		} else {
			setIsCampus(false);
		}
	}, [location.pathname]);

	return (
		<>
			<S.CampusToggle>
				<article
					className={`wrapper ${isCampus ? 'notSelected' : 'selected'}`}
					onClick={handleCampusOutClick}
				>
					<span className='h3 option'>교외</span>
				</article>
				<article
					className={`wrapper ${isCampus ? 'selected' : 'notSelected'}`}
					onClick={handleCampusInClick}
				>
					<span className='h3 option'>교내</span>
				</article>
			</S.CampusToggle>
			{needLoginModal.isOpen && (
				<ModalBackground>
					<NeedLogin type={needLoginModal.type} />
				</ModalBackground>
			)}
		</>
	);
};

export default CampusToggle;
