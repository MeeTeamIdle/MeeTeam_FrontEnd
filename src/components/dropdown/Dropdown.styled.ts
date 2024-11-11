import styled from 'styled-components';

interface IDropdown {
	$showDropdown?: boolean;
	$scope?: boolean;
	$isCategorySelected?: boolean;
}

const Dropdown = styled.div<IDropdown>`
	position: relative;

	.wrapper {
		position: relative;
		display: flex;
		align-items: center;
		height: 4.8rem;
		padding: 1.2rem 1rem 1.2rem 1.6rem;
		border: 1px solid ${props => (props.$showDropdown ? '#5877FC' : '#e0e6ff')};
		box-sizing: border-box;
		border-radius: 0.6rem;
		min-width: ${props => (!props.$scope ? '13rem' : '15rem')};

		&:hover {
			border: 1px solid #5877fc;
		}

		.dropdown-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #373f41;
			width: 100%;

			.value {
				font-size: 1.6rem;
			}

			.category-selected {
				color: ${props => (props.$isCategorySelected ? '#5877FC' : '#373f41')};
				font-weight: ${props => (props.$isCategorySelected ? '600' : '500')};
			}
		}

		.dropdown {
			position: absolute;
			top: 5rem;
			width: 100%;
			right: 0rem;
			padding: 1.2rem 1.6rem;
			box-sizing: border-box;
			z-index: 500;
			border-radius: 1rem;
			border: 1px solid #e3e3e3;
			background: #fff;
			box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
			display: flex;

			.menu-container {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 1.6rem;
				gap: 2rem;
				color: #8e8e8e;
				width: 100%;
				padding: 1.5rem 1rem;
				box-sizing: border-box;

				.menu-scope {
					position: relative;
					display: flex;
					align-content: center;
					gap: 0.8rem;
					width: 100%;

					input {
						margin: 0;
						padding: 0;
						width: 2rem;
						border: #5877fc;
					}

					input:checked + label {
						color: #000;
					}

					label {
						cursor: pointer;
					}

					&:hover {
						color: #373f41;
						transition: 0.2s;
					}
				}

				.inside {
					position: absolute;
					top: 0rem;
					left: 14.9rem;
					width: 67.6rem;
					height: 32.4rem;
					border-radius: 1rem;
					border: 1px solid #e3e3e3;
					background: #fff;
					box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
					padding: 2.8rem 3.2rem 2.8rem 2.5rem;
					z-index: 501;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.container-inside {
						display: flex;
						flex-direction: column;
						gap: 1rem;
					}

					.control-btn {
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

					.intro {
						display: flex;
						justify-content: space-between;

						.description {
							color: #8e8e8e;
							font-size: 1.6rem;
						}

						.container-checkbox {
							display: flex;
							align-items: center;

							.input-checkbox {
								margin: 0;
							}

							input[type='checkbox'] {
								margin: 0;
							}

							.course-label {
								font-size: 1.4rem;
								margin-left: 0.8rem;
								margin-top: 0.1rem;
								color: #8e8e8e;

								&:hover {
									color: #000;
									transition: 0.2s ease-in-out;
								}
							}
						}
					}

					.wrapper-inputs {
						display: flex;
						width: 100%;
						gap: 2rem;
					}
				}

				@media screen and (min-width: 300px) and (max-width: 1200px) {
					.inside {
						display: none;
					}
				}

				li {
					&:hover {
						color: #373f41;
						transition: 0.2s;
					}
				}
			}
		}

		.category {
			padding: 0.2rem 0.2rem;
			box-sizing: border-box;
		}
	}
`;

const S = { Dropdown };

export default S;
