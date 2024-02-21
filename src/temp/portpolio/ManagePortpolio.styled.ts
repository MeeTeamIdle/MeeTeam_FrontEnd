import styled from 'styled-components';

const ManagePortpolioPage = styled.div`
	margin-top: 5.92rem;

	h1 {
		color: var(--Light-Black, var(--text-color-2, #373f41));

		font-size: 2.1rem;
		font-style: normal;
		font-weight: 400;
		line-height: 4.2rem; /* 200% */
		letter-spacing: 0.015rem;
		margin-top: 3.22rem;
	}

	.description {
		font-size: 1.4rem;
		color: #535c68;
		font-weight: 400;
	}

	.container-contents {
		display: grid;
		margin-top: 1.65rem;
		grid-template-columns: repeat(3, 1fr);
		row-gap: 1.5rem;
		column-gap: 1.5rem;
	}
`;

const S = { ManagePortpolioPage };

export default S;