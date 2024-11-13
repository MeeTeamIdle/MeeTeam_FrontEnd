import styled from 'styled-components';
import { ResponsiveProps } from '../../types';

interface ProfileBoxStyle extends ResponsiveProps {
	$gap?: string;
	$width?: string;
}

const ProfileLayout = styled.form`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	margin-bottom: 20.93rem;
	width: clamp(45%, 80.4rem, 75%); // width: 80.4rem;

	color: var(--Light-Black, #373f41);

	font-size: 1.6rem;
	font-style: normal;
	font-weight: 600;
	line-height: 1.9rem;
	letter-spacing: 0.0032rem;

	h2 {
		color: var(--Text-textColor1, #151515);

		/* Headline/h2 */
		font-size: 2.4rem;
		font-weight: 700;
		line-height: 2.9rem; /* 120.833% */
		letter-spacing: 0.0048rem;
	}

	h3 {
		color: var(--Text-textColor1, #151515);

		/* Headline/h3 */
		font-size: 2rem;
		font-weight: 600;
		line-height: 2.4rem; /* 120% */
		letter-spacing: 0.004rem;
	}

	h4 {
		/* Headline/h4 */
		font-size: 1.8rem;
		font-weight: 600;
		line-height: 2.1rem; /* 116.667% */
		letter-spacing: 0.0036rem;
	}

	h6 {
		/* Body/body2/medium */
		font-size: 1.4rem;
		font-weight: 500;
		line-height: 1.7rem; /* 121.429% */
		letter-spacing: 0.0028rem;
	}

	/* 수평선 */
	hr {
		all: unset;
		margin-top: 5rem;
		height: 1.5px;
		background: #f3f5ff;
	}
`;

const ProfileTitle = styled.h3`
	margin-bottom: 2.4rem;
`;

const ProfileSmallText = styled.span<{ $color?: string }>`
	margin-bottom: 0.6rem;
	color: ${props => props.$color ?? '#747b7f'};

	font-size: 1.2rem;
	font-weight: 600;
	line-height: 1.4rem;
	letter-spacing: 0.0024rem;
`;

const ProfileHeader = styled.header<ResponsiveProps>`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	column-gap: 5.6rem;

	row-gap: 2.4rem; // 반응형 위해 추가

	margin-top: 7.4rem;
	margin-bottom: 9.6rem;

	.profile-header__row {
		display: flex;
		column-gap: 2rem;
		margin-top: 2rem;
		margin-bottom: 1.62rem;

		// 닉네임 길이 따른 임시 레이아웃 변경
		flex-direction: column;
		row-gap: 1.2rem;
	}

	h3 {
		color: var(--State-unactive, #8e8e8e);
	}

	h4 {
		margin-bottom: 1.28rem;
	}

	.profile-header_btn {
		position: absolute;
		right: 0;
		top: 0;
	}
	${props => (props.$isTablet || props.$isMobile) && 'flex-direction: column'}
`;

const ProfileArticle = styled.article`
	display: flex;
	flex-direction: column;
	white-space: pre-wrap; // 줄바꿈

	a {
		color: var(--Light-Black, #373f41); !important;
	}
`;

const ProfileColumn = styled.div<ProfileBoxStyle>`
	flex: 1;
	display: flex;
	flex-direction: column;
	row-gap: ${props => props.$gap};
	width: ${props => props.$width};

	${props =>
		(props.$isTablet || props.$isMobile) &&
		`
			row-gap: 1.2rem;
		`}
`;

const ProfileRow = styled.div<ProfileBoxStyle>`
	flex: 1;
	display: flex;
	flex-direction: row;
	column-gap: ${props => props.$gap};
	width: ${props => props.$width};

	/* 반응형 대비 */
	flex-wrap: wrap;
	row-gap: ${props => props.$gap};

	${props =>
		(props.$isTablet || props.$isMobile) &&
		`flex-direction: column;
			row-gap: 2.4rem;
		`}
`;

const ProfileGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(18.3rem, 1fr));
	grid-auto-rows: minmax(10.3rem, auto);
	row-gap: 2.4rem;
	column-gap: 2.4rem;

	@media (min-width: 144rem) {
		grid-template-columns: repeat(4, minmax(18.3rem, 1fr));
	}

	/* 스크롤바 숨기기 */
	overflow-y: auto;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}
`;

const ProfileEmptyPortfolio = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 15rem 0;

	h3 {
		color: var(--State-unactive, #8e8e8e);
	}
`;

const ProfileDescription = styled.blockquote`
	display: flex;
	margin-bottom: 2.4rem;
	padding: 1.6rem 2rem;
	align-items: center;
	background: var(--Purplescale-100, #f3f5ff);
	color: #747b7f;

	font-size: 1.4rem;
	font-style: normal;
	font-weight: 500;
	line-height: 2.1rem
	letter-spacing: 0.02rem;
`;

const ProfileButtonBox = styled.div`
	display: flex;
	flex-direction: row;
	column-gap: 1.6rem;
	margin-top: 12rem;
	margin-left: auto;
`;

const ProfileTag = styled.span`
	display: flex;
	padding: 0.4rem 0.6rem;
	align-items: center;
	border-radius: 0.4rem;
	border: 0.05rem solid #8e8e8e;
	background: var(--Grayscale-100, #f8fafb);
	color: #8e8e8e;
	font-size: 1.2rem;
	font-weight: 500;
	line-height: 1.4rem;
	letter-spacing: 0.0024rem;
`;

const ProfileMessage = styled.div`
	color: #8e8e8e;
`;

const S = {
	ProfileLayout,
	ProfileTitle,
	ProfileSmallText,
	ProfileHeader,
	ProfileColumn,
	ProfileArticle,
	ProfileRow,
	ProfileGrid,
	ProfileEmptyPortfolio,
	ProfileDescription,
	ProfileButtonBox,
	ProfileTag,
	ProfileMessage,
};

export default S;
