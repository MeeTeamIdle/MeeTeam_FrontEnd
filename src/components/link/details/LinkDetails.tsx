import React from 'react';
import S from './LinkDetails.styled';
import { Link } from '../../../types';
import { Clip } from '../../../assets';
import { useResponsiveWeb } from '../../../hooks';

const LinkDetails = ({ url, description }: Link) => {
	// 반응형
	const [isMobilePort, isTabletPort] = useResponsiveWeb();

	return (
		<S.LinkDetailsLayout $isTabletPort={isTabletPort} $isMobilePort={isMobilePort}>
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
