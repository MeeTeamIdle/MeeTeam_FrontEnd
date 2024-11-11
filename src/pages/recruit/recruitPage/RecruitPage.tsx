import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	Dropdown,
	Pagination,
	NeedLogin,
	ModalPortal,
	Modal,
	Footer,
	MainBanner,
	FloatingButton,
	ModalBackground,
	DropdownDetail,
	ClearConditions,
	SearchBar,
	FieldPopup,
	RecruitCard,
} from '../../../components';
import S from './RecruitPage.styled';
import { FilledBookmark } from '../../../assets';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
	detailedFilterState,
	needLoginModalState,
	pageState,
	previousLocationState,
	recruitFilterState,
	recruitFilterStateAuth,
	signupModalState,
} from '../../../atom';
import {
	useCheckDevice,
	useFixModalBackground,
	useFocusToTop,
	useLogin,
	useOutsideClick,
} from '../../../hooks';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getAuthPostList, getPostList } from '../../../service/recruit/board';
import { useQuery } from '@tanstack/react-query';

const commonInitialFilterState = {
	category: null,
	field: null,
	skill: [],
	role: [],
	tag: [],
	keyword: '',
	course: null,
	professor: null,
};

const RecruitPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const fieldRef = useRef<HTMLDivElement | null>(null);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const { isLogin } = useLogin();
	const { isMobile } = useCheckDevice();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchKeyword, setSearchKeyword] = useState<string>('');
	const [isFieldOpen, setIsFieldOpen] = useState<boolean>(false);
	const [isDetailSelected, setIsDetailSelected] = useState(false);
	const [isFloatingOpen, setIsFloatingOpen] = useState<boolean>(false);
	const [placeholderText, setPlaceholderText] = useState('제목을 검색해보세요.');
	const [fieldValue, setFieldValue] = useState({
		applied: false,
		value: {
			id: null as number | null,
			value: '분야를 선택해주세요',
		},
	});
	const [isOpenDetail, setIsOpenDetail] = useState({
		skill: true,
		role: false,
		tag: false,
		message: '기술',
	});

	const [page, setPage] = useRecoilState<number>(pageState);
	const [filterState, setFilterState] = useRecoilState(recruitFilterState);
	const [filterStateAuth, setFilterStateAuth] = useRecoilState(recruitFilterStateAuth);
	const setDetailedFilterState = useSetRecoilState(detailedFilterState);
	const setPreviousLocationState = useSetRecoilState(previousLocationState);
	const [needLoginModal, setNeedLoginModal] = useRecoilState(needLoginModalState);
	const [signupModalOpen, setSignupModalOpen] = useRecoilState(signupModalState);
	const [searchParams, setSearchParams] = useSearchParams();

	const { data: posts } = useQuery({
		queryKey: [
			location.pathname,
			{ filterState: location.pathname === '/' ? filterState : filterStateAuth, page },
		],
		queryFn: async () => {
			if (location.pathname === '/') {
				return await getPostList({ filterState, page });
			} else if (location.pathname === '/campus') {
				return await getAuthPostList({ filterState: filterStateAuth, page });
			}
		},
	});

	const onClickDetailed = (event: React.MouseEvent) => {
		event.stopPropagation();
		setIsOpen(prev => !prev);
	};

	const handleFieldMenu = (event: React.MouseEvent<HTMLSpanElement>) => {
		const { innerText } = event.target as HTMLElement;
		setFieldValue({
			applied: false,
			value: { id: Number(event.currentTarget.id), value: innerText },
		});
		searchParams.set('field', event.currentTarget.id);
	};

	const submitField = () => {
		setFieldValue(prev => ({ ...prev, applied: true }));
		setFilterState(prev => ({ ...prev, field: fieldValue.value.id }));
		setIsFieldOpen(false);
		setSearchParams(searchParams);
	};

	const onClickClear = useCallback(() => {
		if (location.pathname === '/') {
			setFilterState({
				scope: 1,
				...commonInitialFilterState,
			});
		} else if (location.pathname === '/campus') {
			setFilterStateAuth({
				scope: 2,
				...commonInitialFilterState,
			});
		}

		setSearchKeyword('');
		setDetailedFilterState({ skill: [], role: [], tag: [] });
		setSearchParams(searchParams);
		setIsOpenDetail({ skill: true, role: false, tag: false, message: '기술' });

		searchParams.delete('category');
		searchParams.delete('skill');
		searchParams.delete('role');
		searchParams.delete('tag');
		searchParams.delete('keyword');
		searchParams.delete('course');
		searchParams.delete('professor');
		setIsDetailSelected(false);
		setSearchParams(searchParams);
	}, [
		location.pathname,
		searchParams,
		setSearchParams,
		setDetailedFilterState,
		setFilterState,
		setFilterStateAuth,
	]);

	const closeHandler = () => {
		setIsOpen(false);
	};

	const handleFieldPopup = () => {
		setIsFieldOpen(prev => !prev);
	};

	const onClickDetails = (event: React.MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		const { innerText } = event.target as HTMLElement;
		if (innerText === '기술') {
			setIsOpenDetail({ skill: true, role: false, tag: false, message: innerText });
		} else if (innerText === '역할') {
			setIsOpenDetail({ skill: false, role: true, tag: false, message: innerText });
		} else if (innerText === '태그') {
			setIsOpenDetail({ skill: false, role: false, tag: true, message: innerText });
		}
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

	const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchKeyword(event.target.value);
		if (event.target.value.length === 0) {
			onClickDeleteKeyword();
		}
	};

	const handleFieldClear = () => {
		setFilterState(prev => ({ ...prev, field: null }));
		setFieldValue({ applied: false, value: { id: null, value: '분야를 선택해주세요' } });
		searchParams.delete('field');
		setSearchParams(searchParams);
	};

	const onClickDeleteKeyword = () => {
		setFilterState(prev => ({ ...prev, keyword: '' }));
		setSearchKeyword('');
		searchParams.delete('keyword');
		setSearchParams(searchParams);
	};

	const submitTagItem = () => {
		setFilterState(prev => ({ ...prev, keyword: searchKeyword }));
		searchParams.set('keyword', searchKeyword);
		setSearchParams(searchParams);
	};

	const recruitCreateHandler = () => {
		if (isLogin) {
			navigate('/recruitment/postings');
		} else {
			setNeedLoginModal({ isOpen: true, type: 'RECRUIT_CREATE' });
		}
	};

	const bookmarkNavigateHandler = () => {
		if (isLogin) {
			navigate('/management/bookmark');
		} else {
			setNeedLoginModal({ isOpen: true, type: 'MANAGE_BOOKMARK' });
		}
	};

	const profileCreateHandler = () => {
		if (isLogin) {
			navigate('/profile/edit');
		} else {
			setNeedLoginModal({ isOpen: true, type: 'PROFILE_CREATE' });
		}
	};

	const portfolioCreateHandler = () => {
		if (isLogin) {
			navigate('/portfolio/edit');
		} else {
			setNeedLoginModal({ isOpen: true, type: 'PORTFOLIO_CREATE' });
		}
	};

	const detailOptionsSelected = () => {
		setIsDetailSelected(true);
	};

	const detailOptionsNotSelected = () => {
		setIsDetailSelected(false);
	};

	const handlerChildDropdown = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	const handleFocusedPlaceholder = () => {
		setPlaceholderText('검색어 입력');
	};

	const handleBlurredPlaceholder = () => {
		setPlaceholderText('제목을 검색해보세요.');
	};

	const handleFloatingButton = () => {
		setIsFloatingOpen(prev => !prev);
	};

	const signupModalProps = {
		title: '프로필을 추가해보세요!',
		content:
			'프로필 입력정보를 추가하면\n팀을 만날 확률이 늘어납니다.\n내 프로필로 이동하시겠습니끼?',
		defaultBtn: {
			title: '나중에 하기',
			small: true,
			handleClick: () => setSignupModalOpen(false),
		},
		primaryBtn: {
			title: '프로필로 이동',
			small: true,
			handleClick: () => {
				setSignupModalOpen(false);
				navigate(`/profile/${location.state?.userId}`);
			},
		},
	};

	useOutsideClick(dropdownRef, isOpen, setIsOpen);
	useOutsideClick(fieldRef, isFieldOpen, setIsFieldOpen);
	useFixModalBackground(needLoginModal.isOpen);
	useFixModalBackground(signupModalOpen);
	useFocusToTop(page);

	useEffect(() => {
		setPreviousLocationState(location.pathname + location.search);
	}, [location, setPreviousLocationState]);

	useEffect(() => {
		if (
			filterState.role.length === 0 &&
			filterState.skill.length === 0 &&
			filterState.tag.length === 0
		) {
			detailOptionsNotSelected();
		} else {
			detailOptionsSelected();
		}
	}, [filterState.role, filterState.skill, filterState.tag]);

	useEffect(() => {
		const queryParams = {
			category: searchParams.get('category'),
			skill: searchParams.getAll('skill').map(Number),
			role: searchParams.getAll('role').map(Number),
			tag: searchParams.getAll('tag').map(Number),
			keyword: searchParams.get('keyword'),
			field: searchParams.get('field'),
			course: searchParams.get('course'),
			professor: searchParams.get('professor'),
		};

		if (location.pathname === '/') {
			setFilterState({
				scope: 1,
				category: queryParams.category ? Number(queryParams.category) : null,
				skill: queryParams.skill ? queryParams.skill : [],
				role: queryParams.role ? queryParams.role : [],
				tag: queryParams.tag ? queryParams.tag : [],
				keyword: queryParams.keyword ? queryParams.keyword : '',
				field: queryParams.field ? Number(queryParams.field) : null,
				course: queryParams.course ? Number(queryParams.course) : null,
				professor: queryParams.professor ? Number(queryParams.professor) : null,
			});
		} else if (location.pathname === '/campus') {
			setFilterStateAuth({
				scope: 2,
				category: queryParams.category ? Number(queryParams.category) : null,
				skill: queryParams.skill ? queryParams.skill : [],
				role: queryParams.role ? queryParams.role : [],
				tag: queryParams.tag ? queryParams.tag : [],
				keyword: queryParams.keyword ? queryParams.keyword : '',
				field: queryParams.field ? Number(queryParams.field) : null,
				course: queryParams.course ? Number(queryParams.course) : null,
				professor: queryParams.professor ? Number(queryParams.professor) : null,
			});
		}

		setSearchKeyword(queryParams.keyword || '');
	}, [searchParams, setFilterState, setFilterStateAuth, location.pathname]);

	return (
		<>
			<S.RecruitPage $isDetailedClick={isOpen}>
				<MainBanner />
				<section>
					<FieldPopup
						isOpen={isFieldOpen}
						fieldRef={fieldRef}
						fieldValue={fieldValue}
						isFieldClick={fieldValue.value.value !== '분야를 선택해주세요'}
						onClick={handleFieldPopup}
						handleFieldMenu={handleFieldMenu}
						handleFieldClear={handleFieldClear}
						submitField={submitField}
					/>
					<section className='wrapper-filters'>
						<section className='container-filters'>
							<Dropdown
								data={['모든 유형', '프로젝트', '스터디', '공모전']}
								initialData='유형'
								category
							/>
							{!isMobile && (
								<DropdownDetail
									isOpen={isOpen}
									dropdownRef={dropdownRef}
									isOpenDetail={isOpenDetail}
									isDetailSelected={isDetailSelected}
									onClick={onClickDetailed}
									handleClose={closeHandler}
									handleChildDropdown={handlerChildDropdown}
									handleClickDetails={onClickDetails}
								/>
							)}
							<ClearConditions onClick={onClickClear} />
						</section>
						<SearchBar
							placeholderText={placeholderText}
							searchKeyword={searchKeyword}
							onChange={handleKeywordChange}
							onKeyPress={onKeyPress}
							handleFocusedPlaceholder={handleFocusedPlaceholder}
							handleBlurredPlaceholder={handleBlurredPlaceholder}
							onClickDeleteKeyword={onClickDeleteKeyword}
						/>
					</section>
				</section>
				<hr />
				<section>
					<article className='container-contents'>
						<section>
							<article className='bookmark-intro' onClick={bookmarkNavigateHandler}>
								<img src={FilledBookmark} alt='bookmark-icon' />
								<span className='body2'>북마크 모아보기 {'❯'}</span>
							</article>
							{posts && (
								<section className='container-contents__grid'>
									{posts.posts.map(post => (
										<RecruitCard {...post} key={post.id} />
									))}
								</section>
							)}
							{posts && posts.posts.length === 0 && (
								<section className='no-results'>
									<span>일치하는 결과가 없습니다.</span>
								</section>
							)}
						</section>
					</article>
				</section>
				<article className='container-pagination'>
					{posts && (
						<Pagination
							postsNum={posts.pageInfo.totalContents}
							postsPerPage={posts.pageInfo.size}
							currentPage={page}
							setCurrentPage={setPage}
						/>
					)}
				</article>
				<FloatingButton
					isFloatingOpen={isFloatingOpen}
					onClick={handleFloatingButton}
					recruitCreateHandler={recruitCreateHandler}
					profileCreateHandler={profileCreateHandler}
					portfolioCreateHandler={portfolioCreateHandler}
				/>
				{needLoginModal.isOpen && (
					<ModalBackground>
						<NeedLogin type={needLoginModal.type} />
					</ModalBackground>
				)}
				{signupModalOpen && (
					<ModalPortal>
						<Modal {...signupModalProps} />
					</ModalPortal>
				)}
			</S.RecruitPage>
			<Footer />
		</>
	);
};

export default RecruitPage;
