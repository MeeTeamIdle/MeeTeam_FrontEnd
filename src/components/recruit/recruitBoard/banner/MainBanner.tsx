import React from 'react';
import S from './MainBanner.styled';

const MainBanner = () => {
	return (
		<S.Banner>
			<section className='container-title'>
				<span className='subtitle'>팀원을 찾고 있나요?</span>
				<span className='title'>밋팀으로 팀원을 만나보세요!</span>
			</section>
			<section>
				<img
					src='meeteam_banner_icon_large.webp'
					srcSet='meeteam_banner_icon_small.webp 600w,  meeteam_banner_icon_medium.webp 900w, meeteam_banner_icon_large.webp 1980w'
					alt='main-banner-image'
					sizes='(max-width:600px) 70rem, (max-width: 900px) 90rem, 120rem'
					fetchpriority='high'
				/>
			</section>
		</S.Banner>
	);
};

export default MainBanner;
