import styled from 'styled-components';

interface Modal {
	$isChecked?: boolean;
	$isValue?: boolean;
}

const Modal = styled.section<Modal>`
	height: 68rem;
	border-radius: 1rem;
	border: 1px solid #e3e3e3;
	background: #f8fafb;
	padding: 4rem;
	box-sizing: border-box;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 501;

	h1 {
		color: #000;
		font-size: 2.4rem;
		font-style: normal;
		font-weight: 700;
		line-height: 2.9rem;
		letter-spacing: 0.0048rem;
	}

	h4 {
		color: #151515;
		font-size: 1.8rem;
		font-weight: 600;
		line-height: 2.1rem;
		letter-spacing: 0.0036rem;
	}

	.description {
		display: flex;
		flex-direction: column;
		margin-top: 1.6rem;

		.description-subtitle {
			color: #151515;
			font-size: 1.8rem;
			font-weight: 600;
			line-height: 2.1rem;
			letter-spacing: 0.0036rem;
		}

		.description-subinfo {
			color: #373f41;
			font-size: 1.4rem;
			font-weight: 500;
			line-height: 1.7rem;
			letter-spacing: 0.0028rem;
			margin-top: 0.7rem;
		}

		.description-confirm {
			color: #373f41;
			font-size: 1.4rem;
			line-height: 1.7rem;
			letter-spacing: 0.0028rem;
			margin-top: 0.7rem;
		}

		.agreement {
			display: flex;
			align-items: center;
			margin-top: 1.6rem;
			padding: 0;
			gap: 0.6rem;

			input[type='checkbox'] {
				margin: 0;
				padding: 0;
				width: 2rem;
				height: 2rem;
				cursor: pointer;
				border: 1px solid #d3d3d3;
				border-radius: 0.4rem;
				appearance: none;

				&:checked {
					background-color: #5877fc;
					border: 1px solid #5877fc;
					background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
					background-size: 100% 100%;
					background-position: 50%;
					background-repeat: no-repeat;
				}

				&.warning {
					border: 1px solid #f85858;
				}
			}

			.agreement-word {
				color: #373f41;
				font-size: 1.4rem;
				margin-top: 0.2rem;
			}
		}
	}

	.writing {
		margin-bottom: 0.2rem;
	}

	.container-user__info {
		width: 44rem;
		border-radius: 0.8rem;
		border: 1px solid #e3e3e3;
		background-color: #fff;
		margin-top: 2.7rem;
		padding: 1.8rem 2rem;
		box-sizing: border-box;

		.container-subtitle {
			display: flex;
			gap: 1.25rem;
			align-items: flex-end;
		}

		.highlighted {
			color: #5877fc;
		}

		.confirm-title {
			font-size: 1.8rem;
		}

		.user-info {
			display: flex;
			justify-content: flex-start;
			margin-top: 1.6rem;
			height: 8.4rem;
			gap: 4.26rem;

			span {
				color: #8e8e8e;
				font-size: 1.4rem;
				line-height: 1.7rem;
				letter-spacing: 0.0028rem;
			}

			.value {
				color: #373f41;
			}

			.user-info__section {
				display: flex;
				gap: 3.14rem;

				section {
					display: flex;
					flex-direction: column;
					gap: 0.6rem;
				}
			}
		}

		.value {
			color: #373f41;
		}

		.role-info {
			margin-top: 1.8rem;
			color: #373f41;
			height: 5.3rem;

			p {
				color: #373f41;
				font-size: 1.4rem;
				margin-top: 1.5rem;
				line-height: 1.7rem;
				letter-spacing: 0.0028rem;
			}
		}
	}

	.container-role {
		margin-top: 1.2rem;

		.container-select__box {
			position: relative;
			display: flex;
			width: 44rem;
			height: 4.8rem;
			padding: 1.2rem 1.6rem;
			flex-direction: column;
			justify-content: center;
			box-sizing: border-box;
			border-radius: 1rem;
			border: 1px solid #e3e3e3;
			background: #fff;
			color: #8e8e8e;
			font-size: 1.6rem;
			font-weight: 500;
			line-height: 1.35rem;
			letter-spacing: 0.015rem;

			.value {
				color: ${props => props.$isValue && '#000000'};
			}

			&:hover {
				border-color: #5877fc;
				transition: 0.2s ease-in-out;
			}

			ul {
				position: absolute;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				top: 4.7rem;
				left: 0;
				display: flex;
				width: 100%;
				padding: 1.2rem 1.6rem;
				flex-direction: column;
				align-items: flex-start;
				gap: 1rem;
				border-radius: 1rem;
				border: 1px solid #e3e3e3;
				background: #fff;
				z-index: 601;
				box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);

				li {
					width: 100%;
					cursor: pointer;

					&:hover {
						color: #000000;
						transition: 0.2s ease-in-out;
					}
				}
			}

			img {
				position: absolute;
				right: 1rem;
				top: 1.2rem;
			}
			&.warning {
				border: 1px solid #f85858;
			}
		}
	}

	.container-message {
		margin-top: 1.2rem;

		textarea {
			display: flex;
			width: 44rem;
			height: 10rem;
			padding: 1.4rem 1.6rem;
			align-items: flex-start;
			gap: 1rem;
			resize: none;
			box-sizing: border-box;
			border-radius: 1rem;
			border: 1px solid #e3e3e3;
			background: #fff;
			color: #000000;
			font-size: 1.6rem;
			font-weight: 500;
			line-height: 1.35rem;
			letter-spacing: 0.015rem;

			&::placeholder {
				color: #8e8e8e;
			}

			&:hover {
				border-color: #5877fc;
				transition: 0.2s ease-in-out;
			}

			&:focus {
				outline: none;
				border: 1px solid var(--main-color, #5877fc);
			}
		}
	}

	.container-buttons {
		margin-top: 6rem;
		display: flex;
		justify-content: center;
		gap: 1.35rem;

		button {
			padding: 1.2rem 3.2rem;
			border-radius: 0.6rem;
			color: '#373f41';
			font-size: 1.6rem;
			line-height: 1.9rem;
			letter-spacing: 0.0032rem;
			box-sizing: border-box;
		}

		.cancel {
			height: 4.8rem;
			border: 1px solid #e3e3e3;
			background: #fff;

			&:hover {
				border: 1px solid #373f41;
				transition: 0.2s ease-in-out;
			}

			&:active {
				border: 1px solid #373f41;
				background: #747b7f;
				color: #ffffff;
			}
		}

		.confirm {
			background-color: ${props => (props.$isChecked ? '#5877fc' : '#E3E3E3')};
			font-weight: 400;
			color: ${props => (props.$isChecked ? '#fff' : '#8E8E8E')};

			&:hover {
				background: ${props => props.$isChecked && '#2f4fd9'};
				transition: 0.2s ease-in-out;
			}

			&:active {
				background: ${props => props.$isChecked && '#0e2690'};
			}
		}

		.submit {
			font-weight: 400;
			background-color: #5877fc;
			color: #ffffff;

			&:hover {
				background-color: #2f4fd9;
				transition: 0.2s ease-in-out;
			}

			&:active {
				background-color: #0e2690;
			}
		}
	}

	.confirm-btn {
		margin-top: 14.7rem;
	}

	hr {
		margin-top: 2.4rem;
		background: #e3e3e3;
		height: 0.1rem;
		border: 0;
	}

	.warning {
		border: 1px solid #f85858;
	}

	@media (max-width: 450px) {
		height: 85%;
		padding: 1.8rem 2rem;
		width: 80%;
		overflow-y: scroll;

		.container-contents {
			margin-bottom: 6.5rem;
		}

		.description {
			.description-subtitle {
				font-size: 1.6rem;
			}

			.description-subinfo {
				font-size: 1.2rem;
			}

			.agreement {
				.agreement-word {
					font-size: 1.2rem;
				}
			}
		}

		.container-user__info {
			width: auto;
			height: auto;
			padding: 1.8rem;
			flex-direction: column;
			margin-top: 1rem;

			.container-subtitle {
				position: relative;
			}

			.writing {
				position: absolute;
				top: 0;
				left: 7rem;
				width: 70%;
				flex-wrap: wrap;
				font-size: 1.2rem;
				margin-bottom: 0rem;
			}

			.user-info {
				height: 13rem;
				flex-direction: column;
				gap: 0.6rem;

				.user-info__section {
					gap: 2rem;
				}

				.responsive-top {
					gap: 3.3rem;
				}
			}
		}

		.container-role {
			.container-select__box {
				width: auto;
				padding: 1rem;
				font-size: 1.4rem;

				ul {
					width: 100%;

					li {
						width: 100%;
					}
				}
			}
		}

		.container-message {
			textarea {
				width: 100%;
				padding: 1rem;
				font-size: 1.4rem;
				height: 4.8rem;
			}
		}

		.container-buttons {
			flex-direction: column;
			gap: 1rem;
			margin-top: 1rem;

			button {
				width: 100%;
				padding: 1.2rem;
				font-size: 1.4rem;
				text-align: center;
			}
		}
	}
`;

