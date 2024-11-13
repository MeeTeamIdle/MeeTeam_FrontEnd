import styled from 'styled-components';
import { ResponsiveProps } from '../../../types';

const LinkDetailsLayout = styled.div<ResponsiveProps>`
	display: flex;
	flex-direction: row;
	color: var(--text-color, #151515);
	width: 100%;

	div {
		display: flex;
		flex-direction: row;
	}

	h4 {
		width: 9.8rem;
	}

	img {
		margin-right: 0.6rem;
	}

	a {
		color: var(--text-color, #151515) !important;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	${props =>
		(props.$isTablet || props.$isMobile) &&
		`flex-direction: column;
			row-gap: 0.6rem;
		`}
`;

const S = { LinkDetailsLayout };

export default S;
