import styled from 'styled-components';
import { ResponsiveProps } from '../../../../types';

const PortfolioImageModalLayout = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: rgba(21, 21, 21, 0.4);
`;

const PortfolioImageModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4rem;
	width: clamp(30%, 52rem, 75%);
	border-radius: 1rem;
	border: 0.1rem solid var(--box_stroke, #e3e3e3);
	background: var(--Grayscale-100, #f8fafb);
	color: var(--Text-textColor2, var(--text-color-2, #373f41));

	/* Body/body1/medium */
	font-size: 1.6rem;
	font-weight: 500;
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
`;

const PortfolioImageModalHeader = styled.header`
	display: flex;
	flex-direction: column;
	width: 100%;

	h2 {
		margin-bottom: 2rem;
	}
`;

const PortfolioImageList = styled.ul`
	flex: 1;
	display: flex;
	flex-direction: column;
	row-gap: 0.4rem;
	margin-bottom: 2.8rem;
	max-height: 38rem;

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
`;

const PortfolioImageItem = styled.li`
	display: flex;
	flex-direction: row;
	height: 9.2rem;
	align-items: center;
	border-radius: 1rem;
	border: 0.1rem solid var(--box_stroke, #e3e3e3);
	background: var(--Form-fill-others, #fff);
`;

const PortfolioImageListIcon = styled.span<ResponsiveProps>`
	display: flex;
	padding: 1.6rem;
	align-items: center;
	height: 100%;
	border-right: 0.1rem solid var(--box_stroke, #e3e3e3);

	${props =>
		props.$isMobile &&
		`
		padding: 0.8rem;
		`}
`;

const PortfolioImageWrapper = styled.div<ResponsiveProps>`
	display: flex;
	width: 10rem;
	flex-direction: row;
	margin: 1.6rem;
	align-items: center;

	${props =>
		props.$isMobile &&
		`
		margin: 0.8rem;
		`}
`;

const PortfolioImageModalRow = styled.div<{ $gap?: string }>`
	flex: 1;
	display: flex;
	flex-direction: row;
	column-gap: ${props => props.$gap};
	align-items: center;
`;

const PortfolioImageModalColumn = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const PortfolioImageTitle = styled.span`
	display: flex;
	flex: 1;
	text-overflow: ellipsis;
	overflow: hidden;
	word-break: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 2; // 원하는 라인수
	-webkit-box-orient: vertical;
`;

const PortfolioImageNumberIcon = styled.span<ResponsiveProps>`
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 1.6rem;
	width: 2.8rem;
	height: 2.8rem;
	border-radius: 10rem;
	background: var(--main-color, #5877fc);
	color: var(--ButtonColors-Primary-outline-default, #fff);

	font-size: 1.6rem;
	font-weight: 600;
	line-height: 2.4rem;
	letter-spacing: 0.0032rem;

	${props =>
		props.$isMobile &&
		`
		margin: 0;
		margin-right: 0.8rem;
		`}
`;

const S = {
	PortfolioImageModalLayout,
	PortfolioImageModalContainer,
	PortfolioImageModalHeader,
	PortfolioImageList,
	PortfolioImageItem,
	PortfolioImageListIcon,
	PortfolioImageWrapper,
	PortfolioImageModalRow,
	PortfolioImageModalColumn,
	PortfolioImageTitle,
	PortfolioImageNumberIcon,
};

export default S;
