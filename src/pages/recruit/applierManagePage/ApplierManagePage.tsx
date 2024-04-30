import React, { useState, useEffect, useRef } from 'react';
import S from './ApplierManagePage.styled';
import {
	ArrowTop,
	DropdownArrow,
	DropdownArrowUp,
	FloatingBackground,
	LinkIcon,
} from '../../../assets';
import { ApplicantCard, ApplyRole, Dropdown, OpenChatModal, Toast } from '../../../components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getApplicantsList } from '../../../service';
import { useRecoilValue, useRecoilState } from 'recoil';
import { applicantFilter, applicantHolder, openChatModalState, toastState } from '../../../atom';
import {
	approveApplicant,
	getRecruitInfo,
	refusedApplicant,
	setOpenChatLink,
} from '../../../service/recruit/applicant';
import { ApplicantInfo, ApplicantsLink, ApplicantsList } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../../../hooks';
import { fixModalBackground } from '../../../utils';

const ApplierManagePage = () => {
	const role = useRecoilValue(applicantFilter);
	const targetRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const scrollToTop = useScrollToTop();

	const [page, setPage] = useState<number>(1);
	const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
	const [isOpenCurrent, setIsOpenCurrent] = useState<boolean>(true);
	const [linkUrl, setLinkUrl] = useState<string>('');
	const [checkList, setCheckList] = useRecoilState(applicantHolder);
	const [isToast, setIsToast] = useRecoilState(toastState);
	const isTutorialOpen = useRecoilValue(openChatModalState);
	const [applicantsArr, setApplicantsArr] = useState<ApplicantInfo[]>([]);

	const storedNum = sessionStorage.getItem('pageNum');
	const pageNum = Number(storedNum !== null && storedNum);

	const {
		data: applicantList,
		isSuccess: listSuccess,
		refetch,
	} = useQuery({
		queryKey: ['applicantsList', { pageNum, role }],
		queryFn: () => getApplicantsList({ pageNum: pageNum, role, page }),
	});
	const { data: recruitManageInfo, isSuccess: manageSuccess } = useQuery({
		queryKey: ['recruitManageInfo'],
		queryFn: () => getRecruitInfo(pageNum),
	});

	const isChecked =
		checkList && recruitManageInfo && checkList.length !== 0 && recruitManageInfo.link !== null;

	const approved = useMutation({
		mutationFn: ({ pageNum, applicantIds }: ApplicantsList) =>
			approveApplicant({ pageNum, applicantIds }),
		onSuccess: () => {
			setCheckList([]);
			queryClient.invalidateQueries({ queryKey: ['applicantsList'] });
		},
	});
	const refused = useMutation({
		mutationFn: ({ pageNum, applicantIds }: ApplicantsList) =>
			refusedApplicant({ pageNum, applicantIds }),
		onSuccess: () => {
			setCheckList([]);
			queryClient.invalidateQueries({ queryKey: ['applicantsList'] });
		},
	});
	const openLink = useMutation({
		mutationFn: ({ pageNum, link }: ApplicantsLink) => setOpenChatLink({ pageNum, link }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recruitManageInfo'] });
		},
	});

	const onClickSetting = () => {
		setIsOpenChat(prev => !prev);
		if (isOpenChat) {
			openLink.mutate({ pageNum, link: linkUrl });
		}
	};

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLinkUrl(event.target.value);
	};

	const onClickRefused = () => {
		if (!recruitManageInfo?.link) {
			setIsToast(true);
		} else {
			refused.mutate({ pageNum, applicantIds: checkList });
		}
	};
	const onClickApproved = () => {
		if (!recruitManageInfo?.link) {
			setIsToast(true);
		} else {
			approved.mutate({ pageNum, applicantIds: checkList });
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setPage(prev => prev + 1);
			}
		});

		if (targetRef.current) {
			observer.observe(targetRef.current);
		}

		return () => {
			if (targetRef.current) {
				observer.unobserve(targetRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (page === 1 && applicantList) {
			setApplicantsArr(applicantList.applicants);
		}
		refetch();
		if (applicantList) {
			setApplicantsArr(prev => [...prev, ...applicantList.applicants]);
		}
	}, [page, applicantList]);

	useEffect(() => {
		if (recruitManageInfo) {
			setLinkUrl(recruitManageInfo.link);
		}
	}, [recruitManageInfo?.link]);

	useEffect(() => {
		fixModalBackground(isTutorialOpen);
	}, [recruitManageInfo?.isFirstAccess]);

	return (
		<S.ApplierManagePage $isChecked={isChecked} $isOpenCurrent={isOpenCurrent}>
			<article className='wrapper-applicants'>
				<section className='container-title'>
					<h1>{recruitManageInfo?.title}</h1>
					<h4 className='page-link' onClick={() => navigate(-1)}>
						구인글 바로가기 ⟩
					</h4>
				</section>
				<section className='container-link'>
					<h4>오픈채팅방 설정</h4>
					<span className='body1-medium'>멤버를 초대할 오픈채팅방 주소를 설정해보세요!</span>
					{manageSuccess && recruitManageInfo && (
						<article className='input-link'>
							{!isOpenChat ? (
								<section className='container-input__link'>
									<img src={LinkIcon} />
									<span className='body1-medium input-prev'>
										{!recruitManageInfo.link
											? '오픈채팅방 주소를 입력해주세요.'
											: recruitManageInfo.link}
									</span>
								</section>
							) : (
								<input
									type='text'
									className='input-chat body1-medium'
									placeholder='오픈채팅방 주소를 입력해주세요.'
									value={linkUrl}
									onChange={onChangeInput}
								/>
							)}
							<button type='button' className='btn-setting text-small' onClick={onClickSetting}>
								{isOpenChat ? '저장' : '설정'}
							</button>
						</article>
					)}
				</section>
				<section className='container-applicants'>
					<section className='header-applicants'>
						<section className='header-title'>
							<h4>신청자 관리</h4>
							<span className='body1-medium'>
								○○님의 구인글에 신청한 (유저명)입니다. 다양한 정보들을 확인하고 멤버로 영입해보세요!
							</span>
						</section>
						{recruitManageInfo && manageSuccess && (
							<section className='header-control'>
								<Dropdown
									initialData='역할'
									applicant
									roleObj={[{ id: null, title: '전체' }, ...recruitManageInfo.roles]}
								/>
								<section className='btn-container'>
									<button className='text-big refused' onClick={onClickRefused}>
										거절
									</button>
									<button className='text-big approved' onClick={onClickApproved}>
										승인
									</button>
								</section>
							</section>
						)}
						<hr className='header-border' />
					</section>
					<section className='list-applicants'>
						{listSuccess &&
							applicantsArr.map(info => <ApplicantCard key={info.applicantId} {...info} />)}
					</section>
					<section ref={targetRef}></section>
				</section>
			</article>
			<article className={`current-recruit ${!isOpenCurrent && 'closed'}`}>
				<section className='container-title' onClick={() => setIsOpenCurrent(prev => !prev)}>
					<span className='body1-semibold'>모집 현황</span>
					<img src={isOpenCurrent ? DropdownArrowUp : DropdownArrow} />
				</section>
				{isOpenCurrent && (
					<section className='container-roles'>
						{recruitManageInfo &&
							manageSuccess &&
							recruitManageInfo.recruitmentStatus.map((elem, index) => (
								<ApplyRole
									key={index}
									approvedMemberCount={elem.approvedMemberCount}
									recruitMemberCount={elem.recruitMemberCount}
									roleName={elem.roleName}
								/>
							))}
					</section>
				)}
			</article>
			<article className='btn-floating' onClick={scrollToTop}>
				<section className='background'>
					<img src={FloatingBackground} />
					<section className='arrow'>
						<img src={ArrowTop} />
						<span>TOP</span>
					</section>
				</section>
			</article>
			{recruitManageInfo?.isFirstAccess && (
				<section className='modal-background'>
					<OpenChatModal />
				</section>
			)}
			{isToast && <Toast message='오픈채팅방 주소를 입력해주세요!' />}
		</S.ApplierManagePage>
	);
};

export default ApplierManagePage;