import styled from 'styled-components';

const RecruitDescription = styled.article`
	margin-top: 8rem;

	hr {
		height: 0.1125rem;
		background: #e3e3e3;
		border: none;
	}

	.container-contents {
		margin-top: 4.8rem;
		padding: 0 9.8rem 1rem 9.8rem;
		color: #373f41;
		font-size: 1.6rem;
		font-weight: 500;

		letter-spacing: 0.0032rem;
		box-sizing: border-box;
		line-height: 1.75;
		letter-spacing: 2%;

		.empty-p {
			line-height: 1.2;
		}

		h1 {
			font-size: 3.2rem;
		}
		h2 {
			font-size: 2.4rem;
		}
		h3 {
			font-size: 2rem;
		}
		h4 {
			font-size: 1.6rem;
		}
		h5 {
			font-size: 1.328rem;
		}
		h6 {
			font-size: 1.072rem;
		}
		strong {
			font-weight: bold;
		}
		em {
			font-style: italic;
		}
		blockquote {
			border-left: 4px solid #ccc;
			margin-bottom: 5px;
			margin-top: 5px;
			padding-left: 16px;
		}
		ul {
			list-style-type: circle;
			padding-left: 2rem;
		}
		ol {
			list-style-type: decimal;
			padding-left: 2rem;
		}

		.ql-indent-1 {
			margin-left: 5rem;
		}

		.ql-indent-2 {
			margin-left: 10rem;
		}

		.ql-indent-3 {
			margin-left: 15rem;
		}
	}

	@media (max-width: 450px) {
		.container-contents {
			padding: 0 1.6rem 1rem 1.6rem;
		}
	}
`;

const S = { RecruitDescription };

export default S;
