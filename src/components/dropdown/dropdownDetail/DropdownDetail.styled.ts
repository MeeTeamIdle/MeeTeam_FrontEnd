import styled from 'styled-components';

const DropdownDetail = styled.section<{ $isDetailSelected: boolean }>`
	position: relative;
	display: flex;
	align-items: center;
	width: 13.5rem;
	padding: 1.2rem 1rem 1.2rem 1.6rem;
	border: 1px solid #e0e6ff;
	box-sizing: border-box;
	border-radius: 0.6rem;
	font-size: 1.5rem;
	color: #373f41;
	font-weight: 400;
	height: 4.8rem;

	.selected {
		color: ${props => (props.$isDetailSelected ? '#5877FC' : '#373f41')};
		font-weight: ${props => (props.$isDetailSelected ? '600' : '500')};
	}

	&:hover {
		border: 1px solid #5877fc;
	}

	.dropdown-box {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		gap: 1.6rem;
	}

	.container-dropdown {
		position: absolute;
		top: 5rem;
		left: 0rem;
		display: flex;
		width: 74.8rem;
		height: 39.9rem;
		align-items: flex-start;
		border-radius: 1rem;
		border: 1px solid #e3e3e3;
		background: #fff;
		box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
		z-index: 501;

		@media (max-width: 600px) {
			width: 40rem;
			height: auto;
			flex-direction: column;
			margin: 1rem auto;
			padding: 0.8rem;
			font-size: 0.8rem;
			text-align: center;
		}

		@media (max-width: 431px) {
			width: 37rem;
			height: auto;
			flex-direction: column;
			margin: 1rem auto;
			padding: 0.8rem;
			font-size: 0.8rem;
			text-align: center;
		}

		.sidebar {
			display: flex;
			width: 10rem;
			height: 100%;
			padding: 2.8rem 2.8rem 2.8rem 3.2rem;
			box-sizing: border-box;
			flex-direction: column;
			border-right: 0.1rem solid #e3e3e3;
			gap: 2.1rem;

			.sidebar-elem {
				cursor: pointer;
			}

			.active {
				color: #151515;
			}

			@media (max-width: 431px) {
				flex-direction: row;
				border-right: none;
				border-bottom: 0.1rem solid #e3e3e3;
				width: 100%;
				padding: 1.6rem 1.6rem 1.6rem 2rem;
			}
		}

		.dropdown-search {
			width: 100%;
			padding: 2.8rem 3.2rem 2.8rem 2.8rem;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			gap: 2rem;
			position: relative;

			.search {
				height: 4.8rem;
				border-radius: 1rem;
				border: 1px solid #e3e3e3;
				background: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 1.2rem 1.6rem;
				box-sizing: border-box;

				input {
					padding: 0;
					margin: 0;
					border: none;
					outline: none;
				}
			}

			.role-menu {
				position: absolute;
				width: 59rem;
				top: 12rem;
				border-radius: 1rem;
				border: 1px solid #e3e3e3;
				padding: 1.2rem 1.6rem;
				box-sizing: border-box;
				background: #fff;
				box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);

				ul {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					gap: 1.2rem;
					color: #8e8e8e;

					li {
						width: 100%;
						cursor: pointer;
						&:hover {
							color: #373f41;
						}
					}
				}

				@media (max-width: 431px) {
					top: 14rem;
					border-bottom: 0.1rem solid #e3e3e3;
					width: 82.5%;
					padding: 1.6rem 1.6rem 1.6rem 2rem;

					ul {
						display: flex;
						flex-direction: column;
						flex-wrap: wrap;

						li {
							display: flex;
							flex-wrap: wrap;
							justify-content: flex-start;
						}
					}
				}
			}

			.container-tag {
				display: flex;
				width: 100%;
				min-height: 18rem;
				padding: 1.8rem 2rem;
				align-items: flex-start;
				align-content: flex-start;
				gap: 1.6rem;
				flex-wrap: wrap;
				border-radius: 1rem;
				background: #f8fafb;

				.tags {
					display: flex;
					height: auto;
					padding: 0.7rem 0 0.7rem 1.125rem;
					justify-content: center;
					align-items: center;
					flex-shrink: 1;
					margin: 5px;
					border-radius: 7.5rem;
					background: #e0e6ff;
					color: #373f41;
					font-size: 1.5rem;
					font-style: normal;
					font-weight: 400;
					line-height: 1.8rem;
					letter-spacing: 0.02rem;
					box-sizing: border-box;
				}

				button {
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: transparent;
					margin-left: 5px;
					border-radius: 50%;
					color: #54a0ff;
					border: none;
					box-sizing: border-box;
					cursor: pointer;

					img {
						width: 2rem;
						box-sizing: border-box;
					}
				}

				@media (max-width: 431px) {
					.container-tag {
						max-height: 18rem;
						overflow-y: auto;

						.tags {
							display: flex;
							flex-wrap: wrap;
							padding: 0.5rem 1rem;
							margin: 0.5rem;
							flex-shrink: 1;
						}
					}
					button {
						margin-left: 0.5rem;

						img {
							width: 1.5rem;
							box-sizing: border-box;
						}
					}
				}
			}

			.container-btns {
				display: flex;
				align-items: center;
				gap: 1.6rem;
				justify-content: flex-end;

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

				button {
					display: flex;
					height: 3.6rem;
					padding: 1.2rem 2rem;
					box-sizing: border-box;
					border-radius: 0.6rem;
					background: #5877fc;
					color: #fff;
					font-size: 1.4rem;
					line-height: 1.7rem;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}

	@media (max-width: 431px) {
		.wrapper-title {
			gap: 0.4rem;

			.dropdown-field {
				width: 100%;
				height: 20rem;
				left: 0;
			}
		}

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

		.container-dropdown {
			position: absolute;
			width: 449px;
		}
	}
`;

const S = { DropdownDetail };

export default S;
