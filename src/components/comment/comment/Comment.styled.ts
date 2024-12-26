import styled from 'styled-components';

const Comment = styled.li`
	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.txt-small {
		color: #373f41;
		font-size: 1.4rem;
		line-height: 1.7rem;
		letter-spacing: 0.0028rem;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		width: 100%;

		.input-edit {
			width: 86%;
			border: none;
			border-bottom: 1px solid #373f41;
			background-color: transparent;
			outline: none;
			padding-bottom: 0.5rem;
			font-size: 1.5rem;
		}

		.comment-icon {
			display: flex;
			align-items: center;
			gap: 0.8rem;

			.nickname {
				color: #373f41;
				font-size: 1.2rem;
				font-weight: 600;
			}

			.create-at {
				color: #8e8e8e;
				font-size: 1.2rem;
			}

			.writer-mark {
				margin-left: 0.4rem;
				display: flex;
				padding: 0.5rem 0.8rem;
				justify-content: center;
				align-items: center;
				gap: 0.4rem;
				border-radius: 2rem;
				border: 1px solid #5877fc;
				background: #f3f5ff;
				color: #5877fc;

				font-size: 1rem;
			}
		}

		.comment-info {
			display: flex;
			flex-direction: column;
			margin-left: 3.2rem;
			margin-top: 0.76rem;
			gap: 0.3rem;

			span {
				color: #373f41;
				font-size: 1.2rem;
			}

			.edit-container {
				display: flex;
				flex-direction: column;

				.edit-input {
					margin-top: 0.8rem;
					width: 100%;
					box-sizing: border-box;
					height: 3.75rem;
					border-radius: 0.75rem;
					border: 0.75px solid #bebebe;
					background: #fff;
					outline: none;
					padding-left: 1.3rem;
				}

				.btn-container {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					margin-top: 1.6rem;
					gap: 1.2rem;

					button {
						display: inline-flex;
						height: 3.6rem;
						padding: 1.2rem 2rem;
						justify-content: center;
						align-items: center;
						flex-shrink: 0;
						border-radius: 0.6rem;
					}

					.cancel {
						border: 1px solid #e3e3e3;
						background: #fff;
					}

					.save {
						color: #f7faff;
						background: #5877fc;
					}
				}
			}
		}
	}

	hr {
		height: 0.075rem;
		margin: 1.6rem 0;
		width: 100%;
		border: none;
		background: #e3e3e3;
	}

	.wrapper-replies {
		width: 100%;

		.container-reply__lists {
			display: flex;
			flex-direction: column;
			width: 100%;
		}
	}
`;

const S = { Comment };

export default S;
