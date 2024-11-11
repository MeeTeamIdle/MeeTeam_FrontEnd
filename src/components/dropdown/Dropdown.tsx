import React, { useState, useRef, useEffect } from 'react';
import S from './Dropdown.styled';
import { useOutsideClick } from '../../hooks';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { applicantFilter, recruitFilterState, recruitFilterStateAuth } from '../../atom';
import { ManageRole } from '../../types';
import { DropdownArrowUp, DropdownArrow } from '../../assets';
import { useSearchParams } from 'react-router-dom';

interface Dropdown {
	data?: string[];
	initialData?: string;
	$showDropdown?: boolean;
	category?: boolean;
	applicant?: boolean;
	roleObj?: ManageRole[];
}

type keyObj = {
	[key: string]: number;
};

const categoryObj: keyObj = {
	'모든 유형': 0,
	프로젝트: 1,
	스터디: 2,
	공모전: 3,
};

const Dropdown = ({ data, initialData, category, applicant, roleObj }: Dropdown) => {
	const [currentValue, setCurrentValue] = useState<string | undefined>(`${initialData}`);
	const [showDropdown, setShowDropdown] = useState<boolean>(false);
	const [dropdown, setDropdown] = useState({
		course: false,
		professor: false,
	});
	const [isCategorySelected, setIsCategorySelected] = useState(false);
	const insideRef = useRef<HTMLDivElement | null>(null);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const setApplicantFilter = useSetRecoilState(applicantFilter);
	const [filterState, setFilterState] = useRecoilState(recruitFilterState);
	const [filterStateAuth, setFilterStateAuth] = useRecoilState(recruitFilterStateAuth);
	const [searchParams, setSearchParams] = useSearchParams();

	const getKeyByValue = (obj: keyObj, value: number) => {
		return Object.keys(obj).find(key => obj[key] === value);
	};

	const onClickDropdown = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		setShowDropdown(prev => !prev);
	};

	const onClickList = (event: React.MouseEvent<HTMLElement>, id?: number) => {
		event.stopPropagation();
		const { innerText } = event.target as HTMLElement;

		setCurrentValue(innerText);

		if (applicant && id) {
			setApplicantFilter(id);
		} else if (location.pathname === '/') {
			if (innerText === '모든 유형') {
				searchParams.delete('category');
				setSearchParams(searchParams);
				setShowDropdown(false);
			} else {
				searchParams.set('category', categoryObj[innerText].toString());
				setSearchParams(searchParams);
			}
			setFilterState(prev => ({ ...prev, category: Number(searchParams.get('category')) }));
			setIsCategorySelected(true);
		} else if (location.pathname === '/campus') {
			if (innerText === '모든 유형') {
				searchParams.delete('category');
				setSearchParams(searchParams);
				setShowDropdown(false);
			} else {
				searchParams.set('category', categoryObj[innerText].toString());
				setSearchParams(searchParams);
			}
			setFilterStateAuth(prev => ({ ...prev, category: Number(searchParams.get('category')) }));
			setIsCategorySelected(true);
		}

		setShowDropdown(false);
	};

	useOutsideClick(dropdownRef, showDropdown, setShowDropdown);
	useOutsideClick(insideRef, dropdown.course, () =>
		setDropdown(prev => ({ ...prev, course: false }))
	);
	useOutsideClick(insideRef, dropdown.professor, () =>
		setDropdown(prev => ({ ...prev, professor: false }))
	);

	useEffect(() => {
		if (category && filterState.category !== null) {
			setCurrentValue(getKeyByValue(categoryObj, filterState.category));
			setIsCategorySelected(true);
		}
		if (category && filterState.category === null) {
			setCurrentValue('유형');
			setIsCategorySelected(false);
		}
	}, [filterState.category, category]);

	useEffect(() => {
		if (category && filterStateAuth.category !== null) {
			setCurrentValue(getKeyByValue(categoryObj, filterStateAuth.category));
			setIsCategorySelected(true);
		}
		if (category && filterStateAuth.category === null) {
			setCurrentValue('유형');
			setIsCategorySelected(false);
		}
	}, [filterStateAuth.category, category]);

	return (
		<S.Dropdown
			$showDropdown={showDropdown}
			ref={dropdownRef}
			$isCategorySelected={isCategorySelected}
		>
			<article className='wrapper' onClick={onClickDropdown}>
				<div className='dropdown-box'>
					{category && (
						<div className='value category-selected'>
							{filterState.category
								? getKeyByValue(categoryObj, filterState.category)
								: currentValue}
						</div>
					)}
					{applicant && <div className='value'>{currentValue}</div>}
					<img src={showDropdown ? DropdownArrowUp : DropdownArrow} alt='드롭다운 아이콘' />
				</div>
				{showDropdown && (
					<>
						<div className='dropdown'>
							{category && (
								<ul className='menu-container category'>
									{data?.map((e: string, index: number) => (
										<li onClick={onClickList} key={index}>
											{e}
										</li>
									))}
								</ul>
							)}
							{applicant && (
								<ul className='menu-container category'>
									{roleObj?.map(e => (
										<li
											onClick={event => onClickList(event, e.id as number | undefined)}
											key={e.id}
										>
											{e.title}
										</li>
									))}
								</ul>
							)}
						</div>
					</>
				)}
			</article>
		</S.Dropdown>
	);
};

export default Dropdown;
