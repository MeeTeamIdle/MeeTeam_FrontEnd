import React from 'react';
import S from './LinkDetails.styled';
import { Link } from '../../../types';
import { Clip } from '../../../assets';
import { useCheckDevice } from '../../../hooks';

const LinkDetails = ({ url, description }: Link) => {
	// 반응형
	const { isMobile, isTablet } = useCheckDevice();

	return (
		<S.LinkDetailsLayout $isTablet={isTablet} $isMobile={isMobile}>
			<h4>{description}</h4>
			<div>
				<img src={Clip} alt='링크 아이콘' />
				<a href={url} target='_blank' title={description} rel='noreferrer noopener'>
					{url}
				</a>
			</div>
		</S.LinkDetailsLayout>
	);
};

export default LinkDetails;
