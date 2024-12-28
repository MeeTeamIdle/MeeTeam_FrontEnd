import styled from 'styled-components';

const CommentInput = styled.div`
	margin-top: 2.1rem;
	.wrapper {
		display: flex;
		gap: 2rem;
		flex-direction: column;

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

		.container-length_counter {
			display: flex;
			justify-content: flex-end;
			margin-top: -1.11rem;
		}

		.container-btn {
			display: flex;
			justify-content: flex-end;
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
	}
`;

const S = { CommentInput };

export default S;
