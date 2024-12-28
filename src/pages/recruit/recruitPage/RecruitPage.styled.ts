import styled from 'styled-components';

interface RecruitPage {
	$isDetailedClick: boolean;
}

const RecruitPage = styled.div<RecruitPage>`
	width: clamp(45%, 96rem, 75%);
	margin: 0 auto;
	position: relative;

	h2 {
		color: #373f41;
		font-size: 2.4rem;
		font-weight: 700;
		line-height: 2.9rem;
		letter-spacing: 0.0048rem;
	}

	h3 {
		color: #8e8e8e;
		font-size: 2rem;
		font-weight: 600;
		line-height: 2.4rem;
		letter-spacing: 0.004rem;
	}

	.body1 {
		color: #8e8e8e;
		font-size: 1.6rem;
		line-height: 1.9rem;
		letter-spacing: 0.0032rem;
	}

	.body2 {
		color: #5877fc;
		font-size: 1.4rem;
		font-weight: 600;
		letter-spacing: 0.0028rem;
	}

	.t1 {
		color: #373f41;
		font-size: 1.2rem;
		font-weight: 600;
		line-height: 1.4rem;
		letter-spacing: 0.0024rem;
	}

	.nav-info {
		color: #373f41;

		font-size: 1.4rem;
		font-weight: 600;
	}

	.wrapper-filters {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 3.2rem;

		.container-filters {
			display: flex;
			align-items: center;
			gap: 1.6rem;

			.clear {
				display: flex;
				align-items: center;
				gap: 0.4rem;
				cursor: pointer;

				span {
					margin-top: 0.2rem;
					font-size: 1.4rem;
					letter-spacing: 0.0028rem;
					color: #8e8e8e;
				}
			}
		}
	}

	hr {
		margin: 2.32rem auto;
		background: #e3e3e3;
		height: 0.75px;
		border: 0;
	}

	.container-contents {
		margin-top: 2rem;
		display: flex;
		min-height: 40rem;
		flex-direction: column;
		gap: 3.75rem;
		margin-bottom: 5rem;

		.bookmark-intro {
			display: flex;
			align-items: center;
			gap: 0.8rem;
			cursor: pointer;
			width: 15rem;

			img {
				width: 1.4rem;
				height: 1.8rem;
			}
		}

		.container-contents__grid {
			margin-top: 2rem;
			flex-wrap: wrap;
			row-gap: 1.8rem;
			column-gap: 1.5rem;
			display: flex;

			@media (max-width: 600px) {
				display: grid;
				margin: 2rem auto;
				margin-left: -1rem;
				grid-template-columns: repeat(2, 1fr);
				row-gap: 1.8rem;
			}

			@media (max-width: 431px) {
				display: grid;
				margin: 2rem auto;
				grid-template-columns: repeat(1, 1fr);
				row-gap: 1.8rem;
				justify-items: center;
			}
		}

		.no-results {
			margin-top: 15rem;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 2rem;
			font-weight: 600;
			color: #8e8e8e;
		}
	}

	.container-pagination {
		display: flex;
		justify-content: center;
		align-items: center;

		ul {
			list-style: none;
			display: flex;
		}
	}

	@media (max-width: 1200px) {
		width: 90%;

		.container-contents__grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 920px) {
		.wrapper-filters {
			flex-direction: column;
			align-items: flex-start;
			gap: 1.6rem;
		}
	}

	@media (max-width: 768px) {
		.wrapper-filters {
			flex-direction: column;
			align-items: flex-start;
			gap: 1.6rem;

			.container-options__search {
				width: 100%;
			}
		}

		.container-contents__grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.container-filters {
			flex-wrap: wrap;
			gap: 0.8rem;
		}

		.wrapper-filters {
			.container-options__search {
				width: 100%;
			}
		}
	}

	@media (max-width: 431px) {
		.container-filters {
			flex-wrap: wrap;
			gap: 0.4rem;
		}

		.wrapper-filters {
			.container-options__search {
				width: 100%;
			}

			.dropdown-detailed {
				min-width: 15rem;

				.container-dropdown {
					width: 100%;
				}
			}
		}
	}
`;

const S = { RecruitPage };

export default S;
