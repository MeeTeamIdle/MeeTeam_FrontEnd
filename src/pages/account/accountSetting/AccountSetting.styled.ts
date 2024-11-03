import styled from 'styled-components';

const AccountSettingStyled = styled.section`
	font-family: Pretendard;
	width: clamp(45%, 96rem, 75%);
	margin: 0 auto;
	margin-bottom: 14.4rem;

	h2 {
		color: #151515;
		font-size: 2.4rem;
		font-weight: 700;
		line-height: 2.9rem;
		letter-spacing: 0.0048rem;
		margin-top: 8rem;
	}

	h4 {
		color: #151515;
		font-size: 1.8rem;
		font-weight: 600;
		line-height: 2.1rem;
		letter-spacing: 0.0036rem;
	}

	.body1-medium {
		color: #151515;
		font-size: 1.6rem;
		line-height: 1.9rem;
		letter-spacing: 0.0032rem;
		font-style: normal;
		font-weight: 500;
	}

	.title-underbar {
		margin: 6rem 0;
	}

	.red {
		color: #f85858;
	}

	.description {
		color: #8e8e8e;
	}

	.semi-bold {
		font-weight: 600;
	}

	.wrapper-menu {
		display: flex;
		flex-direction: column;
		gap: 2.4rem;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		border-radius: 0.75rem;
		border: 0.75px solid #d3d3d3;
		background: #fff;
	}

	.container-account {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		height: 10.2rem;
		padding: 1.6rem 2rem;
		box-sizing: border-box;
	}

	.container-hidden {
		width: 100%;
		padding: 0 2rem;
		box-sizing: border-box;

		hr {
			width: 100%;
			height: 0.075rem;
			background: #d3d3d3;
			border: none;
		}
	}

	.container-hidden__content {
		padding: 2.6rem 0;
		box-sizing: border-box;
	}

	.container-hidden__mail {
		display: flex;
		margin-top: 1.6rem;
		gap: 1.6rem;

		.container-mail {
			display: flex;
			width: 35.8rem;
			padding: 1.2rem 1.6rem;
			align-items: center;
			gap: 1rem;
			border-radius: 1rem;
			border: 1px solid #e3e3e3;
			background: #fff;

			input {
				border: none;
				outline: none;
			}
		}
	}

	.container-hidden__withdraw {
		padding: 2.6rem 0;
		box-sizing: border-box;

		.container-list {
			margin-left: 1.6rem;
		}
		.paragraph {
			list-style: disc;
			margin-top: 1.6rem;
		}
	}

	.container-account__title {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	svg {
		font-size: 2rem;
		cursor: pointer;
	}

	.wrapper-personal {
		margin-top: 3.4rem;
		display: flex;
		justify-content: flex-end;
		align-items: center;

		span {
			color: #8e8e8e;
			font-family: Pretendard;
			font-size: 1.6rem;
			font-weight: 600;
			line-height: 1.9rem;
			letter-spacing: 0.0032rem;
			text-decoration-line: underline;
			cursor: pointer;
		}

		.icon {
			margin-top: 0.3rem;
		}
	}

	.btn-save {
		display: flex;
		height: 4.8rem;
		padding: 1.2rem 3.2rem;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		border-radius: 0.6rem;
		background: #e3e3e3;
	}

	.txt-big {
		color: #8e8e8e;
		font-family: Pretendard;
		font-size: 1.6rem;
		font-style: normal;
		font-weight: 500;
		line-height: 1.9rem;
		letter-spacing: 0.0032rem;
	}

	.container-btn {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn-withdraw {
		display: flex;
		height: 4.8rem;
		padding: 1.2rem 3.2rem;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		border-radius: 0.6rem;
		background: #f85858;
	}

	.withdraw {
		color: #f7faff;
		font-weight: 400;
		margin-bottom: 3.4rem;
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
`;

const S = { AccountSettingStyled };

export default S;
