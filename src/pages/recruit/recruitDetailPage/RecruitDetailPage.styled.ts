import styled from 'styled-components';

const RecruitDetailPage = styled.section`
	width: clamp(45%, 96rem, 75%);
	margin: 0 auto;
	margin-top: 8.02rem;
	margin-bottom: 10rem;
	background-color: #fff;
	overflow: hidden;

	h3 {
		color: #151515;
		font-size: 2rem;
		font-weight: 600;
		line-height: 2.4rem;
		letter-spacing: 0.004rem;
	}

	.tag {
		display: flex;
		padding: 0.6rem 0.8rem;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		box-sizing: border-box;
		border-radius: 1.5rem;
		background: #e0e6ff;
	}

	.body1-semibold {
		color: #151515;
		font-size: 1.6rem;
		font-weight: 600;
	}

	.body2-medium {
		color: #8e8e8e;
		font-size: 1.4rem;
	}

	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 105;
		background-color: rgba(0, 0, 0, 0.15);
	}

	.wrapper-comments {
		width: 100%;
		margin-top: 4rem;

		.container-title {
			display: flex;
			align-items: flex-end;
			gap: 0.4rem;

			span {
				color: #5877fc;
				font-size: 1.5rem;
				font-weight: 600;
			}
		}

		hr {
			background: #e3e3e3;
			border: none;
			height: 0.075rem;
		}

		.container-comments {
			width: 100%;
			padding: 1.6rem 0;
			box-sizing: border-box;
		}

		.need-login {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 4rem;
			margin-bottom: 4rem;
		}

		.login {
			color: #5877fc;
			cursor: pointer;
		}
	}

	@media (max-width: 600px) {
		width: 90%;
	}
`;

const Footer = styled.footer`
	position: fixed;
	bottom: 0rem;
	width: 100%;
	height: 8.4rem;
	border-top: 0.075rem solid #e3e3e3;
	border-bottom: 0.075rem solid #e3e3e3;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;

	.btn-txt__big {
		color: #373f41;
		font-size: 1.6rem;
	}

	.container-btn {
		display: flex;
		gap: 1.6rem;

		.btn-bookmark {
			height: 4.8rem;
			padding: 1.2rem 3.2rem;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.8rem;
			font-size: 1.6rem;
			border-radius: 0.8rem;
			border: 1px solid #6091f0;
			background: #fff;

			&:hover {
				transition: 0.2s ease-in-out;
				border: 1px solid #6091f0;
				box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
			}
		}

		.apply {
			height: 4.8rem;
			padding: 1.2rem 7.2rem;
			border-radius: 0.8rem;
			font-size: 1.6rem;
			background: linear-gradient(90deg, #6091f0 0%, #723dff 100%);
			color: #f7faff;

			&:hover {
				color: #fff;
				font-weight: 600;
				box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
			}
		}

		.default {
			&:hover {
				border: 1px solid #373f41;
				transition: 0.2s ease-in-out;
			}

			&:active {
				border: 1px solid #373f41;
				background: #747b7f;

				img {
					filter: invert(100%) sepia(18%) saturate(0%) hue-rotate(27deg) brightness(106%)
						contrast(101%);
				}
			}
		}

		.cancel {
			height: 4.8rem;
			padding: 1.2rem 7.2rem;
			border-radius: 0.8rem;
			font-size: 1.6rem;
			background-color: #f85858;
			color: #fff;

			&:hover {
				transition: 0.2s ease-in-out;
				background: #fb9b9b;
			}

			&:active {
				background: #fedede;
				color: #953535;
			}
		}

		.btn-edit,
		.btn-delete {
			display: flex;
			width: 4.8rem;
			height: 4.8rem;
			padding: 1.2rem;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			border-radius: 1rem;
			border: 1px solid #e3e3e3;
			background: #fff;
		}

		.btn-navigate_appliers {
			display: flex;
			height: 4.8rem;
			padding: 1.2rem 3.2rem;
			justify-content: center;
			align-items: center;
			gap: 0.75rem;
			border-radius: 0.6rem;
			background: #5877fc;
			color: #fff;

			&:hover {
				background: #2f4fd9;
				color: #f7faff;
			}

			&:active {
				background: #0e2690;
				color: #f7faff;
			}
		}

		.btn-close {
			display: flex;
			height: 4.8rem;
			padding: 1.2rem 3.2rem;
			justify-content: center;
			align-items: center;
			gap: 0.75rem;
			border-radius: 0.6rem;
			background: #f85858;
			color: #fff;

			&:hover {
				background: #fb9b9b;
			}

			&:active {
				background: #fedede;
				color: #953535;
			}
		}

		.btn-list {
			height: 4.8rem;
			padding: 1.2rem 3.2rem;
			border-radius: 0.6rem;
			border: 1px solid #e3e3e3;
			background: #fff;
		}

		.btn-closed {
			height: 4.8rem;
			padding: 1.2rem 3.2rem;
			border-radius: 0.6rem;
			border: 1px solid #8e8e8e;
			background: #e3e3e3;
			cursor: default;
			color: #8e8e8e;
		}
	}

	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 105;
		background-color: rgba(0, 0, 0, 0.15);
	}

	@media (max-width: 450px) {
		.btn-txt__big {
			font-size: 1.4rem;
		}

		.container-btn {
			.btn-navigate_appliers {
				padding: 1.2rem 1.8rem;
			}

			.btn-close {
				padding: 1.2rem 1.8rem;
			}

			.apply {
				padding: 1.2rem 5rem;
			}
		}
	}

	@media (max-width: 376px) {
		.btn-txt__big {
			font-size: 1.2rem;
		}

		.container-btn {
			.btn-navigate_appliers {
				padding: 1rem 1.6rem;
			}

			.btn-close {
				padding: 1rem 1.6rem;
			}

			.btn-bookmark {
				padding: 0.8rem 2rem;
			}

			.apply {
				padding: 0.8rem 5rem;
			}
		}
	}
`;

const S = {
	RecruitDetailPage,
	Footer,
};

export default S;
