import styled from 'styled-components';

interface PortfolioCardStyle {
	$open?: boolean;
}

const PortfolioCardLayout = styled.article<PortfolioCardStyle>`
	position: relative;
	display: flex;
	flex-direction: column;
	row-gap: 0.8rem;

	cursor: pointer;
	${props =>
		!props.$open &&
		`
			button:last-of-type {
				display: none;
			}

			&:hover {
				button:last-of-type {
					display: flex;
				}
			}
	`}
`;

const PortfolioCardBox = styled.div<{ $isEditable?: boolean }>`
	position: relative;

	border-radius: 1rem;
	border: ${props => props.$isEditable && '0.1rem solid var(--Form-border-default, #e3e3e3)'};
	overflow: hidden;

	aspect-ratio: 183 / 103; // 포트폴리오 비율

	button:first-of-type {
		display: flex;
	}
`;

const PortfolioCardImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const PortfolioCardTitle = styled.div`
	color: var(--Light-Black, #373f41);

	font-size: 1.6rem;
	font-weight: 600;
	line-height: 2.4rem;
	letter-spacing: 0.0032rem;

	text-overflow: ellipsis;
	overflow: hidden;
	word-break: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 2; // 원하는 라인수
	-webkit-box-orient: vertical;
`;

const PortfolioTagRow = styled.div`
	position: absolute;
	top: 0.8rem;
	left: 0.9rem;

	display: flex;
	flex-direction: row;
	column-gap: 0.8rem;
`;

const PortfolioCardTag = styled.span<{ $color?: string }>`
	align-items: center;

	display: flex;
	padding: 0.4rem 0.8rem;
	border-radius: 0.4rem;

	background: ${props => props.$color};
	color: var(--Text-textColor1, var(--text-color, #151515));

	/* Text/t2 */

	font-size: 1.2rem;
	font-style: normal;
	font-weight: 500;
	line-height: 1.4rem; /* 116.667% */
	letter-spacing: 0.0024rem;

	&.main-image-tag {
		padding: 0.6rem 0.8rem;
		border-radius: 1.5rem;
		border: 1px solid var(--Purplescale-200, #e0e6ff);
		background: var(--Grayscale-000, #fff);
	}
`;

const PortfolioCardNumberButton = styled.button<{ $checked?: boolean }>`
	position: absolute;
	bottom: 1rem;
	right: 1rem;

	box-sizing: border-box;
	display: flex;
	width: 2.8rem;
	height: 2.8rem;
	justify-content: center;
	align-items: center;
	border-radius: 10rem;
	${props => !props.$checked && 'border: 1px solid #fff'};
	background: ${props =>
		props.$checked ? 'var(--main-color, #5877FC)' : 'rgba(255, 255, 255, 0.3)'};
	color: var(--ButtonColors-Primary-outline-default, #fff);

	font-size: 1.6rem;
	font-weight: 600;
	line-height: 2.4rem;
	letter-spacing: 0.0032rem;
`;

const PortfolioCardIconButton = styled(PortfolioCardNumberButton)`
	top: -1rem;
	left: -1rem;
`;

const PortfolioImageInput = styled.input`
	position: absolute;
	display: none;
`;

const S = {
	PortfolioCardLayout,
	PortfolioCardBox,
	PortfolioCardImage,
	PortfolioCardTitle,
	PortfolioTagRow,
	PortfolioCardTag,
	PortfolioCardNumberButton,
	PortfolioCardIconButton,
	PortfolioImageInput,
};

export default S;
