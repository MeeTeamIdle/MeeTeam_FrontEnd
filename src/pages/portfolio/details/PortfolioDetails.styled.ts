import styled from 'styled-components';
import { ResponsiveProps } from '../../../types';

interface PortfolioBoxStyle extends ResponsiveProps {
	$gap?: string;
	$width?: string;
}

const PortfolioDetailsLayout = styled.div`
	display: flex;
	flex-direction: column;

	color: var(--Light-Black, #373f41);

	/* Body/body1/semibold */
	font-size: 1.6rem;
	font-style: normal;
	font-weight: 600;
	line-height: 1.9rem; /* 118.75% */
	letter-spacing: 0.0032rem;

	h1 {
		/* Headline/h1 */
		font-size: 2.8rem;
		font-style: normal;
		font-weight: 700;
		line-height: 3.6rem; /* 128.571% */
		letter-spacing: 0.0056rem;
	}

	h3 {
		color: var(--text-color, #151515);

		/* Headline/h3 */
		font-size: 2rem;
		font-style: normal;
		font-weight: 600;
		line-height: 2.4rem; /* 120% */
		letter-spacing: 0.004rem;
	}

	h4 {
		/* Headline/h4 */
		font-size: 1.8rem;
		font-style: normal;
		font-weight: 600;
		line-height: 2.1rem; /* 116.667% */
		letter-spacing: 0.0036rem;
	}

	h5 {
		/* Headline/h5 */
		font-size: 1.6rem;
		font-style: normal;
		font-weight: 600;
		line-height: 1.9rem; /* 118.75% */
		letter-spacing: 0.0032rem;
	}

	/* 수평선 */
	hr {
		all: unset;
		margin-bottom: 4rem;
		height: 0.1rem;
		background: #e3e3e3;
	}
`;

const PortfolioDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	width: clamp(45%, 96rem, 75%); // width: 96rem;
`;
const PortfolioDetailsTitle = styled.h3`
	margin-bottom: 1.2rem;
`;

const PortfolioDetailsHeader = styled.header<ResponsiveProps>`
	position: relative;
	display: flex;
	margin-top: 7.4rem;
	margin-bottom: 2.7rem;

	h1 {
		color: var(--Text-textColor1, var(--text-color, #151515));
	}

	${props =>
		(props.$isTablet || props.$isMobile) &&
		`
			flex-direction: column;
			row-gap: 1.6rem;
		`}
`;

const PortfolioDetailsArticle = styled.article`
	display: flex;
	flex-direction: column;
	margin-bottom: 8rem;
	white-space: pre-wrap; // 줄바꿈
`;

const PortfolioDetailsColumn = styled.div<PortfolioBoxStyle>`
	flex: 1;
	display: flex;
	flex-direction: column;
	row-gap: ${props => props.$gap};
	width: ${props => props.$width};
`;

const PortfolioDetailsRow = styled.div<PortfolioBoxStyle>`
	flex: 1;
	display: flex;
	flex-direction: row;
	column-gap: ${props => props.$gap};
	width: ${props => props.$width};

	/* 반응형 대비 */
	flex-wrap: wrap;
	row-gap: ${props => props.$gap};
`;

const PortfolioDetailsContent = styled.article`
	display: flex;
	flex-direction: column;
	padding: 0 clamp(5%, 9.8rem, 8%);
	font-weight: 500;
	white-space: pre-wrap; // 줄바꿈
	word-wrap: break-word;

	/* 상세 내용 스타일링 */
	.empty-p {
		line-height: 1.2;
	}

	h1 {
		font-size: 3.2rem;
	}
	h2 {
		font-size: 2.4rem;
	}
	h3 {
		font-size: 1.872rem;
	}
	h4 {
		font-size: 1.6rem;
	}
	h5 {
		font-size: 1.328rem;
	}
	h6 {
		font-size: 1.072rem;
	}
	strong {
		font-weight: bold;
	}
	em {
		font-style: italic;
	}
	blockquote {
		border-left: 4px solid #ccc;
		margin-bottom: 5px;
		margin-top: 5px;
		padding-left: 16px;
	}
	ul {
		list-style-type: circle;
		padding-left: 2rem;
	}
	ol {
		list-style-type: decimal;
		padding-left: 2rem;
	}

	.ql-indent-1 {
		margin-left: 5rem;
	}

	.ql-indent-2 {
		margin-left: 10rem;
	}

	.ql-indent-3 {
		margin-left: 15rem;
	}
`;

const PortfolioDetailsButtonContainer = styled.div<ResponsiveProps>`
	display: flex;
	flex-direction: row;
	column-gap: 1.4rem;

	${props =>
		props.$isTablet || props.$isMobile
			? `
			margin-right: auto;
		`
			: `margin-left: auto;`}
`;

const S = {
	PortfolioDetailsLayout,
	PortfolioDetailsContainer,
	PortfolioDetailsTitle,
	PortfolioDetailsHeader,
	PortfolioDetailsArticle,
	PortfolioDetailsColumn,
	PortfolioDetailsRow,
	PortfolioDetailsContent,
	PortfolioDetailsButtonContainer,
};

export default S;
