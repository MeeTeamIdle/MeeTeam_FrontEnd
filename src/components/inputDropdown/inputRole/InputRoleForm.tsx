import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, XBtn } from '../../../assets';
import S from './InputRoleForm.styled';
import { Role, InputRoleForm } from '../../../types';
import { useDebounce } from '../../../hooks';
import { getRoleKeyword, getSkillKeyword } from '../../../api';
import { useRecoilState } from 'recoil';
import { recruitInputState } from '../../../atom';

const InputRoleForm = ({ userRoleList, setUserRoleList }: InputRoleForm) => {
	const [tagItem, setTagItem] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [info, setInfos] = useRecoilState(recruitInputState);
	const [showDropdown, setShowDropdown] = useState({
		role: false,
		skill: false,
	});
	const [userRole, setUserRole] = useState<Role>({
		id: 0,
		role: {
			id: null,
			name: '',
		},
		count: '',
		skill: [],
	});
	const keywordRole = useDebounce(userRole.role.name, 500);
	const keywordSkill = useDebounce(content, 500);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const {
		data: dataRole,
		isLoading: isLoadingRole,
		refetch: refetchRole,
	} = useQuery({
		queryKey: ['searchRole', keywordRole],
		queryFn: () => getRoleKeyword(keywordRole),
		staleTime: 10000,
	});

	const { data: dataSkill, isLoading: isLoadingSkill } = useQuery({
		queryKey: ['searchSkill', keywordSkill],
		queryFn: () => getSkillKeyword(keywordSkill),
	});

	const submitTagItem = () => {
		setUserRole(prevState => ({
			...prevState,
			skill: [...prevState.skill, tagItem],
		}));
		setTagItem('');
	};

	const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const target = event.currentTarget;
		if (target.value.length !== 0 && event.key === 'Enter') {
			event.preventDefault();
			submitTagItem();
		}
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	};

	const deleteTagItem = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (event.target instanceof Element) {
			const deletedIndex = Number(event.target.id);
			setUserRole(prevState => ({
				...prevState,
				skill: prevState.skill.filter((_, index) => index !== deletedIndex),
			}));
		}
	};

	const onClickHandler = () => {
		setUserRoleList([...userRoleList, userRole]);
		setUserRole({
			id: userRoleList.length + 1,
			role: { id: null, name: '' },
			count: '',
			skill: [],
		});
	};
	console.log(userRoleList);

	const onChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserRole({
			...userRole,
			role: { ...userRole.role, name: event.target.value },
		});
	};

	const onChangeCount = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserRole({
			...userRole,
			count: event.target.value,
		});
	};

	const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTagItem(event.target.value);
		setContent(event.target.value);
	};

	const onClickRole = (event: React.MouseEvent<HTMLSpanElement>) => {
		const { innerText } = event.target as HTMLElement;
		setUserRole(prev => ({ ...prev, role: { ...userRole.role, name: innerText } }));
		setShowDropdown(prev => ({
			...prev,
			role: false,
		}));
	};

	const onClickSkill = (event: React.MouseEvent<HTMLSpanElement>) => {
		const { innerText } = event.target as HTMLElement;
		setUserRole(prev => ({ ...prev, skill: [...prev.skill, innerText] }));
		setShowDropdown(prev => ({
			...prev,
			skill: false,
		}));
	};

	useEffect(() => {
		const outsideClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				showDropdown.role &&
				dropdownRef.current &&
				!dropdownRef.current.contains(target as Node)
			) {
				setShowDropdown(prev => ({
					...prev,
					role: false,
				}));
			}
			if (
				showDropdown.skill &&
				dropdownRef.current &&
				!dropdownRef.current.contains(target as Node)
			) {
				setShowDropdown(prev => ({
					...prev,
					skill: false,
				}));
			}
		};
		document.addEventListener('mousedown', outsideClick);
		return () => {
			document.removeEventListener('mousedown', outsideClick);
		};
	}, [dropdownRef.current, showDropdown.role, showDropdown.skill]);

	return (
		<S.InputRoleForm $isRoleClicked={showDropdown.role} $isSkillClicked={showDropdown.skill}>
			<article className='inputs' ref={dropdownRef}>
				<input
					className='role-input'
					type='text'
					placeholder='역할'
					value={userRole.role.name}
					onChange={onChangeRole}
					onClick={() => setShowDropdown(prev => ({ ...prev, role: !prev.role }))}
				/>
				{showDropdown.role && (
					<section className='dropdown'>
						{!isLoadingRole &&
							dataRole?.map((keyword: any, index: number) => (
								<span key={index} onClick={onClickRole}>
									{keyword.name}
								</span>
							))}
					</section>
				)}
				<input
					className='count-input'
					type='number'
					placeholder='인원'
					value={userRole.count}
					onChange={onChangeCount}
				/>
				<section className='container-skills'>
					{userRole.skill.map((tagItem, index) => {
						return (
							<article className='container-tags' key={index}>
								<span>{tagItem}</span>
								<button type='button' onClick={deleteTagItem}>
									<img src={XBtn} id={index.toString()} />
								</button>
							</article>
						);
					})}
					<input
						type='text'
						className='skills-input'
						placeholder={userRole.skill.length ? '' : '태그를 입력하고 엔터를 누르세요.'}
						value={tagItem}
						onChange={onChangeKeyword}
						onKeyPress={onKeyPress}
						onClick={() => setShowDropdown(prev => ({ ...prev, skill: !prev.skill }))}
					/>
				</section>
				{showDropdown.skill && (
					<section className='dropdown skill'>
						{!isLoadingSkill &&
							dataSkill?.map((keyword: any) => (
								<span key={keyword.id} onClick={onClickSkill}>
									{keyword.name}
								</span>
							))}
					</section>
				)}
			</article>
			<article className='add-btn'>
				<button type='button' onClick={onClickHandler}>
					<img src={Plus} />
				</button>
			</article>
		</S.InputRoleForm>
	);
};

export default InputRoleForm;
