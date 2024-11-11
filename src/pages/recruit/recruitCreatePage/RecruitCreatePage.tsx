import React, { useEffect, useState } from 'react';
import S from './RecruitCreatePage.styled';
import {
	BasicInformation,
	ControlButtons,
	Description,
	DetailedInformation,
	RecruitTagList,
	RecruitRoleForm,
	WarnRoleDelete,
	WarnRoleCount,
	FinalValidationModal,
} from '../../../components/index';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import {
	recruitInputState,
	userState,
	validState,
	warnRoleDeleteModalState,
	warningModalRoleCountState,
} from '../../../atom';
import { getPostingData, editPostingRecruit, postingRecruit } from '../../../service';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { EditPosting, InputState } from '../../../types';
import { fixModalBackground } from '../../../utils';
import { useLogin } from '../../../hooks';
import { NotFound } from '../../index';
import { INIT_FORM_DATA } from '../../../constant';

const RecruitCreatePage = () => {
	const { id } = useParams();
	const locationObj = useLocation();
	const navigate = useNavigate();
	const { isLogin } = useLogin();
	const validCheck = useRecoilValue(validState);
	const setIsSubmit = useSetRecoilState(validState);
	const [beforeSubmit, setBeforeSubmit] = useState<boolean>(false);
	const userInfo = useRecoilValue(userState);
	const isWarnRoleDelete = useRecoilValue(warnRoleDeleteModalState);
	const isWarnRoleCount = useRecoilValue(warningModalRoleCountState);
	const [formData, setFormData] = useRecoilState<InputState>(recruitInputState);
	const postAvailable =
		validCheck.isCategory &&
		validCheck.isDeadline &&
		validCheck.isProcedure &&
		validCheck.isScope &&
		validCheck.isContent &&
		validCheck.isTitle &&
		validCheck.isRole &&
		validCheck.isContent;
	const basicAvailable =
		validCheck.isCategory &&
		validCheck.isDeadline &&
		validCheck.isProcedure &&
		validCheck.isScope &&
		validCheck.isContent &&
		validCheck.isTitle;
	const pageNum = Number(id);

	const { data, isLoading } = useQuery({
		queryKey: ['detailedPage', { pageNum, isLogin }],
		queryFn: () => getPostingData({ pageNum, isLogin }),
		enabled: !!id,
	});

	const uploadPost = useMutation({
		mutationFn: (formData: InputState) => postingRecruit(formData),
		onSuccess: (data: { recruitmentPostId: number }) => {
			setIsSubmit(prev => ({
				...prev,
				isSubmitted: false,
			}));
			if (formData.scope === '교내') {
				navigate(`/campus/recruitment/postings/${data?.recruitmentPostId}`);
			} else {
				navigate(`/recruitment/postings/${data?.recruitmentPostId}`);
			}
		},
		onError: () => {
			setIsSubmit(prev => ({
				...prev,
				isSubmitted: false,
			}));
		},
	});
	const editPost = useMutation({
		mutationFn: ({ pageNum, formData }: EditPosting) => editPostingRecruit({ pageNum, formData }),
		onSuccess: () => {
			setIsSubmit(prev => ({
				...prev,
				isSubmitted: false,
			}));
			if (formData.scope === '교내') {
				navigate(`/campus/recruitment/postings/${pageNum}`);
			} else {
				navigate(`/recruitment/postings/${pageNum}`);
			}
		},
		onError: () => {
			setIsSubmit(prev => ({
				...prev,
				isSubmitted: false,
			}));
		},
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const sanitizedContent = formData.content.replace(/["']/g, '');
		setFormData({ ...formData, content: sanitizedContent });

		setIsSubmit(prev => ({
			...prev,
			isSubmitted: true,
		}));

		if (!postAvailable) {
			setBeforeSubmit(true);
		}
		if (postAvailable && !locationObj.pathname.includes('edit')) {
			uploadPost.mutate(formData, {
				onSuccess: () => setFormData(INIT_FORM_DATA),
			});
		}
		if (postAvailable && locationObj.pathname.includes('edit') && pageNum) {
			editPost.mutate(
				{ pageNum, formData },
				{
					onSuccess: () => setFormData(INIT_FORM_DATA),
				}
			);
		}
	};

	const preventGoBack = () => {
		history.pushState(null, '', location.href);
		alert('나가시려면 하단의 취소 버튼을 눌러주세요.');
	};

	const preventClose = (e: BeforeUnloadEvent) => {
		e.preventDefault();
		e.returnValue = '';
	};

	useEffect(() => {
		fixModalBackground(beforeSubmit || isWarnRoleDelete);
	}, [beforeSubmit, isWarnRoleDelete]);

	useEffect(() => {
		(() => {
			history.pushState(null, '', location.href);
			window.addEventListener('popstate', preventGoBack);
		})();

		return () => {
			window.removeEventListener('popstate', preventGoBack);
		};
	}, []);

	useEffect(() => {
		(() => {
			window.addEventListener('beforeunload', preventClose);
		})();

		return () => {
			window.removeEventListener('beforeunload', preventClose);
		};
	}, []);

	if (userInfo?.userId !== data?.writerId && !isLoading && id) {
		return <NotFound />;
	}

	return (
		<S.RecruitCreatePage>
			{isLoading ? (
				<section className='blank'></section>
			) : (
				<form onSubmit={handleSubmit}>
					<Description />
					<BasicInformation
						title={data?.title}
						scope={data?.scope}
						category={data?.category}
						deadline={data?.deadline}
						startDate={data?.proceedingStart}
						endDate={data?.proceedingEnd}
						proceedType={data?.proceedType}
						course={data?.courseName}
						professor={data?.courseProfessor}
					/>
					<DetailedInformation contents={data?.content} />
					<RecruitRoleForm
						applicantsList={
							data?.recruitmentRoles.map(role => {
								return { roleId: role.roleId, applicantCount: role.applicantCount };
							}) || []
						}
						applicantsListData={data?.recruitmentRoles}
					/>
					<RecruitTagList tags={data?.tags} />
					<ControlButtons id={id} />
					{beforeSubmit && (
						<article className='modal-background'>
							<FinalValidationModal
								basicAvailable={basicAvailable}
								validCheck={validCheck}
								setBeforeSubmit={setBeforeSubmit}
							/>
						</article>
					)}
					{isWarnRoleDelete && id && (
						<article className='modal-background'>
							<WarnRoleDelete />
						</article>
					)}
					{isWarnRoleCount && (
						<article className='modal-background'>
							<WarnRoleCount />
						</article>
					)}
				</form>
			)}
		</S.RecruitCreatePage>
	);
};

export default RecruitCreatePage;