const FinalModal = styled.section`
	width: 52rem;
	border-radius: 0.75rem;
	border: 0.075rem solid #dcdcdc;
	background-color: #f8fafb;
	padding: 4rem;
	box-sizing: border-box;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 501;

	h1 {
		color: #000;
		font-size: 2.4rem;
		font-style: normal;
		font-weight: 500;
		line-height: 1.8rem;
		letter-spacing: -0.036rem;
	}

	.btn-txt-big {
		color: #373f41;

		font-size: 1.6rem;
		font-style: normal;
		font-weight: 500;
		line-height: 1.9rem;
		letter-spacing: 0.0032rem;
	}

	.description {
		display: flex;
		flex-direction: column;
		margin-top: 1.6rem;

		h4 {
			color: #151515;
			font-size: 1.8rem;
			font-weight: 600;
			line-height: 1.8rem;
			letter-spacing: 0.0027rem;
		}

		.darker {
			color: #373f41;
			margin-top: 0.8rem;
		}
		span:nth-child(1) {
			margin-top: 0.8rem;
		}

		.agreement {
			display: flex;
			align-items: center;
			margin-top: 0.9rem;
			padding: 0;
			gap: 0.6rem;

			input {
				margin-top: 0.5rem;
				padding: 0;
			}
		}
	}

	.container-button {
		display: flex;
		justify-content: flex-end;
		margin-top: 6.2rem;
		gap: 1.6rem;

		button {
			display: flex;
			height: 4.8rem;
			padding: 1.2rem 3.2rem;
			justify-content: center;
			align-items: center;
			gap: 0.75rem;
			border-radius: 0.6rem;
		}

		.cancel {
			background-color: #fff;
			color: #373f41;
			border: 0.1rem solid #e3e3e3;

			&:hover {
				border: 1px solid #373f41;
				transition: 0.2s ease-in-out;
			}

			&:active {
				border: 1px solid #373f41;
				background: #747b7f;
				color: #ffffff;
			}
		}

		.btn-profile {
			background-color: #5877fc;
			color: #fff;

			&:hover {
				background-color: #2f4fd9;
				transition: 0.2s ease-in-out;
			}

			&:active {
				background-color: #0e2690;
			}
		}
	}
	@media (max-width: 450px) {
		width: 90%;
		padding: 2rem;

		h1 {
			font-size: 2rem;
			line-height: 2.4rem;
		}

		.description {
			margin-top: 1rem;

			h4 {
				font-size: 1.6rem;
				line-height: 1.8rem;
			}

			.darker {
				font-size: 1.2rem;
				line-height: 1.5rem;
			}
		}

		.container-button {
			margin-top: 3rem;
			flex-direction: column;
			gap: 1rem;

			button {
				width: 100%;
			}
		}
	}
`;

const S = { Modal, FinalModal };

export default S;
