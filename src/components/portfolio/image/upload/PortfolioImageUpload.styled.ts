import styled from 'styled-components';

const PortfolioImageUploadLayout = styled.article`
	display: flex;
	flex-direction: column;
`;

const PortfolioImageGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(24.4rem, 1fr));
	grid-auto-rows: minmax(13.7rem, auto);
	row-gap: 1.6rem;
	column-gap: 1.6rem;
`;

const PortfolioImageUpload = styled.div<{ $invalid?: boolean }>`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 1rem;
	border: 0.1rem solid
		${props =>
			props.$invalid
				? 'var(--ButtonColors-Caution-outline-defaultLine, #F85858)'
				: 'var(--Form-border-default, #8e8e8e)'};
	background: var(--Grayscale-200, #f6f6f6);
	color: var(--Text-textColor2, var(--text-color-2, #373f41));
	cursor: pointer;
	aspect-ratio: 183 / 103; // 포트폴리오 비율

	/* Body/body1/semibold */
	font-size: 1.6rem;
	font-style: normal;
	font-weight: 600;
	line-height: 1.9rem;
	letter-spacing: 0.0032rem;

	small {
		color: #8e8e8e;

		/* Text/t2 */
		font-size: 1.2rem;
		font-style: normal;
		font-weight: 500;
		line-height: 1.4rem;
		letter-spacing: 0.0024rem;
	}
`;

const PortfolioImageUploadRow = styled.div`
	display: flex;
	flex-direction: row;
	column-gap: 0.6rem;
`;

const PortfolioImageUploadColumn = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	row-gap: 0.8rem;
`;

const PortfolioImageInput = styled.input`
	position: absolute;
	width: 100%;
	height: 100%;
	display: none;
`;

const PortfolioImageUploadContainer = styled.div`
	position: relative;
	display: flex;
`;

const PortfolioImageUploadErrorMessage = styled.small`
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

const S = {
	PortfolioImageUploadLayout,
	PortfolioImageGrid,
	PortfolioImageUpload,
	PortfolioImageUploadRow,
	PortfolioImageUploadColumn,
	PortfolioImageInput,
	PortfolioImageUploadContainer,
	PortfolioImageUploadErrorMessage,
};

export default S;
