import styled from 'styled-components';

const NotFound = styled.article`
	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		margin-top: 6.4rem;
		width: 20rem;
		height: 20rem;
	}

	h1 {
		color: #151515;
		text-align: center;

		font-size: 2.8rem;
		font-weight: 700;
		line-height: 3.6rem;
		letter-spacing: 0.0056rem;
	}

	.body1-semibold {
		color: #373f41;

		font-size: 1.6rem;
		font-weight: 600;
		line-height: 1.9rem;
		letter-spacing: 0.0032rem;
		margin-top: 1.2rem;
	}

	.txt-big {
		color: #f7faff;

		font-size: 1.6rem;
		line-height: 1.9rem;
		letter-spacing: 0.0032rem;
	}

	.container-title {
		margin-top: 4rem;
	}

	button {
		display: flex;
		width: 25.9rem;
		height: 4.8rem;
		padding: 1.2rem 3.2rem;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		flex-shrink: 0;
		border-radius: 0.6rem;
		background: #5877fc;
		margin-top: 5.45rem;
	}
	.faq {
		color: #373f41;

		font-size: 1.2rem;
		line-height: 1.4rem;
		letter-spacing: 0.0024rem;
		text-decoration-line: underline;
		margin-top: 1.6rem;
		cursor: pointer;
	}
`;

const S = { NotFound };

export default S;
