import styled from 'styled-components';

const Modal = styled.article`
	display: flex;
	height: 23.2rem;
	padding: 1.8rem 2rem;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 501;
	border-radius: 1rem;
	border: 1px solid #e3e3e3;
	background: #f8fafb;

	h3 {
		color: #151515;
		font-size: 2rem;
		font-weight: 600;
	}

	.body1-medium {
		color: #000000;
		font-size: 1.6rem;
	}

	.body2-medium {
		color: #373f41;

		font-size: 1.4rem;
		text-align: center;
	}

	.txt-small {
		color: #373f41;
		font-size: 1.4rem;
	}

	.wrapper-info {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.container-description {
		display: flex;
		flex-direction: column;
		margin-top: 2.8rem;
		gap: 0.6rem;
	}

	.container-btn {
		display: flex;
		gap: 1.2rem;

		button {
			display: flex;
			height: 3.6rem;
			padding: 1.2rem 2rem;
			justify-content: center;
			align-items: center;
			gap: 0.75rem;
			border-radius: 0.6rem;
		}

		.cancel {
			border: 1px solid #e3e3e3;
			background: #ffffff;
		}

		.refuse {
			background: #f85858;
			color: #ffffff;
		}
	}
`;

const ApproveModal = styled(Modal)`
	display: flex;
	width: 42rem;
	height: auto;
	padding: 1.8rem 2rem;
	flex-direction: column;
	align-items: center;
	gap: 4rem;

	.approve {
		background-color: #5877fc;
		color: #ffffff;
	}

	.container-link {
		width: 36rem;
		height: 4.7543rem;
		flex-shrink: 0;
		border-radius: 1rem;
		border: 1px solid #e3e3e3;
		background: #f6f6f6;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const S = { Modal, ApproveModal };

export default S;
