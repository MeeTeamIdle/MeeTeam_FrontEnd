import React, { Suspense, useEffect, useMemo } from 'react';
import S from './RecruitDetailPage.styled';
import {
	TitleInfo,
	RecruitInfo,
	RecruitDescription,
	LinkToList,
	WriterFooter,
	ApplierFooter,
	ClosedFooter,
	LoadingBackground,
} from '../../../components';
import { calculateDate, fixModalBackground } from '../../../utils';
import { JsxElementComponentProps } from '../../../types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPostingData } from '../../../service';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
	applyCancelModalState,
	userState,
	applyCloseModalState,
	applyModalState,
	applyStepState,
	commentDeleteModalState,
	needLoginModalState,
	recruitPostingDeleteModalState,
	goProfileState,
} from '../../../atom';
import { useParams, useNavigate } from 'react-router-dom';
import { useLogin } from '../../../hooks';

const ApplyModal = React.lazy(
	() => import('../../../components/recruit/recruitDetail/modal/ApplyModal')
);
const ConfirmModal = React.lazy(
	() => import('../../../components/recruit/recruitDetail/modal/ConfirmModal')
);
const FinalModal = React.lazy(
	() => import('../../../components/recruit/recruitDetail/modal/FinalModal')
);
const RecruitRoles = React.lazy(
	() => import('../../../components/recruit/recruitDetail/recruitRoles/RecruitRoles')
);
const RecruitTag = React.lazy(
	() => import('../../../components/recruit/recruitDetail/recruitTag/RecruitTag')
);
const ApplyCancel = React.lazy(
	() => import('../../../components/recruit/recruitDetail/modal/applyCancel/ApplyCancel')
);
const ApplyClose = React.lazy(
	() => import('../../../components/recruit/recruitDetail/modal/applyClose/ApplyClose')
);
const PostingDelete = React.lazy(
	() => import('../../../components/recruit/recruitDetail/modal/postingDelete/PostingDelete')
);
const Comment = React.lazy(() => import('../../../components/comment/comment/Comment'));
const CommentInput = React.lazy(
	() => import('../../../components/comment/commentInput/CommentInput')
);

const stepLists: JsxElementComponentProps = {
	0: <ApplyModal />,
	1: <ConfirmModal />,
	2: <FinalModal />,
};

