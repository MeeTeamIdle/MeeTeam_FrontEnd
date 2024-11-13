import React from 'react';
import S from '../Profile.styled';
import {
	DefaultBtn,
	LinkDetails,
	PortfolioCard,
	ProfileImage,
	SkillTag,
} from '../../../components';
import { useCheckDevice, useReadProfile } from '../../../hooks';
import { useParams, useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../atom';
import { BlackEmail, BlackPhone } from '../../../assets';

const MESSAGE = {
	aboutMe: '간단한 자기 소개를 적어주세요',
	skills: '가지고 있는 직무와 관련된 스킬을 추가해주세요',
	awards: '수상 이력, 수료한 교육이나 참석한 외부활동 등을 추가해주세요',
	links: '성과를 보여줄 수 있는 링크가 있다면 추가해주세요',
	portfolios: '밋팀에서 포트폴리오 작성하고, 추가해주세요',
};

const ProfileDetailsPage = () => {
	const userInfo = useRecoilValue(userState);

	const { userId } = useParams() as { userId: string };
	const { data: user, isSuccess } = useReadProfile(userId);

	const navigate = useNavigate();

	const isDefaultEmailPublic = user?.universityEmail?.isDefault
		? user?.universityEmail?.isPublic
		: user?.subEmail?.isPublic;

	const isSubEmailPublic = !user?.universityEmail?.isDefault
		? user?.universityEmail?.isPublic
		: user?.subEmail?.isPublic;

	// 반응형
	const { isMobile, isTablet } = useCheckDevice();

	return (
		isSuccess && (
			<S.ProfileLayout>
				<S.ProfileHeader $isTablet={isTablet} $isMobile={isMobile}>
					<ProfileImage userId={userId} size='14rem' url={user?.imageUrl} />
					<S.ProfileColumn>
						<div className='profile-header__row'>
							<h2>{user?.nickname}</h2>
							{(userInfo?.userId === userId || user?.isUserNamePublic) && (
								<S.ProfileRow $gap='1rem'>
									<h3>{user?.userName}</h3>
									{userInfo?.userId === userId && !user?.isUserNamePublic && (
										<S.ProfileTag>비공개</S.ProfileTag>
									)}
								</S.ProfileRow>
							)}
						</div>
						<h4>{user?.interest}</h4>
						<h6>{user?.introduction}</h6>
					</S.ProfileColumn>
					{userInfo?.userId === userId && (
						<div className='profile-header_btn'>
							<DefaultBtn
								type='button'
								title='편집'
								handleClick={() => navigate('/profile/edit')}
							/>
						</div>
					)}
				</S.ProfileHeader>

				<S.ProfileColumn $gap='5rem'>
					<S.ProfileArticle>
						<S.ProfileTitle>자기 소개</S.ProfileTitle>
						<div>{user?.aboutMe}</div>
						{userInfo?.userId === userId && !user?.aboutMe && (
							<S.ProfileMessage>{MESSAGE.aboutMe}</S.ProfileMessage>
						)}
						<hr />
					</S.ProfileArticle>

					<S.ProfileArticle>
						<S.ProfileTitle>연락 수단</S.ProfileTitle>
						<S.ProfileColumn $gap='2.4rem'>
							{(user?.phone?.isPublic || userInfo?.userId === userId) && (
								<S.ProfileColumn>
									<S.ProfileSmallText>연락처</S.ProfileSmallText>
									<S.ProfileRow $gap='1rem'>
										<img src={BlackPhone} alt='링크 아이콘' />
										<div>{user?.phone?.content ?? '-'}</div>
										{userInfo?.userId === userId && !user?.phone?.isPublic && (
											<S.ProfileTag>비공개</S.ProfileTag>
										)}
									</S.ProfileRow>
								</S.ProfileColumn>
							)}
							<S.ProfileColumn $gap='1.2rem'>
								{(isDefaultEmailPublic || userInfo?.userId === userId) && (
									<S.ProfileColumn>
										<S.ProfileSmallText $color='#5877FC'>대표 메일</S.ProfileSmallText>
										<S.ProfileRow $gap='1rem'>
											<img src={BlackEmail} alt='링크 아이콘' />
											{user?.universityEmail?.isDefault ? (
												<div>{user?.universityEmail?.content ?? '-'}</div>
											) : (
												<div>{user?.subEmail?.content ?? '-'}</div>
											)}
											{userInfo?.userId === userId && !isDefaultEmailPublic && (
												<S.ProfileTag>비공개</S.ProfileTag>
											)}
										</S.ProfileRow>
									</S.ProfileColumn>
								)}
								{(isSubEmailPublic || userInfo?.userId === userId) && (
									<S.ProfileColumn>
										<S.ProfileSmallText>이메일</S.ProfileSmallText>
										<S.ProfileRow $gap='1rem'>
											<img src={BlackEmail} alt='링크 아이콘' />
											{!user?.universityEmail?.isDefault ? (
												<div>{user?.universityEmail?.content ?? '-'}</div>
											) : (
												<div>{user?.subEmail?.content ?? '-'}</div>
											)}
											{userInfo?.userId === userId && !isSubEmailPublic && (
												<S.ProfileTag>비공개</S.ProfileTag>
											)}
										</S.ProfileRow>
									</S.ProfileColumn>
								)}
							</S.ProfileColumn>
						</S.ProfileColumn>
						<hr />
					</S.ProfileArticle>

					<S.ProfileArticle>
						<S.ProfileTitle>교육</S.ProfileTitle>
						<div>
							<S.ProfileSmallText>{user?.year}년도 입학</S.ProfileSmallText>
							<S.ProfileRow>
								<S.ProfileColumn $gap='1.5rem'>
									<h4>{user?.university}</h4>
								</S.ProfileColumn>
								<S.ProfileColumn $gap='1.5rem'>
									<S.ProfileRow $gap='1.5rem'>
										학과
										<span>{user?.department}</span>
									</S.ProfileRow>
									<S.ProfileRow $gap='1.5rem'>
										학점
										<span>{user?.gpa ? `${user?.gpa}/${user?.maxGpa}` : '-'}</span>
									</S.ProfileRow>
								</S.ProfileColumn>
							</S.ProfileRow>
						</div>
						<hr />
					</S.ProfileArticle>

					<S.ProfileArticle>
						<S.ProfileTitle>스킬</S.ProfileTitle>
						<S.ProfileRow $gap='1.05rem'>
							{user?.skills?.map(({ ...props }, index) => <SkillTag key={index} {...props} />)}
						</S.ProfileRow>
						{userInfo?.userId === userId && !user?.skills?.length && (
							<S.ProfileMessage>{MESSAGE.skills}</S.ProfileMessage>
						)}
						<hr />
					</S.ProfileArticle>

					<S.ProfileArticle>
						<S.ProfileTitle>수상/활동</S.ProfileTitle>
						<S.ProfileColumn $gap='2.4rem'>
							{user?.awards?.map(({ title, startDate, endDate, description }, index) => (
								<S.ProfileColumn key={index}>
									<S.ProfileSmallText>
										{startDate} ~ {endDate}
									</S.ProfileSmallText>
									<S.ProfileRow $gap='1.05rem'>
										<S.ProfileColumn $gap='1.5rem'>
											<h4>{title}</h4>
										</S.ProfileColumn>
										<S.ProfileColumn $gap='1.5rem'>{description}</S.ProfileColumn>
									</S.ProfileRow>
									{index + 1 !== user?.awards?.length && <hr />}
								</S.ProfileColumn>
							))}
						</S.ProfileColumn>
						{userInfo?.userId === userId && !user?.awards?.length && (
							<S.ProfileMessage>{MESSAGE.awards}</S.ProfileMessage>
						)}
						<hr />
					</S.ProfileArticle>

					<S.ProfileArticle>
						<S.ProfileTitle>링크</S.ProfileTitle>
						<S.ProfileColumn $isTablet={isTablet} $isMobile={isMobile}>
							{user?.links?.map((link, index) => (
								<S.ProfileRow key={index} $gap='3.65rem'>
									<LinkDetails {...link} />
								</S.ProfileRow>
							))}
						</S.ProfileColumn>
						{userInfo?.userId === userId && !user?.links?.length && (
							<S.ProfileMessage>{MESSAGE.links}</S.ProfileMessage>
						)}
						<hr />
					</S.ProfileArticle>

					<S.ProfileArticle>
						<S.ProfileTitle>포트폴리오</S.ProfileTitle>
						<S.ProfileGrid>
							{user?.portfolios?.map(({ ...props }, index) => (
								<PortfolioCard key={index} {...props} />
							))}
						</S.ProfileGrid>
						{userInfo?.userId === userId && !user?.portfolios?.length && (
							<S.ProfileMessage>{MESSAGE.portfolios}</S.ProfileMessage>
						)}
						<hr />
					</S.ProfileArticle>
				</S.ProfileColumn>
			</S.ProfileLayout>
		)
	);
};

export default ProfileDetailsPage;
