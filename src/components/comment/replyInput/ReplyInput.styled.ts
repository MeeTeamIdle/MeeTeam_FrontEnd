import styled from 'styled-components';

const ReplyInput = styled.section`
	width: 100%;
	display: flex;
	align-items: flex-start;
	gap: 1.55rem;

	.reply-icon {
		margin-top: 0.7rem;
	}

	.wrapper-reply__input {
		width: 100%;
		display: flex;
		gap: 2rem;
		flex-direction: column;
		align-items: flex-start;

		.container-user__icon {
			display: flex;
			align-items: center;
			gap: 0.6rem;

			span {
				color: #373f41;
				font-size: 1.2rem;
				font-weight: 600;
			}
		}

		.container-user__input {
			margin-top: -0.5rem;
			display: flex;
			gap: 1rem;
			width: 100%;

			textarea {
				display: flex;
				width: 100%;
				height: 11.2rem;
				padding: 1.6rem 2rem;
				align-items: flex-start;
				gap: 1rem;
				flex-shrink: 0;
				border-radius: 0.75rem;
				border: 0.75px solid #d3d3d3;
				background: #fff;
				box-sizing: border-box;
				resize: none;

				outline: none;

				&:focus {
					border: 1px solid #5877fc;
				}
			}
		}
	}
	.container-btn {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;

		.cancel-btn {
			display: flex;
			height: 3.6rem;
			padding: 1.2rem 2rem;
			justify-content: center;
			align-items: center;
			gap: 0.75rem;
			border-radius: 0.6rem;
			background: #fff;
			color: #373f41;
			border: 1px solid #e3e3e3;
		}
		.submit-btn {
			display: flex;
			height: 3.6rem;
			padding: 1.2rem 2rem;
			justify-content: center;
			align-items: center;
			gap: 0.75rem;
			border-radius: 0.6rem;
			background: #5877fc;
			color: #fff;
		}
	}
`;

const S = { ReplyInput };

export default S;
