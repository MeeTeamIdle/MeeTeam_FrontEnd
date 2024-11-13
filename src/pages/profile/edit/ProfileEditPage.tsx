import React, { useEffect, useMemo, useState } from 'react';
import S from '../Profile.styled';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { PROFILE_EDIT_DATA } from '../../index';
import {
	Input,
	Textarea,
	ComboBox,
	Toggle,
	Radio,
	DeleteBtn,
	MuiDatepickerController,
	SkillTag,
	PortfolioCard,
	DefaultBtn,
	PrimaryBtn,
	ProfileImage,
	LinkForm,
	AddFormBtn,
	ModalPortal,
	Modal,
} from '../../../components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { uploadImageState, userState } from '../../../atom';
import { Skill, Award, Link } from '../../../types';
import {
	useDebounce,
	useReadProfile,
	useUpdateProfile,
	useReadRoleList,
	useReadSkillList,
	useIntersection,
	useUploadImageFile,
	useReadImagePresignedUrl,
	useCheckDuplicateNickname,
	useCheckDevice,
} from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useReadInfinitePortfolioList } from '../../../hooks/usePortfolio';
import { fixModalBackground, checkEnterKeyDown } from '../../../utils';
import { differenceInDays } from 'date-fns';

interface FormValues {
	nickname?: string;
	userName?: string;
	interest?: string;
	introduction?: string;
	aboutMe?: string;
	phone?: string;
	universityEmail?: string;
	subEmail?: string;
	year?: string;
	university?: string;
	department?: string;
	gpa?: string;
	maxGpa?: string;
	skills?: string | null;
	links?: Link[];
	linkUrl?: string;
	linkDescription?: string;
	awards?: Award[];
	awardTitle?: string;
	awardDescription?: string;
}

const DESCRIPTION = {
	contact: `대표 메일로 구인과 관련된 정보를 받을 수 있습니다.\n자주 사용하는 이메일을 대표 메일로 설정해주세요.`,
	skills: `개발 , 디자인 툴 등 가지고 있는 직무와 관련된 스킬을 추가해보세요.\n최대 10개까지 입력할 수 있습니다.`,
	awards: `수상 이력, 수료한 교육이나 참석한 외부활동 등이 있다면 간단히 작성해주세요.\n최대 10개까지 입력할 수 있습니다.`,
	links: `깃헙, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 작성해주세요.\n최대 10개까지 입력할 수 있습니다.`,
	portfolio: `밋팀에서 작성한 포트폴리오가 있다면 선택해주세요!\n프로필에서 최대 8개까지 보여집니다.`,
};
const gpaList = [{ name: '4.5' }, { name: '4.3' }];

