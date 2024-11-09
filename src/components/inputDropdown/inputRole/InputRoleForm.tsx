import React, { useState, useRef, useEffect, useCallback } from 'react';
import S from './InputRoleForm.styled';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { isNotNumber } from '../../../utils';
import { recruitInputState } from '../../../atom';
import { useDebounce, useOutsideClick, useValid } from '../../../hooks';
import { GrayDelete, SearchIcon, XBtn } from '../../../assets';
import { RoleForPost, Keyword } from '../../../types';
import { getRoleKeyword, getSkillKeyword } from '../../../service';
import TextBox from '../../dropdown/textBox/TextBox';

interface InputRoleObj {
	id?: number | null;
	role?: string;
	count?: string | number;
	skills?: Keyword[];
	onDelete?: (id: number | null) => void;
}

const InputRoleForm = (props: InputRoleObj) => {
	const { id, role, count, skills, onDelete } = props;
	const containerRef = useRef<HTMLDivElement>(null);
	const [tagItem, setTagItem] = useState<string>('');
	const [info, setInfos] = useRecoilState(recruitInputState);
	const [dropdown, setDropdown] = useState({
		role: false,
		skill: false,
	});
	const [roleData, setRoleData] = useState<RoleForPost>({
		roleId: id ? id : null,
		count: count ? count : null,
		skillIds: skills ? skills.map(e => e.id) : [],
		roleName: role ? role : '',
		skills: skills ? skills : [],
	});
	const [isValidBeforeSubmit, setisValidBeforeSubmit] = useState({
		role: {
			valid: false,
			message: '',
		},
		count: {
			valid: false,
			message: '',
		},
	});

	const keywordRole = useDebounce(roleData.roleName, 500);
	const keywordSkill = useDebounce(tagItem, 500);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const { isValid } = useValid(info);

	const { data: dataRole, isPending: isPendingRole } = useQuery({
		queryKey: ['searchRole', keywordRole],
		queryFn: () => getRoleKeyword(keywordRole as string),
		staleTime: Infinity,
		gcTime: Infinity,
		enabled: !!keywordRole,
	});

	const { data: dataSkill, isPending: isPendingSkill } = useQuery({
		queryKey: ['searchSkill', keywordSkill],
		queryFn: () => getSkillKeyword(keywordSkill),
		staleTime: Infinity,
		gcTime: Infinity,
		enabled: !!keywordSkill,
	});

	const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	};

	const deleteTagItem = (deletedId: number) => {
		if (id) {
			setInfos(prev => ({
				...prev,
				recruitmentRoles: prev.recruitmentRoles.map(role =>
					role.roleId === id
						? {
								...role,
								skills: role.skills?.filter(skill => skill.id !== deletedId),
								skillIds: role.skillIds.filter(id => id !== deletedId),
							}
						: role
				),
			}));
		}
		setRoleData(prevState => ({
			...prevState,
			skills: prevState?.skills?.filter(skill => skill.id !== deletedId),
			skillIds: prevState?.skillIds.filter(id => id !== deletedId),
		}));
	};

	const onClickSkillInput = (event: React.MouseEvent<HTMLInputElement>) => {
		event.stopPropagation();
	};

	const deleteTagHandler = (event: React.MouseEvent<HTMLButtonElement>, deleteId: number) => {
		event.stopPropagation();
		deleteTagItem(deleteId);
	};

	const onChangeRole = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			event.preventDefault();
			const roleKeyword = event.target.value;
			setRoleData(prev => ({
				...prev,
				roleName: roleKeyword,
				count: prev.count,
			}));
			if (roleKeyword === '') {
				setRoleData(prev => ({
					...prev,
					roleName: '',
					count: null,
				}));
				setInfos(prev => ({
					...prev,
					recruitmentRoles: prev.recruitmentRoles.map(role =>
						role.roleId === id
							? {
									...role,
									roleName: roleKeyword,
								}
							: role
					),
				}));
			}
			setDropdown({ role: roleKeyword.length > 0, skill: false });
		},
		[id, setInfos]
	);

	const onChangeCount = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			event.preventDefault();
			let countValue = event.target.value;

			if (!isNotNumber(countValue)) {
				countValue = countValue.replace(/\D/g, '');
			}

			if (id) {
				setRoleData(prev => {
					const updatedRoleData = { ...prev, count: countValue };
					setInfos(prevInfos => ({
						...prevInfos,
						recruitmentRoles: prevInfos.recruitmentRoles.map(role =>
							role.roleId === updatedRoleData.roleId
								? { ...role, count: Number(updatedRoleData.count) }
								: role
						),
					}));
					return updatedRoleData;
				});
			} else {
				setInfos(prev => {
					const recruitmentRoles = prev.recruitmentRoles.map(role => {
						if (role.roleId === null) {
							return { ...role, count: Number(countValue) };
						}
						return role;
					});

					return { ...prev, recruitmentRoles };
				});
				setRoleData(prev => ({ ...prev, count: countValue }));
			}
			setisValidBeforeSubmit(prev => ({
				...prev,
				count: { valid: roleData.count !== null && roleData.count !== 0, message: '' },
			}));
		},
		[id, roleData.count, setInfos]
	);

	const onChangeKeyword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setTagItem(event.target.value);
		setDropdown({ role: false, skill: true });
		if (event.target.value === '') {
			setDropdown({ role: false, skill: false });
		}
	}, []);

	const onClickRole = (event: React.MouseEvent<HTMLSpanElement>) => {
		const { innerText } = event.target as HTMLElement;
		const target = event.target as HTMLElement;
		const roleExists = info.recruitmentRoles.some(r => r.roleName === innerText);

		if (!roleExists) {
			if (id) {
				setRoleData(prev => ({
					...prev,
					roleName: innerText,
					roleId: Number(target.id),
				}));
				setInfos(prev => ({
					...prev,
					recruitmentRoles: prev.recruitmentRoles.map(role =>
						role.roleId === id ? { ...role, roleName: innerText, roleId: Number(target.id) } : role
					),
				}));
				setDropdown(prev => ({ ...prev, role: false }));
			} else {
				setInfos(prev => {
					const recruitmentRoles = prev.recruitmentRoles.map(role => {
						if (role.roleId === null) {
							return { ...role, roleName: innerText, roleId: Number(target.id) };
						}

						return role;
					});

					return { ...prev, recruitmentRoles };
				});
			}
		}
	};

	const onClickSkill = (event: React.MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		const { innerText } = event.target as HTMLElement;
		const target = event.target as HTMLElement;
		if (
			id &&
			!roleData.skills?.map(e => e.name).includes(innerText) &&
			roleData.skillIds.length < 5
		) {
			setRoleData(prev => {
				const updatedRoleData = {
					...prev,
					skillIds: [...prev.skillIds, Number(target.id)],
					skills: [...(prev.skills as any), { id: Number(target.id), name: innerText }],
				};

				setInfos(prevInfos => ({
					...prevInfos,
					recruitmentRoles: prevInfos.recruitmentRoles.map(role =>
						role.roleId === updatedRoleData.roleId
							? {
									...role,
									skills: [
										...(role.skills?.some(skill => skill.id === Number(target.id))
											? role.skills
											: [...(role.skills || []), { id: Number(target.id), name: innerText }]),
									],
									skillIds: [
										...role.skillIds,
										...(role.skillIds.includes(Number(target.id)) ? [] : [Number(target.id)]),
									],
								}
							: role
					),
				}));

				return updatedRoleData;
			});

			setTagItem('');
		} else {
			if (!roleData.skills?.map(e => e.name).includes(innerText) && roleData.skillIds.length < 5) {
				setRoleData(prev => {
					const updatedRoleData = {
						...prev,
						skillIds: [...prev.skillIds, Number(target.id)],
						skills: [...(prev.skills || []), { id: Number(target.id), name: innerText }],
					};

					setInfos(prevInfos => ({
						...prevInfos,
						recruitmentRoles: prevInfos.recruitmentRoles.map(role =>
							role.roleId === updatedRoleData.roleId || role.roleId === null
								? {
										...role,
										skills: [
											...(role.skills?.some(skill => skill.id === Number(target.id))
												? role.skills
												: [...(role.skills || []), { id: Number(target.id), name: innerText }]),
										],
										skillIds: [
											...role.skillIds,
											...(role.skillIds.includes(Number(target.id)) ? [] : [Number(target.id)]),
										],
									}
								: role
						),
					}));

					return updatedRoleData;
				});
				setTagItem('');
			}
		}
	};

	const skillInputHandler = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		setDropdown({ role: false, skill: !dropdown.skill });
	};

	const applyEllipsis = useCallback((container: HTMLDivElement) => {
		const children = Array.from(container.children) as HTMLDivElement[];
		let totalWidth = 0;
		const containerWidth = container.clientWidth;

		children.forEach(child => {
			totalWidth += child.offsetWidth;
			if (totalWidth > containerWidth) {
				child.style.display = 'none';
			} else {
				child.style.display = '';
			}
		});

		const existingEllipsis = container.querySelector('.ellipsis');
		if (existingEllipsis) {
			existingEllipsis.remove();
		}

		if (totalWidth > containerWidth) {
			const ellipsis = document.createElement('div');
			ellipsis.classList.add('ellipsis');
			ellipsis.innerText = '...';
			container.appendChild(ellipsis);
		}
	}, []);

	const deleteRoleHandler = () => {
		if (id && onDelete) {
			onDelete(id);
		} else if (onDelete) {
			onDelete(null);
		}
	};

	useOutsideClick(dropdownRef, dropdown.role, () => {
		setDropdown({
			role: false,
			skill: false,
		});
	});

	useOutsideClick(dropdownRef, dropdown.skill, () => {
		setDropdown({
			role: false,
			skill: false,
		});
	});

	useEffect(() => {
		if (containerRef.current) {
			applyEllipsis(containerRef.current);
		}
	}, [dropdown.skill, roleData.skills, applyEllipsis]);

	useEffect(() => {
		if (isValid.isRoleSubmitted) {
			if (roleData.roleName === '') {
				setisValidBeforeSubmit(prev => ({
					...prev,
					role: {
						valid: roleData.roleName !== '',
						message: roleData.roleName !== '' ? '' : '역할을 입력해주세요.',
					},
				}));
			} else if (roleData.count === null || roleData.count === 0) {
				setisValidBeforeSubmit(prev => ({
					...prev,
					count: {
						valid: roleData.count !== null && roleData.count !== 0,
						message: roleData.count !== null && roleData.count !== 0 ? '' : '인원을 입력해주세요.',
					},
				}));
			}
		}
	}, [isValid.isRoleSubmitted, roleData.roleName, roleData.count]);

	return (
		<S.InputRoleForm
			$isRoleClicked={dropdown.role}
			$isSkillClicked={dropdown.skill}
			$isRoleName={roleData.roleName !== ''}
			$isCount={roleData.count !== null}
			$isTagItem={tagItem !== ''}
		>
			<article className='wrapper' ref={dropdownRef}>
				<section className='wrapper-role container-input'>
					<input
						type='text'
						placeholder='역할을 검색하세요.'
						className='body1-medium input-element'
						value={roleData.roleName}
						onChange={onChangeRole}
						onKeyDown={onKeyPress}
					/>
					{dropdown.role && (
						<section className='dropdown'>
							{isPendingRole ? (
								<article className='dropdown-loading'>
									<span>검색중입니다...</span>
								</article>
							) : dataRole && dataRole.length > 0 ? (
								dataRole?.map((keyword: Keyword) => (
									<span
										key={keyword.id}
										onClick={onClickRole}
										id={keyword.id.toString()}
										className='option'
									>
										{keyword.name}
									</span>
								))
							) : (
								<article className='dropdown-loading'>
									<span>검색결과가 없습니다.</span>
								</article>
							)}
						</section>
					)}
					{isValid.isRoleSubmitted && !isValidBeforeSubmit.role.valid && (
						<p className='valid-message__role txt4'>{isValidBeforeSubmit.role.message}</p>
					)}
					<img className='icon-search role-search' src={SearchIcon} alt='검색 아이콘' />
				</section>
				<section className='wrapper-count container-input'>
					<input
						type='text'
						placeholder='인원'
						className='body1-medium input-element'
						onChange={onChangeCount}
						onKeyDown={onKeyPress}
						value={roleData.count?.toString()}
					/>
					{isValid.isRoleSubmitted && !isValidBeforeSubmit.count.valid && (
						<p className='valid-message__count txt4'>{isValidBeforeSubmit.count.message}</p>
					)}
				</section>
				<section className='wrapper-skill container-input' onClick={skillInputHandler}>
					{!dropdown.skill &&
						(!id ? (
							<section className='container-selected__skills outside' ref={containerRef}>
								{roleData.skills &&
									roleData.skills.map((tagItem: Keyword) => {
										return (
											<article className='tags' key={tagItem.id}>
												<span className='txt2'>{tagItem.name}</span>
												<button
													type='button'
													onClick={event => deleteTagHandler(event, tagItem.id)}
													className='btn-delete__tag'
												>
													<img src={XBtn} alt='취소 아이콘' />
												</button>
											</article>
										);
									})}
							</section>
						) : (
							<section className='container-selected__skills outside' ref={containerRef}>
								{roleData.skills &&
									roleData.skills.map((tagItem: Keyword) => {
										return (
											<article className='tags' key={tagItem.id}>
												<span className='txt2'>{tagItem.name}</span>
												<button
													type='button'
													onClick={event => deleteTagHandler(event, tagItem.id)}
													className='btn-delete__tag'
												>
													<img src={XBtn} alt='취소 아이콘' />
												</button>
											</article>
										);
									})}
							</section>
						))}
					{(dropdown.skill || roleData.skills?.length === 0) && (
						<input
							type='text'
							placeholder='스킬을 검색하세요. 최대 5개의 스킬을 입력할 수 있습니다.'
							className='body1-medium input-element'
							onChange={onChangeKeyword}
							onKeyDown={onKeyPress}
							value={tagItem}
							onClick={onClickSkillInput}
						/>
					)}
					{dropdown.skill && (
						<section className='dropdown-skill'>
							<section className='list-skill'>
								{isPendingSkill ? (
									<div className='body1-medium'>
										<TextBox message='검색어를 입력해주세요.' />
									</div>
								) : (
									dataSkill?.map(elem => (
										<span
											key={elem.id}
											className='skill-element body1-medium option'
											id={elem.id.toString()}
											onClick={onClickSkill}
										>
											{elem.name}
										</span>
									))
								)}
								{!isPendingSkill && keywordSkill?.length === 0 && (
									<section className='no-result'>
										<span className='body1-medium'>기술스택을 검색해주세요.</span>
									</section>
								)}
								{!isPendingSkill && dataSkill?.length === 0 && (
									<section className='no-result'>
										<span className='body1-medium'>검색 결과가 없습니다.</span>
									</section>
								)}
							</section>
							<hr />
							<section className='list-selected'>
								<section className='wrapper-selected__skills'>
									<span className='body1-medium subtitle'>보유 스킬</span>
									<section className='container-selected__skills'>
										{!id &&
											roleData.skills &&
											roleData.skills.map((tagItem: Keyword) => {
												return (
													<article className='tags' key={tagItem.id}>
														<span className='txt2'>{tagItem.name}</span>
														<button
															type='button'
															onClick={event => deleteTagHandler(event, tagItem.id)}
															className='btn-delete__tag'
														>
															<img src={XBtn} alt='취소 아이콘' />
														</button>
													</article>
												);
											})}
										{id &&
											roleData.skills?.map((skill: Keyword) => {
												return (
													<article className='tags' key={skill.id}>
														<span className='txt2'>{skill.name}</span>
														<button
															type='button'
															onClick={event => deleteTagHandler(event, skill.id)}
															className='btn-delete__tag'
														>
															<img src={XBtn} alt='취소 아이콘' />
														</button>
													</article>
												);
											})}
									</section>
								</section>
								<p className='txt4 mention'>보유 스킬은 최대 5개까지 입력 가능합니다.</p>
							</section>
						</section>
					)}
					<img className='icon-search skill-search' src={SearchIcon} alt='검색 아이콘' />
				</section>
				<section>
					<button className='btn-delete' type='button' onClick={deleteRoleHandler}>
						<img src={GrayDelete} alt='제거 아이콘' />
					</button>
				</section>
			</article>
		</S.InputRoleForm>
	);
};

export default React.memo(InputRoleForm);
