import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { ResponsiveProps } from '../../../types';

interface PortfolioBoxStyle extends ResponsiveProps {
	$gap?: string;
	$width?: string;
}

const PortfolioEditLayout = styled.form`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	margin-bottom: 15rem;
	width: clamp(45%, 96rem, 75%); // width: 96rem;

	color: var(--Light-Black, #373f41);

	/* Body/body1/medium */
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

	h4 {
		/* Headline/h4 */
		font-size: 1.8rem;
		font-style: normal;
		font-weight: 600;
		line-height: 2.1rem; /* 116.667% */
		letter-spacing: 0.0036rem;
	}

	h6 {
		/* Body/body2/semibold */
		font-size: 1.4rem;
		font-style: normal;
		font-weight: 600;
		line-height: 1.7rem; /* 121.429% */
		letter-spacing: 0.0028rem;
	}

	/* 수평선 */
	hr {
		all: unset;
		margin-top: 4rem;
		height: 0.075rem;
		background: #e3e3e3;
	}
`;

const PortfolioEditColumn = styled.div<PortfolioBoxStyle>`
	display: flex;
	flex-direction: column;
	row-gap: ${props => props.$gap};
	${props => (props.$width ? `width: ${props.$width}` : `flex: 1;`)};
`;

const PortfolioEditRow = styled.div<PortfolioBoxStyle>`
	display: flex;
	flex-direction: row;
	column-gap: ${props => props.$gap};
	${props => (props.$width ? `width: ${props.$width}` : `flex: 1;`)};

	/* 반응형 대비 */
	flex-wrap: wrap;
	row-gap: ${props => props.$gap};

	${props =>
		(props.$isTablet || props.$isMobile) &&
		`flex-direction: column;
			row-gap: 1.2rem;
			button {
				margin-left: 0;
				margin-right: auto;
			}
		`}
`;

const PortfolioEditHeader = styled.header`
	display: flex;
	flex-direction: column;
	margin-top: 8rem;

	/* 반응형 대비 */
	flex-wrap: wrap;
	column-gap: 2.4rem;

	h2 {
		margin-bottom: 1.2rem;
	}

	hr {
		margin-top: 2rem;
		background: #000000;
	}
`;

const PortfolioEditTitle = styled.h4`
	display: flex;
`;

const PortfolioEditLabel = styled.h6<{ $required?: boolean }>`
	margin-bottom: 0.8rem;

	${props =>
		props.$required &&
		`&:: after {
			content: ' *';
			color: #f85858;
		}`}
`;

const PortfolioEditArticle = styled.article`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	white-space: pre-wrap; // 줄바꿈

	/* 반응형 대비 */
	flex-wrap: wrap;
	row-gap: 2.4rem;
`;

const PortfolioEditRelativeBox = styled.div`
	position: relative;
	display: flex;
`;

const PortfolioEditErrorMessage = styled.small`
	position: absolute;
	bottom: -1.6rem;
	left: 1rem;
	white-space: nowrap; // 줄바꿈 방지
	color: var(--ButtonColors-Caution-outline-defaultLine, #f85858);

	/* Text/t4 */
	font-size: 1rem;
	font-style: normal;
	font-weight: 500;
	line-height: 1.2rem; /* 120% */
	letter-spacing: 0.002rem;
`;

const PortfolioEditor = styled(ReactQuill)`
	display: flex;
	flex-direction: column;
	min-height: 27.1rem;
	border-radius: 0.75rem;
	border: 0.1rem solid #e3e3e3;
	overflow: hidden;

	&:hover,
	focus {
		border-color: var(--Form-border-focus, #5877fc);
	}

	.ql-toolbar {
		border: 0;
		border-bottom: 0.1rem solid #e3e3e3;
	}

	.ql-container {
		display: flex;
		border: 0;
		color: var(--Light-Black, #373f41);
		white-space: pre-wrap; // 줄바꿈

		/* 스크롤바 스타일링 */
		overflow-y: auto;
		&::-webkit-scrollbar {
			width: 1.8rem;
		}
		&::-webkit-scrollbar-thumb {
			background-color: #e3e3e3;
			border-radius: 1rem;
			background-clip: padding-box;
			border: 0.5rem solid transparent;
		}

		/* Body/body1/medium */

		font-size: 1.6rem;
		font-style: normal;
		font-weight: 500;
		line-height: 1.9rem;
		letter-spacing: 0.0032rem;
	}

	.ql-editor {
		width: 100%;
		padding: 1.5rem 1.7rem;
	}

	&.quill > .ql-container > .ql-editor.ql-blank::before {
		display: flex;
		color: #8e8e8e;
	}

	strong {
		font-weight: bold;
	}
	em {
		font-style: italic;
	}
`;

const PortfolioEditButtonBox = styled.div`
	display: flex;
	flex-direction: row;
	column-gap: 1.6rem;
	margin-top: 12rem;
	margin-left: auto;
`;

const S = {
	PortfolioEditLayout,
	PortfolioEditColumn,
	PortfolioEditRow,
	PortfolioEditHeader,
	PortfolioEditTitle,
	PortfolioEditLabel,
	PortfolioEditArticle,
	PortfolioEditRelativeBox,
	PortfolioEditErrorMessage,
	PortfolioEditor,
	PortfolioEditButtonBox,
};

export default S;
