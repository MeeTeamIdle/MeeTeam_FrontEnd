import React, { useState, useEffect } from 'react';
import { Search, XBtn, Clear } from '../../../../assets';
import { useQuery } from '@tanstack/react-query';
import { getRoleKeyword, getSkillKeyword, getTagKeyword } from '../../../../service';
import { useDebounce } from '../../../../hooks';
import { Keyword, DetailedInfo } from '../../../../types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { detailedFilterState, recruitFilterState } from '../../../../atom';
import { useSearchParams } from 'react-router-dom';
import { TextBox } from '../../../index';

const MESSAGE = {
	SKILL: {
		INTRO: '보유하신 기술 스택을 검색해보세요. 기술 스택은 최대 5개까지 선택 가능합니다.',
		MESSAGE: '기술 스택을 검색하세요.',
	},
	ROLE: {
		INTRO: '원하는 역할을 검색해보세요. 역할은 최대 5개까지 선택 가능합니다.',
		MESSAGE: '역할을 검색하세요.',
	},
	TAG: {
		INTRO: '알아보고 싶은 내용을 태그로 검색해보세요. 태그는 최대 5개까지 선택 가능합니다.',
		MESSAGE: '태그를 검색하세요.',
	},
};

const DetailedInput = ({ type, closeHandler }: DetailedInfo) => {
	const [tagItem, setTagItem] = useState('');
	const [message, setMessage] = useState({
		intro: MESSAGE.SKILL.INTRO,
		message: MESSAGE.SKILL.MESSAGE,
	});
	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
	const [detailedFilter, setDetailedFilter] = useRecoilState(detailedFilterState);
	const [searchParams, setSearchParams] = useSearchParams();

	const keyword = useDebounce(tagItem);
	const setFilterState = useSetRecoilState(recruitFilterState);

	const { data: dataRole, isPending: isPendingRole } = useQuery({
		queryKey: ['searchRole', keyword],
		queryFn: () => getRoleKeyword(keyword),
		enabled: !!tagItem && type === '역할',
		staleTime: Infinity,
	});

	const { data: dataSkill, isPending: isPendingSkill } = useQuery({
		queryKey: ['searchSkill', keyword],
		queryFn: () => getSkillKeyword(keyword),
		enabled: !!tagItem && type === '기술',
		staleTime: Infinity,
	});

	const { data: dataTag, isPending: isPendingTag } = useQuery({
		queryKey: ['searchTag', keyword],
		queryFn: () => getTagKeyword(keyword),
		enabled: !!tagItem && type === '태그',
	});

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length > 0) {
			setIsOpenMenu(true);
		} else {
			setIsOpenMenu(false);
		}
		setTagItem(event.target.value);
	};

	const onClickItem = (event: React.MouseEvent<HTMLLIElement>, item: Keyword) => {
		event.stopPropagation();
		if (type === '기술') {
			if (
				!detailedFilter.skill.map(e => e.id).includes(item.id) &&
				detailedFilter.skill.length < 5
			) {
				setDetailedFilter(prev => ({
					...prev,
					skill: [...prev.skill, { id: item.id, name: item.name }],
				}));
			}
		} else if (type === '역할') {
			if (!detailedFilter.role.map(e => e.id).includes(item.id) && detailedFilter.role.length < 5) {
				setDetailedFilter(prev => ({
					...prev,
					role: [...prev.role, { id: item.id, name: item.name }],
				}));
			}
		} else if (type === '태그') {
			if (!detailedFilter.tag.map(e => e.id).includes(item.id) && detailedFilter.tag.length < 5) {
				setDetailedFilter(prev => ({
					...prev,
					tag: [...prev.tag, { id: item.id, name: item.name }],
				}));
			}
		}
		setIsOpenMenu(false);
		setTagItem('');
	};

	const onClickApply = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		if (type === '기술') {
			const skillIds = detailedFilter.skill.map(skill => skill.id);
			setFilterState(prev => ({
				...prev,
				skill: skillIds,
			}));
			searchParams.delete('skill');
			skillIds.map(e => {
				searchParams.append('skill', e.toString());
			});
		} else if (type === '역할') {
			const roleIds = detailedFilter.role.map(role => role.id);
			setFilterState(prev => ({
				...prev,
				role: roleIds,
			}));
			searchParams.delete('role');
			roleIds.map(e => {
				searchParams.append('role', e.toString());
			});
		} else if (type === '태그') {
			const tagIds = detailedFilter.tag.map(tag => tag.id);
			setFilterState(prev => ({
				...prev,
				tag: tagIds,
			}));
			searchParams.delete('tag');
			tagIds.map(e => {
				searchParams.append('tag', e.toString());
			});
		}

		setSearchParams(searchParams);
		closeHandler();
	};

	const onClickSearchBar = (event: React.MouseEvent<HTMLInputElement>) => {
		event.stopPropagation();
	};

	const onClickErase = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		if (type === '기술') {
			setDetailedFilter(prev => ({ ...prev, skill: [] }));
			setFilterState(prev => ({ ...prev, skill: [] }));
			searchParams.delete('skill');
		} else if (type === '역할') {
			setDetailedFilter(prev => ({ ...prev, role: [] }));
			setFilterState(prev => ({ ...prev, role: [] }));
			searchParams.delete('role');
		} else if (type === '태그') {
			setDetailedFilter(prev => ({ ...prev, tag: [] }));
			setFilterState(prev => ({ ...prev, tag: [] }));
			searchParams.delete('tag');
		}

		setSearchParams(searchParams);
	};

	const onClickDelete = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
		event.stopPropagation();
		if (type === '기술') {
			setDetailedFilter(prev => ({
				...prev,
				skill: detailedFilter.skill.filter(elem => elem.id != id),
			}));
		} else if (type === '역할') {
			setDetailedFilter(prev => ({
				...prev,
				role: detailedFilter.role.filter(elem => elem.id != id),
			}));
		} else if (type === '태그') {
			setDetailedFilter(prev => ({
				...prev,
				tag: detailedFilter.tag.filter(elem => elem.id != id),
			}));
		}
	};

	useEffect(() => {
		if (type === '기술') {
			setMessage({ intro: MESSAGE.SKILL.INTRO, message: MESSAGE.SKILL.MESSAGE });
		} else if (type === '역할') {
			setMessage({ intro: MESSAGE.ROLE.INTRO, message: MESSAGE.ROLE.MESSAGE });
		} else if (type === '태그') {
			setMessage({ intro: MESSAGE.TAG.INTRO, message: MESSAGE.TAG.MESSAGE });
		}
		setIsOpenMenu(false);
	}, [type]);

	return (
		<section className='dropdown-search'>
			<span className='body1 intro-msg'>{message.intro}</span>
			<article className='search' onClick={onClickSearchBar}>
				<input type='text' placeholder={message.message} value={tagItem} onChange={onChangeInput} />
				<img src={Search} alt='검색 아이콘' />
			</article>
			{isOpenMenu && (
				<section className='role-menu'>
					<ul>
						{type === '기술' &&
							(isPendingSkill ? (
								<TextBox message='검색 중...' />
							) : dataSkill && dataSkill.length > 0 ? (
								dataSkill.map((item: Keyword) => (
									<li className='body1' key={item.id} onClick={event => onClickItem(event, item)}>
										{item.name}
									</li>
								))
							) : (
								<TextBox message='검색 결과가 없습니다.' />
							))}

						{type === '역할' &&
							(isPendingRole ? (
								<TextBox message='검색중입니다...' />
							) : dataRole && dataRole.length > 0 ? (
								dataRole.map((item: Keyword) => (
									<li className='body1' key={item.id} onClick={event => onClickItem(event, item)}>
										{item.name}
									</li>
								))
							) : (
								<TextBox message='검색 결과가 없습니다.' />
							))}

						{type === '태그' &&
							(isPendingTag ? (
								<TextBox message='검색중입니다...' />
							) : dataTag && dataTag.length > 0 ? (
								dataTag.map((item: Keyword) => (
									<li className='body1' key={item.id} onClick={event => onClickItem(event, item)}>
										{item.name}
									</li>
								))
							) : (
								<TextBox message='검색 결과가 없습니다.' />
							))}
					</ul>
				</section>
			)}
			<article className='container-tag'>
				{type === '기술' &&
					detailedFilter.skill.map(elem => (
						<article className='tags' key={elem.id}>
							<span>{elem.name}</span>
							<button type='button' onClick={event => onClickDelete(event, elem.id)}>
								<img src={XBtn} alt='제거 아이콘' />
							</button>
						</article>
					))}
				{type === '역할' &&
					detailedFilter.role.map(elem => (
						<article className='tags' key={elem.id}>
							<span>{elem.name}</span>
							<button type='button' onClick={event => onClickDelete(event, elem.id)}>
								<img src={XBtn} alt='제거 아이콘' />
							</button>
						</article>
					))}
				{type === '태그' &&
					detailedFilter.tag.map(elem => (
						<article className='tags' key={elem.id}>
							<span>{elem.name}</span>
							<button type='button' onClick={event => onClickDelete(event, elem.id)}>
								<img src={XBtn} alt='제거 아이콘' />
							</button>
						</article>
					))}
			</article>
			<article className='container-btns'>
				<section className='clear' onClick={onClickErase}>
					<img src={Clear} alt='초기화 아이콘' />
					<span>초기화</span>
				</section>
				<button type='button' onClick={onClickApply}>
					적용
				</button>
			</article>
		</section>
	);
};

export default React.memo(DetailedInput);