const ProfileEditPage = () => {
	const userId = useRecoilValue(userState)?.userId as string;
	const { data: user, isSuccess: isUserSuccess } = useReadProfile(userId); // 새로고침 시, 렌더링 지연 및 콘솔 에러

	const navigate = useNavigate();

	const updateProfileInSuccess = (userId: string) => {
		navigate(`/profile/${userId}`);
		setUploadImage(null); // 전역 업로드 이미지 초기화
	};

	const { mutate: updateProfile } = useUpdateProfile({
		onSuccess: updateProfileInSuccess,
		userId: userId,
	});

	// 이미지 업로드
	const [uploadImage, setUploadImage] = useRecoilState(uploadImageState);
	const {
		data: imageResponse,
		refetch: readImagePresignedUrl,
		isSuccess: isSuccessReadUrl,
	} = useReadImagePresignedUrl(uploadImage?.fileName as string);

	const uploadImageFileInSuccess = () => {
		const formData = getValues();
		updateProfile({
			...formData,
			imageFileName: imageResponse?.fileName,
			isUserNamePublic: isUserNamePublic,
			interestId: roles?.find(role => role.name === getValues('interest'))?.id,
			isPhonePublic: isPhonePublic,
			isUniversityMain: isUniversityMain,
			isUniversityEmailPublic: isUniversityEmailPublic,
			isSubEmailPublic: isSubEmailPublic,
			skills: skillList.map(skill => skill.id),
			portfolios: pinnedPortfolioList as string[],
		});
	};

	const { mutate: uploadImageFile } = useUploadImageFile({
		onSuccess: uploadImageFileInSuccess,
	});

	useEffect(() => {
		if (isSuccessReadUrl && imageResponse) {
			uploadImageFile({
				presignedUrl: imageResponse.url,
				imageFile: uploadImage?.file as File,
			});
		}
	}, [isSuccessReadUrl]);

	const submitHandler: SubmitHandler<FormValues> = data => {
		if (uploadImage) {
			// 이미지를 처음 업로드 및 변경하는 경우에만 S3에 업로드(기존!==지금)
			readImagePresignedUrl(); // presignedUrl 발급
		} else {
			updateProfile({
				...data,
				isUserNamePublic: isUserNamePublic,
				interestId: roles?.find(role => role.name === getValues('interest'))?.id,
				isPhonePublic: isPhonePublic,
				isUniversityMain: isUniversityMain,
				isUniversityEmailPublic: isUniversityEmailPublic,
				isSubEmailPublic: isSubEmailPublic,
				skills: skillList.map(skill => skill.id),
				portfolios: pinnedPortfolioList as string[],
			});
		}
	};

	const { register, formState, handleSubmit, control, watch, getValues, setValue, getFieldState } =
		useForm<FormValues>({
			mode: 'onChange',
			values: {
				...user,
				year: user?.year + '학년도',
				phone: user?.phone?.content,
				universityEmail: user?.universityEmail?.content,
				subEmail: user?.subEmail?.content,
				maxGpa: user?.maxGpa ?? '4.5',
				links: user?.links,
				skills: null,
				awards: user?.awards,
			},
			resetOptions: {
				keepDirtyValues: true,
				keepErrors: true,
			},
		});
	const { isSubmitting, isSubmitSuccessful } = formState;

	// 닉네임
	const nickname = useDebounce(watch('nickname') as string);
	const authKeys = ['checkDuplicateNickname', nickname];
	const { data: nicknameData } = useCheckDuplicateNickname(
		authKeys,
		getFieldState('nickname').isDirty && !getFieldState('nickname').invalid
	);

	const [duplicateNicknameValidation, setDuplicateNicknameValidation] = useState('');
	const [duplicated, setDuplicated] = useState(false);

	const checkDuplicateNickname = () => {
		if (nickname !== user?.nickname && nicknameData && !nicknameData.isEnable) {
			setDuplicateNicknameValidation(() => '이미 사용중인 닉네임입니다');
			setDuplicated(true);
		} else if (nickname === user?.nickname || nicknameData?.isEnable) {
			setDuplicateNicknameValidation(() => '사용가능한 닉네임입니다');
			setDuplicated(false);
		}
	};
	useEffect(() => checkDuplicateNickname(), [nicknameData?.isEnable, nickname]);

	const role = useDebounce(watch('interest')) as string;
	const { data: roles } = useReadRoleList(role);

	const skill = useDebounce(watch('skills')) as string;
	const { data: skills } = useReadSkillList(skill);

	// 공개 여부
	const [isUserNamePublic, setIsUserNamePublic] = useState(user?.isUserNamePublic);
	const [isPhonePublic, setIsPhonePublic] = useState(user?.phone?.isPublic);
	const [isUniversityEmailPublic, setIsUniversityEmailPublic] = useState(
		user?.universityEmail?.isPublic
	);
	const [isSubEmailPublic, setIsSubEmailPublic] = useState(user?.subEmail?.isPublic);
	const [isUniversityMain, setIsUniversityMain] = useState(user?.universityEmail?.isDefault); // 대표 메일

	useEffect(() => {
		if (isUserSuccess) {
			setIsUserNamePublic(user?.isUserNamePublic);
			setIsPhonePublic(user?.phone?.isPublic);
			setIsUniversityEmailPublic(user?.universityEmail?.isPublic);
			setIsSubEmailPublic(user?.subEmail?.isPublic);
			setIsUniversityMain(user?.universityEmail?.isDefault);

			setSkillList(user?.skills ? user?.skills : []);
		}
	}, [isUserSuccess]);

	const handleRadioClick = (id: string) => {
		if (id === 'universityEmail') {
			setIsUniversityMain(true);
		} else if (id === 'subEmail') {
			setIsUniversityMain(false);
		}
	};

	// 스킬
	const [skillList, setSkillList] = useState(user?.skills ? user?.skills : []);

	const addSkill = () => {
		if (skillList.length === 10) {
			setModalProps(prev => ({
				...prev,
				title: '스킬',
				content: '스킬은 최대 10개까지 입력할 수 있어요!',
			}));
			setAlertOpen(true);
			setValue('skills', '');
			return;
		}
		const newSkill = {
			id: skills?.find(skill => skill.name === getValues('skills'))?.id,
			name: getValues('skills'),
		} as Skill;
		if (getValues('skills')?.length === 0) return;
		if (skillList.find(skill => newSkill.name === skill.name)) {
			setModalProps(prev => ({
				...prev,
				title: '스킬',
				content: '이미 추가한 스킬입니다!',
			}));
			setAlertOpen(true);
			setValue('skills', '');
			return;
		}
		setSkillList(prev => [...prev, newSkill]);
		setValue('skills', '');
	};

	const deleteSkill = (skillName: string) => {
		setSkillList(() => skillList.filter(skill => skill.name !== skillName));
	};

	// 링크
	const {
		fields: links,
		prepend: prependLink,
		remove: removeLink,
	} = useFieldArray({
		name: 'links',
		control: control,
	});

	const addLink = () => {
		if (links.length === 10) {
			setModalProps(prev => ({
				...prev,
				title: '링크',
				content: '링크는 최대 10개까지 입력할 수 있어요!',
			}));
			setAlertOpen(true);
			return;
		}
		prependLink({ description: 'Link', url: '' });
	};

	// 수상/활동
	const {
		fields: awards,
		prepend: prependAward,
		remove: removeAward,
	} = useFieldArray({
		name: 'awards',
		control: control,
	});

	const addAward = () => {
		if (awards.length === 10) {
			setModalProps(prev => ({
				...prev,
				title: '수상/활동',
				content: '수상/활동은 최대 10개까지 입력할 수 있어요!',
			}));
			setAlertOpen(true);
			return;
		}
		prependAward({ startDate: '', endDate: '', title: '', description: '' });
	};

	const deleteAward = (index: number) => {
		removeAward(index);
	};

	// 포트폴리오
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isSuccess: isPortfolioSuccess,
	} = useReadInfinitePortfolioList(12);
	const portfolioList = useMemo(
		() => (data ? data.pages.flatMap(response => response?.portfolios) : []),
		[data]
	);

	const ref = useIntersection((entry, observer) => {
		observer.unobserve(entry.target);

		if (hasNextPage && !isFetching) fetchNextPage();
	});

	const sortedPortfolioList =
		portfolioList &&
		[...portfolioList].sort((a, b) =>
			a && b && a.pinOrder > b.pinOrder ? 1 : a && b && a.pinOrder < b.pinOrder ? -1 : 0
		);

	const [pinnedPortfolioList, setPinnedPortfolioList] = useState(
		sortedPortfolioList
			? sortedPortfolioList?.filter(portfolio => portfolio?.pinned).map(portfolio => portfolio?.id)
			: []
	);

	useEffect(() => {
		setPinnedPortfolioList(
			sortedPortfolioList
				? sortedPortfolioList
						?.filter(portfolio => portfolio?.pinned)
						?.map(portfolio => portfolio?.id as string)
				: []
		);
	}, [isPortfolioSuccess]);

	const addPinnedPortfolioList = (id: string) => {
		if (pinnedPortfolioList.length < 8) {
			setPinnedPortfolioList(prev => [...prev, id]);
		}
	};

	const deletePinnedPortfolioList = (id: string) => {
		if (pinnedPortfolioList.length > 0) {
			setPinnedPortfolioList(() => pinnedPortfolioList.filter(portfolioId => portfolioId !== id));
		}
	};

	const checkPinnedIndex = (id: string) => {
		return pinnedPortfolioList.findIndex(portfolioId => portfolioId === id);
	};

	// 모달
	const [alertOpen, setAlertOpen] = useState(false);
	useEffect(() => {
		fixModalBackground(alertOpen);
	}, [alertOpen]);

	const [modalProps, setModalProps] = useState({
		title: ``,
		content: ``,
		primaryBtn: {
			title: `확인`,
			small: true,
			handleClick: () => {
				setAlertOpen(false);
			},
			handleKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
				if (event.key === 'Escape' || event.key === 'Enter' || event.key === 'Space') {
					setAlertOpen(false);
				}
			},
		},
	});

	// 반응형
	const { isMobile, isTablet } = useCheckDevice();

	return (
		<>
			<S.ProfileLayout onSubmit={handleSubmit(submitHandler)} onKeyDown={e => checkEnterKeyDown(e)}>
				<S.ProfileHeader $isTablet={isTablet} $isMobile={isMobile}>
					<ProfileImage
						isEditable={true}
						userId={user?.nickname as string}
						size='14rem'
						url={user?.imageUrl}
					/>
					<S.ProfileColumn $gap='2.4rem'>
						<S.ProfileRow
							$width='clamp(50%, 50.8rem, 100%)'
							$gap='1rem'
							$isTablet={isTablet}
							$isMobile={isMobile}
						>
							<Input
								// defaultValue={user?.nickname}
								register={register}
								formState={formState}
								duplicated={duplicated}
								duplicatedMessage={
									!getFieldState('nickname').invalid ? duplicateNicknameValidation : ''
								}
								{...PROFILE_EDIT_DATA.nickname}
							/>
							<S.ProfileRow $gap='1rem'>
								<Input
									// defaultValue={user?.userName}
									register={register}
									formState={formState}
									{...PROFILE_EDIT_DATA.userName}
								/>
								<Toggle state={isUserNamePublic} setState={setIsUserNamePublic} />
							</S.ProfileRow>
						</S.ProfileRow>
						<ComboBox
							width='clamp(50%, 39.2rem, 100%)'
							// defaultValue={user?.interest}
							register={register}
							setValue={setValue}
							getValues={getValues}
							formState={formState}
							optionList={roles}
							{...PROFILE_EDIT_DATA.interest}
						/>
						<Input
							width='clamp(50%, 39.2rem, 100%)'
							// defaultValue={user?.introduction}
							register={register}
							watch={watch}
							formState={formState}
							{...PROFILE_EDIT_DATA.introduction}
						/>
					</S.ProfileColumn>
				</S.ProfileHeader>

				<S.ProfileColumn $gap='5rem'>
					<S.ProfileArticle>
						<S.ProfileTitle>자기 소개</S.ProfileTitle>
						<Textarea
							register={register}
							watch={watch}
							formState={formState}
							{...PROFILE_EDIT_DATA.aboutMe}
						/>
						<hr />
					</S.ProfileArticle>

					<S.ProfileArticle>
						<S.ProfileTitle>연락 수단</S.ProfileTitle>
						<S.ProfileDescription>{DESCRIPTION.contact}</S.ProfileDescription>
						<S.ProfileColumn $gap='2.84rem'>
							<S.ProfileColumn $width='clamp(50%, 51.8rem, 100%)' $gap='1.6rem'>
								<label style={{ color: 'var(--Form-txtIcon-default,  #8E8E8E)' }}>연락처</label>
								<S.ProfileRow $gap='1rem'>
									<S.ProfileRow $gap='1rem'>
										<Input register={register} formState={formState} {...PROFILE_EDIT_DATA.phone} />
									</S.ProfileRow>
									<Toggle state={isPhonePublic} setState={setIsPhonePublic} />
								</S.ProfileRow>
							</S.ProfileColumn>
							<S.ProfileColumn $width='clamp(50%, 51.8rem, 100%)' $gap='1.6rem'>
								<label style={{ color: 'var(--Form-txtIcon-default,  #8E8E8E)' }}>대표 메일</label>
								<S.ProfileRow $gap='1rem'>
									<Radio
										register={register}
										name='email'
										id={PROFILE_EDIT_DATA.universityEmail.name}
										state={isUniversityMain}
										handleClick={handleRadioClick}
									>
										<Input
											register={register}
											formState={formState}
											{...PROFILE_EDIT_DATA.universityEmail}
										/>
									</Radio>
									<Toggle state={isUniversityEmailPublic} setState={setIsUniversityEmailPublic} />
								</S.ProfileRow>
								<S.ProfileRow $gap='1rem'>
									<Radio
										register={register}
										name='email'
										id={PROFILE_EDIT_DATA.subEmail.name}
										state={!isUniversityMain}
										handleClick={handleRadioClick}
									>
										<Input
											register={register}
											formState={formState}
											{...PROFILE_EDIT_DATA.subEmail}
										/>
									</Radio>
									<Toggle state={isSubEmailPublic} setState={setIsSubEmailPublic} />
								</S.ProfileRow>
							</S.ProfileColumn>
						</S.ProfileColumn>
						<hr />
					</S.ProfileArticle>

					<S.ProfileArticle>
						<S.ProfileTitle>교육</S.ProfileTitle>
						<S.ProfileRow $gap='1rem'>
							<S.ProfileRow $gap='1rem'>
								<Input register={register} formState={formState} {...PROFILE_EDIT_DATA.year} />
								<Input
									register={register}
									formState={formState}
									{...PROFILE_EDIT_DATA.university}
								/>
							</S.ProfileRow>
							<S.ProfileColumn $gap='1rem'>
								<Input
									register={register}
									formState={formState}
									{...PROFILE_EDIT_DATA.department}
								/>
								<S.ProfileRow $gap='1rem'>
									<Input register={register} formState={formState} {...PROFILE_EDIT_DATA.gpa} />
									<ComboBox
										register={register}
										setValue={setValue}
										getValues={getValues}
										formState={formState}
										optionList={gpaList}
										{...PROFILE_EDIT_DATA.maxGpa}
									/>
								</S.ProfileRow>
							</S.ProfileColumn>
						</S.ProfileRow>
						<hr />
					</S.ProfileArticle>

					<S.ProfileArticle>
						<S.ProfileTitle>스킬</S.ProfileTitle>
						<S.ProfileDescription>{DESCRIPTION.skills}</S.ProfileDescription>
						<S.ProfileColumn $gap='2rem'>
							<ComboBox
								register={register}
								setValue={setValue}
								formState={formState}
								getValues={getValues}
								optionList={skills}
								clickOption={addSkill}
								{...PROFILE_EDIT_DATA.skills}
							/>
							<S.ProfileRow $gap='1.05rem'>
								{skillList?.map(({ ...props }, index) => (
									<SkillTag isEditable={true} handleClick={deleteSkill} key={index} {...props} />
								))}
							</S.ProfileRow>
						</S.ProfileColumn>
						<hr />
					</S.ProfileArticle>

					<S.ProfileArticle>
						<S.ProfileTitle>수상/활동</S.ProfileTitle>
						<S.ProfileDescription>{DESCRIPTION.awards}</S.ProfileDescription>
						<AddFormBtn title='수상/활동 추가' handleClick={() => addAward()} />
						<S.ProfileColumn $gap='3.6rem'>
							{awards?.map((award, index) => (
								<S.ProfileRow key={award.id} $gap='1rem' $isTablet={isTablet} $isMobile={isMobile}>
									<S.ProfileColumn $gap='2rem'>
										<S.ProfileRow $gap='1rem'>
											<MuiDatepickerController
												name={`awards.${index}.startDate`}
												control={control}
												formState={formState}
												{...PROFILE_EDIT_DATA.awardStartDate}
												rules={{
													required: '시작일을 설정해주세요',
													validate: (startDate: string) => {
														if (watch(`awards.${index}.endDate`)) {
															return (
																differenceInDays(
																	new Date(watch(`awards.${index}.endDate`) as string),
																	new Date(startDate)
																) >= 0 || '종료일 이전으로 설정해주세요'
															);
														}
													},
												}}
											/>
											<MuiDatepickerController
												name={`awards.${index}.endDate`}
												control={control}
												formState={formState}
												{...PROFILE_EDIT_DATA.awardEndDate}
												rules={{
													required: '종료일을 설정해주세요',
													validate: (endDate: string) => {
														if (watch(`awards.${index}.startDate`)) {
															return (
																differenceInDays(
																	new Date(endDate),
																	new Date(watch(`awards.${index}.startDate`) as string)
																) >= 0 || '시작일 이후로 설정해주세요'
															);
														}
													},
												}}
											/>
										</S.ProfileRow>
										<Input
											name={`awards.${index}.title`}
											register={register}
											formState={formState}
											{...PROFILE_EDIT_DATA.awardTitle}
										/>
									</S.ProfileColumn>
									<S.ProfileRow $gap='1rem'>
										<Input
											name={`awards.${index}.description`}
											register={register}
											formState={formState}
											{...PROFILE_EDIT_DATA.awardDescription}
										/>
										<DeleteBtn handleClick={() => deleteAward(index)} />
									</S.ProfileRow>
								</S.ProfileRow>
							))}
						</S.ProfileColumn>
						<hr />
					</S.ProfileArticle>

					<S.ProfileArticle>
						<S.ProfileTitle>링크</S.ProfileTitle>
						<S.ProfileDescription>{DESCRIPTION.links}</S.ProfileDescription>
						<AddFormBtn title='링크 추가' handleClick={() => addLink()} />
						<S.ProfileColumn $gap='3.6rem'>
							{links?.map((link, index) => (
								<LinkForm
									key={link.id}
									index={index}
									width='clamp(10%, 11.8rem, 100%)'
									register={register}
									formState={formState}
									getValues={getValues}
									setValue={setValue}
									remove={removeLink}
								/>
							))}
						</S.ProfileColumn>
						<hr />
					</S.ProfileArticle>

					<S.ProfileArticle>
						<S.ProfileTitle>포트폴리오</S.ProfileTitle>
						<S.ProfileDescription>{DESCRIPTION.portfolio}</S.ProfileDescription>
						{portfolioList?.length ? (
							<S.ProfileGrid>
								{portfolioList &&
									portfolioList?.map(
										portfolio =>
											portfolio && (
												<PortfolioCard
													key={portfolio.id}
													{...portfolio}
													isEditable={true}
													clickNumber={checkPinnedIndex(portfolio.id) + 1}
													handleClick={
														checkPinnedIndex(portfolio.id) === -1
															? addPinnedPortfolioList
															: deletePinnedPortfolioList
													}
												/>
											)
									)}
							</S.ProfileGrid>
						) : (
							<S.ProfileEmptyPortfolio>
								<h3>아직 작성한 포트폴리오가 없어요</h3>
							</S.ProfileEmptyPortfolio>
						)}
						<hr ref={ref} />
					</S.ProfileArticle>
				</S.ProfileColumn>
				<S.ProfileButtonBox>
					<DefaultBtn
						type='button'
						title='취소'
						handleClick={() => navigate(`/profile/${userId}`)}
					/>
					<PrimaryBtn
						type='submit'
						title='저장'
						disabled={
							getFieldState('nickname').invalid || duplicated || isSubmitting || isSubmitSuccessful
						}
					/>
				</S.ProfileButtonBox>
			</S.ProfileLayout>
			{alertOpen && (
				<ModalPortal>
					<Modal {...modalProps} />
				</ModalPortal>
			)}
		</>
	);
};

export default ProfileEditPage;
