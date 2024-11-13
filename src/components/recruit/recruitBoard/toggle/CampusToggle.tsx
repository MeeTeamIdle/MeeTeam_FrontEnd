import React, { useState } from 'react';
import S from './CampusToggle.styled';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { recruitFilterState, recruitFilterStateAuth } from '../../../../atom';

const CampusToggle = () => {
	const navigate = useNavigate();
	const setFilterState = useSetRecoilState(recruitFilterState);
	const setFilterStateAuth = useSetRecoilState(recruitFilterStateAuth);

	const [isCampus, setIsCampus] = useState<boolean>(false);

	const handleCampusInClick = () => {
		navigate('/campus');
		setFilterState({
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
		setIsCampus(true);
	};

	const handleCampusOutClick = () => {
		navigate('/');
		setFilterStateAuth({
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
		setIsCampus(false);
	};

	return (
		<S.CampusToggle>
			<article
				className={`wrapper ${isCampus ? 'selected' : 'notSelected'}`}
				onClick={handleCampusInClick}
			>
				<span className='h3'>교내</span>
			</article>
			<article
				className={`wrapper ${isCampus ? 'notSelected' : 'selected'}`}
				onClick={handleCampusOutClick}
			>
				<span className='h3'>교외</span>
			</article>
		</S.CampusToggle>
	);
};

export default CampusToggle;
