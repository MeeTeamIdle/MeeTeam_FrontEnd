import React from 'react';
import S from './Card.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilledBookmark, UnfilledBookmark } from '../../../assets';
import { ProfileImage } from '../..';
import { Post } from '../../../types';
import { useBookmark, useLogin } from '../../../hooks';
import { useDelBookmark } from '../../../hooks/useBookMark';
import { useSetRecoilState } from 'recoil';
import { needLoginModalState } from '../../../atom';

const RecruitCard = ({
	id,
	title,
	category,
	writerNickname,
	writerProfileImg,
	deadline,
	scope,
	isBookmarked,
	writerId,
	isClosed,
}: Post) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { isLogin } = useLogin();
	const { mutate: bookmarked } = useBookmark({
		queryKey: location.pathname,
	});
	const { mutate: unBookmarked } = useDelBookmark({
		queryKey: location.pathname,
	});
	const setNeedLoginModal = useSetRecoilState(needLoginModalState);
	const extractDeadline = new Date(deadline);
	const convertedDeadline = `${extractDeadline.getFullYear()}/${
		extractDeadline.getMonth() + 1
	}/${extractDeadline.getDate()}`;

	const onClickContent = () => {
		if (location.pathname === '/campus') {
			navigate(`/campus/recruitment/postings/${id}`);
		} else {
			navigate(`/recruitment/postings/${id}`);
		}
	};

	const onClickBookmark = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		if (!isLogin) {
			setNeedLoginModal({ isOpen: true, type: 'BOOKMARK' });
			return;
		}
		if (!isBookmarked) {
			bookmarked(Number(id));
		} else {
			unBookmarked(Number(id));
		}
	};

	return (
		<S.RecruitCard onClick={onClickContent} $isClosed={isClosed}>
			<section className='content-tags'>
				<section className='header'>
					<section className='tags'>
						<article className='tag scope'>{scope}</article>
						<article className='tag category'>{category}</article>
					</section>
					<section onClick={onClickBookmark}>
						<img src={isBookmarked ? FilledBookmark : UnfilledBookmark} alt='북마크 아이콘' />
					</section>
				</section>
				<article className='content-title'>{title}</article>
			</section>
			<section className='content-info'>
				<section className='user'>
					<ProfileImage userId={writerId} size='2.31rem' url={writerProfileImg} />
					<span>{writerNickname}</span>
				</section>
				{isClosed ? (
					<span className='closed txt2'>모집마감</span>
				) : (
					<span className='date'>~{convertedDeadline}</span>
				)}
			</section>
		</S.RecruitCard>
	);
};

export default RecruitCard;
