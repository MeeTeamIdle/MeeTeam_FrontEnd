import styled from 'styled-components';

interface Course {
	$isChecked: boolean;
}

interface Basic {
	$isTitled: string;
}

const BasicInformation = styled.section<Basic>`
	.container-basic {
		display: flex;
		width: 100%;
		margin-top: 4rem;

		.container-basic__inputs {
			width: 76.4rem;
			display: flex;
			flex-direction: column;
			gap: 3.5rem;
			position: relative;

			.inputs-title {
				display: flex;
				flex-direction: column;
				position: relative;

				input {
					display: flex;
					width: 100%;
					height: 4.8rem;
					padding: 1.2rem 1.6rem;
					box-sizing: border-box;
					border-radius: 1rem;
					border: 0.1rem solid #e3e3e3;
					background: #fff;
					margin-top: 0.8rem;
					color: ${props => (props.$isTitled !== '' ? '#000' : '#8e8e8e')};
					font-size: 1.6rem;
					line-height: 1.9rem;
					letter-spacing: 0.0032rem;

					&:hover {
						border: 1px solid #5877fc;
						transition: 0.2s ease-in-out;
					}

					&:focus {
						color: #000;
						outline: none;
						border-radius: 1rem;
						border: 1px solid #5877fc;
					}
				}

				.valid-msg {
					position: absolute;
					color: red;
					top: 8rem;
					left: 1rem;
					font-size: 1rem;
				}
			}

			.inputs-deadline {
				width: 48.5%;
				position: relative;

				.valid-msg {
					position: absolute;
					top: 8rem;
					left: 1rem;
					color: red;
					font-size: 1rem;
				}

				.container-deadline__datepicker {
					margin-top: 0.8rem;
				}
			}

			.radio-btns {
				display: flex;
				align-items: center;
				gap: 2rem;
				margin-top: 1.6rem;
				width: 100%;

				.radio-btn {
					display: flex;
					align-items: center;
					gap: 0.8rem;

					input:checked + label {
						color: #373f41;
					}

					label {
						color: #8e8e8e;
						font-size: 1.6rem;
						letter-spacing: 0.0032rem;

						&:hover {
							color: #000;
							transition: 0.2s ease-in-out;
							cursor: pointer;
						}
					}
				}
			}

			.radio-input {
				width: 2rem;
				height: 2rem;
				border-radius: 99.9rem;
				border: 1px solid #e3e3e3;
				background: #fff;
				padding: 0;
				margin: 0;
			}

			.inputs-scope-category {
				display: flex;
				justify-content: flex-start;
				width: 100%;
				gap: 2rem;

				.container-scope {
					width: 100%;
					position: relative;

					.valid-msg {
						position: absolute;
						top: 6rem;
						left: 1rem;
						color: red;
						font-size: 1rem;
					}
				}
				.container-category {
					width: 100%;
					position: relative;

					.valid-msg {
						position: absolute;
						top: 6rem;
						left: 1rem;
						color: red;
						font-size: 1rem;
					}
				}
			}

			.inputs-dates {
				.container-dates {
					display: flex;
					gap: 2rem;
					width: 100%;
					margin-top: 0.8rem;

					.start-date {
						width: 100%;
						position: relative;
					}
					.end-date {
						width: 100%;
						position: relative;

						.valid-msg {
							position: absolute;
							top: 6.5rem;
							color: red;
							font-size: 1.2rem;
						}
					}
				}
			}

			.inputs-procedure {
				position: relative;

				.valid-msg {
					position: absolute;
					top: 6rem;
					left: 1rem;
					color: red;
					font-size: 1rem;
				}
			}
		}
	}

	@media (max-width: 450px) {
		margin: 0 auto;
		width: 100%;

		.container-basic {
			flex-direction: column;
			margin-top: 2rem;
			width: 100%;

			.subtitle {
				margin-bottom: 1.5rem;
				width: 100%;

				h4 {
					font-size: 2rem;
					/* text-align: center; */
					margin-bottom: 1.5rem;
				}
			}

			.container-basic__inputs {
				width: 100%;

				.container-scope {
					.radio-btns {
						flex-direction: column;
						gap: 1rem;
						align-items: flex-start;
					}
				}

				.container-category {
					.radio-btns {
						flex-direction: column;
						gap: 1rem;
						align-items: flex-start;
					}
				}
			}

			input {
				width: 100%;
			}
		}
	}
`;

const ContainerCourse = styled.article<Course>`
	display: flex;
	flex-direction: column;
	width: 100%;

	.intro {
		display: flex;
		justify-content: space-between;
		margin-top: 0.95rem;

		.description {
			color: #8e8e8e;
			font-size: 1.4rem;
			line-height: 1.7rem;
			letter-spacing: 0.0028rem;
		}

		.container-checkbox {
			display: flex;
			align-items: center;
			width: 5rem;

			input {
				padding: 0;
				margin: 0;

				&:hover {
					border: 1px solid red;
				}
			}

			.course-label {
				width: 200%;
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
		margin-top: 0.8rem;

		.container-inputs {
			width: 100%;
			position: relative;

			input {
				height: 4.8rem;
				padding: 1.2rem 1.6rem;
				flex: 1 0 0;
				box-sizing: border-box;
				margin: 0;
				width: 100%;
				border-radius: 1rem;
				font-size: 1.6rem;
				border: 1px solid #8e8e8e;
				background: ${props => (props.$isChecked ? 'transparent' : '#e3e3e3')};

				&:hover {
					border: ${props => props.$isChecked && '1px solid #5877fc'};
					transition: ${props => props.$isChecked && '0.2s ease-in-out'};
				}
				&:focus {
					outline: none;
					border: 1px solid #5877fc;
				}
			}

			.dropdown {
				position: absolute;
				width: 100%;
				display: flex;
				flex-direction: column;
				font-size: 1.4rem;
				color: #8e8e8e;
				gap: 1.2rem;
				padding: 1.2rem 1.6rem;
				z-index: 11;
				background-color: #fff;
				border-radius: 1rem;
				border: 1px solid #e3e3e3;
				box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);

				.option {
					cursor: pointer;

					&:hover {
						color: #000000;
						transition: 0.2s ease-in-out;
					}
				}

				.no-result {
					display: flex;
					width: 100%;
					height: 16.7rem;
					padding: 1.2rem 1.6rem;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: 0.8rem;

					.container-btn {
						margin-top: 2rem;
						display: flex;
						align-items: center;
						gap: 0.8rem;
					}

					.btn-create {
						display: flex;
						padding: 0.6rem 0.8rem;
						justify-content: center;
						align-items: center;
						gap: 0.75rem;
						border-radius: 1.5rem;
						border: 1px solid #e0e6ff;
						background: #fff;
						cursor: pointer;
					}
				}
			}
		}
	}
`;

const S = { BasicInformation, ContainerCourse };

export default S;