const RecruitDetailPage = () => {
	const { id } = useParams();
	const { isLogin } = useLogin();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const pageNum = Number(id);

	const user = useRecoilValue(userState);
	const isCancel = useRecoilValue(applyCancelModalState);
	const isClose = useRecoilValue(applyCloseModalState);
	const isDelete = useRecoilValue(commentDeleteModalState);
	const isNeedLogin = useRecoilValue(needLoginModalState);
	const isPostingDelete = useRecoilValue(recruitPostingDeleteModalState);

	const [isModal, setIsModal] = useRecoilState(applyModalState);
	const [step, setIsApplyStep] = useRecoilState(applyStepState);
	const [isGoProfile, setGoProfile] = useRecoilState(goProfileState);

	const { data: detailedData, isSuccess } = useQuery({
		queryKey: ['detailedPage', { pageNum, isLogin }],
		queryFn: () => getPostingData({ pageNum, isLogin }),
	});

	const period = detailedData?.proceedingStart + ' ~ ' + detailedData?.proceedingEnd;
	const diffDate = detailedData && calculateDate(detailedData.deadline);
	const totalCommentsCount = useMemo(() => {
		if (detailedData) {
			return detailedData.comments.reduce((total, comment) => {
				return total + 1 + (comment.replies ? comment.replies.length : 0);
			}, 0);
		}
	}, [detailedData]);

	const onClickEditPage = async () => {
		navigate(`/recruitment/postings/edit/${pageNum}`);
	};

	const submitHandler = async () => {
		if (isGoProfile) {
			setIsApplyStep(0);
			setGoProfile(false);
			queryClient.invalidateQueries({ queryKey: ['detailedPage', { pageNum, isLogin }] });
			await setIsModal(false);
			await navigate(`/profile/${user?.userId}`);
		}
	};

	useEffect(() => {
		fixModalBackground(
			isModal || isCancel || isClose || isDelete.isDelete || isNeedLogin.isOpen || isPostingDelete
		);
	}, [isModal, isCancel, isClose, isDelete, isNeedLogin.isOpen, isPostingDelete]);

	return (
		<>
			{isSuccess && detailedData && (
				<S.RecruitDetailPage>
					<TitleInfo
						nickname={detailedData.writerNickname}
						writerId={detailedData.writerId}
						responseRate={detailedData.responseRate}
						score={detailedData.writerScore}
						createdAt={detailedData.createdAt.slice(0, -9)}
						title={detailedData.title}
						writerProfileImg={detailedData.writerProfileImg}
						bookmarkCount={detailedData.bookmarkCount}
						isBookmarked={detailedData.isBookmarked}
						writerScore={detailedData.writerScore}
					/>
					<RecruitInfo
						deadline={detailedData.deadline}
						period={period}
						scope={detailedData.scope}
						courseName={detailedData.courseName}
						category={detailedData.category}
						proceedType={detailedData.proceedType}
						courseProfessor={detailedData.courseProfessor}
						dDay={diffDate}
						isClosed={detailedData.isClosed}
					/>
					<RecruitDescription content={detailedData.content} />
					<Suspense fallback={<LoadingBackground />}>
						<RecruitRoles roles={detailedData.recruitmentRoles} />
					</Suspense>
					<Suspense fallback={<LoadingBackground />}>
						<RecruitTag tags={detailedData.tags} />
					</Suspense>
					<LinkToList />
					<article className='wrapper-comments'>
						<section className='container-title'>
							<h3>댓글</h3>
							<span>{totalCommentsCount}</span>
						</section>
						<hr />
						<Suspense fallback={<LoadingBackground />}>
							<section className='container-comments'>
								<ul className='container-comments__lists'>
									{isSuccess &&
										detailedData.comments.map(comment => {
											return <Comment key={comment.id} {...comment} />;
										})}
								</ul>
								{isLogin ? (
									<CommentInput />
								) : (
									<section className='need-login'>
										<span className='body1-semibold'>
											<span className='body1-semibold login' onClick={() => navigate('/signin')}>
												로그인
											</span>{' '}
											후 댓글을 달아보세요!
										</span>
									</section>
								)}
							</section>
						</Suspense>
					</article>
					{isModal && (
						<Suspense fallback={<LoadingBackground />}>
							<form onSubmit={submitHandler}>
								<section className='modal-background'>{stepLists[step]}</section>
							</form>
						</Suspense>
					)}
					{isCancel && (
						<Suspense fallback={<LoadingBackground />}>
							<section className='modal-background'>
								<ApplyCancel pageNum={pageNum} />
							</section>
						</Suspense>
					)}
					{isClose && (
						<Suspense fallback={<LoadingBackground />}>
							<section className='modal-background'>
								<ApplyClose />
							</section>
						</Suspense>
					)}
					{isPostingDelete && (
						<Suspense fallback={<LoadingBackground />}>
							<section className='modal-background'>
								<PostingDelete />
							</section>
						</Suspense>
					)}
				</S.RecruitDetailPage>
			)}
			<S.Footer>
				{detailedData && (
					<section className='container-btn'>
						{detailedData.isWriter && !detailedData.isClosed && (
							<WriterFooter onClickEditPage={onClickEditPage} pageNum={pageNum} />
						)}
						{!detailedData.isWriter && !detailedData.isClosed && (
							<ApplierFooter
								deadline={detailedData.deadline}
								isApplied={detailedData.isApplied}
								isBookmarked={detailedData.isBookmarked}
							/>
						)}
						{detailedData.isClosed && <ClosedFooter />}
					</section>
				)}
			</S.Footer>
		</>
	);
};

export default RecruitDetailPage;
