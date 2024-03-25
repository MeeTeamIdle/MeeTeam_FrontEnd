import React, { useState } from 'react';
import { ProfileImage } from '../../..';
import { TitleAndEtc } from '../../../../types';
import S from './TitleInfo.styled';
import { FilledBookmark, UnfilledBookmark } from '../../../../assets';

type scores = {
	[key: number]: string;
};

const scoreObj: scores = {
	4.5: 'A+',
	4.0: 'A',
	3.5: 'B+',
	3.0: 'B',
};

const TitleInfo = ({
	nickname,
	responseRate,
	score,
	createdAt,
	title,
	writerProfileImg,
	bookmarkCount,
	writerScore,
}: TitleAndEtc) => {
	const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
	return (
		<S.TitleInfo>
			<section className='container-header'>
				<section className='container-header__profile'>
					<ProfileImage size='3.3075rem' nickname={nickname} url={writerProfileImg} />
					<span>{nickname}</span>
				</section>
				<span className='bubble first'>응답률 {responseRate}%</span>
				<span className='bubble'>평점 {writerScore.toFixed(1)}</span>
				<span className='date'>{createdAt}</span>
				<section className='container-bookmark'>
					<img
						src={isBookmarked ? FilledBookmark : UnfilledBookmark}
						onClick={() => setIsBookmarked(prev => !prev)}
					/>
					<span className='count-bookmark'>{bookmarkCount}</span>
				</section>
			</section>
			<h1>{title}</h1>
		</S.TitleInfo>
	);
};

export default TitleInfo;
