import styled from 'styled-components';

const ComboBoxLayout = styled.div<{ $width?: string }>`
	position: relative;
	min-width: 0;
	display: flex;
	flex-direction: column;
	${props => (props.$width ? `width: ${props.$width}` : `flex: 1;`)};

	h6 {
		/* Body/body2/semibold */

		font-size: 1.4rem;
		font-style: normal;
		font-weight: 600;
		line-height: 1.7rem; /* 121.429% */
		letter-spacing: 0.0028rem;
	}
`;

const S = { ComboBoxLayout };

export default S;
