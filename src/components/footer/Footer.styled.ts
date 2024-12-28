import styled from 'styled-components';

const Footer = styled.article`
	width: 100%;
	background: #f6f6f6;

	.wrapper {
		width: clamp(45%, 96rem, 75%);
		display: flex;
		justify-content: space-between;
		padding: 6.5rem 0;

		margin: 0 auto;
	}

	h3 {
		color: #373f41;
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 0.4rem;
	}

	h5 {
		color: #373f41;
		font-size: 1.6rem;
		font-weight: 600;
		line-height: 1.9rem;
		letter-spacing: 0.0032rem;
	}

	.copyright {
		color: #8e8e8e;

		font-size: 1.4rem;
		line-height: 1.6rem;
		letter-spacing: 0.0028rem;
	}

	.wrapper-logo {
		display: flex;
		flex-direction: column;

		.container-logo {
			display: flex;
			align-items: center;
		}

		.logo {
			max-height: 8rem;
			aspect-ratio: 1.8/1;
		}

		.container-copyright {
			display: flex;
			flex-direction: column;
			margin-top: 3.6rem;
		}
	}

	.wrapper-menu {
		width: 50%;
		display: flex;
		justify-content: space-between;
		margin-top: 7.6rem;
		cursor: pointer;
	}

	@media (max-width: 900px) {
		width: 100%;

		.wrapper {
			display: flex;
			gap: 10rem;
			padding: 3rem 1rem;
		}

		.wrapper-menu {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			margin-top: 2rem;
		}

		.container-logo {
			flex-direction: column;
			align-items: center;
		}

		.logo {
			height: 7rem;
			aspect-ratio: 1.8/1;
		}

		.container-copyright {
			margin-top: 2rem;
			align-items: center;
		}
	}

	@media (max-width: 600px) {
		.wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.logo {
			height: 6rem;
			aspect-ratio: 1.8/1;
		}

		h5 {
			font-size: 1.4rem;
		}

		.copyright {
			font-size: 1.2rem;
		}

		.wrapper-menu {
			margin-top: 2.5rem;
		}
	}
`;

const S = { Footer };

export default S;
