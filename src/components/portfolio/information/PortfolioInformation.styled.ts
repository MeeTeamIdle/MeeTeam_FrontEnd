import styled from 'styled-components';
import { ResponsiveProps } from '../../../types';

interface PortfolioBoxStyle extends ResponsiveProps {
	$gap?: string;
	$width?: string;
}

const PortfolioInformationLayout = styled.article`
	min-width: 0;
	display: flex;
	flex-direction: column;
	row-gap: 4rem;
	padding: 4.8rem clamp(5%, 9.8rem, 8%);
	border-radius: 1rem;
	border: 0.075rem solid var(--box_stroke, #e3e3e3);
	color: var(--Text-textColor2, var(--text-color-2, #373f41));

	/* Body/body1/semibold */
	font-size: 1.6rem;
	font-style: normal;
	font-weight: 600;
	line-height: 1.9rem; /* 118.75% */
	letter-spacing: 0.0032rem;

	h5 {
		width: 9.8rem;
		color: #8e8e8e;
		font-weight: 500;
	}
`;

const PortfolioInformationRow = styled.div<PortfolioBoxStyle>`
	flex: 1;
	display: flex;
	flex-direction: row;
	column-gap: ${props => props.$gap};
	width: ${props => props.$width};

	/* 반응형 대비 */
	flex-wrap: wrap;
	row-gap: ${props => props.$gap};

	${props =>
		props.$isMobile &&
		`flex-direction: column;
			row-gap: 0.8rem;
		`}
`;

const PortfolioInformationGrid = styled.div<PortfolioBoxStyle>`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(33.6rem, 1fr));
	grid-auto-rows: minmax(1.9rem, auto);
	row-gap: 4rem;
	column-gap: 4rem;
`;

const S = {
	PortfolioInformationLayout,
	PortfolioInformationRow,
	PortfolioInformationGrid,
};

export default S;
