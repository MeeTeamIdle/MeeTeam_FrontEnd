import styled from 'styled-components';

const CampusToggle = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 21.8rem;
	height: 6rem;
	border-radius: 99.9rem;
	border: 0.075rem solid #f6f6f6;
	background: #f8fafb;
	margin-top: 2rem;
	gap: 1rem;

	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 8.8rem;
		height: 4rem;
		border-radius: 9999.9rem;
	}

	.selected {
		background-color: #e0e6ff;
		color: #2f4fd9;

		&:hover {
			background-color: #e0e6ff;
			cursor: pointer;
		}
	}

	.notSelected {
		background-color: #f8fafb;
		color: #747b7f;

		&:hover {
			background-color: #ededed;
			cursor: pointer;
		}
	}

	@media (max-width: 900px) {
		width: 18rem;
		height: 5rem;

		.wrapper {
			width: 7rem;
			height: 3.2rem;
			border-radius: 9999.9rem;
		}

		.option {
			font-size: 1.8rem;
		}
	}

	@media (max-width: 600px) {
		margin: 2rem auto 0rem;
		width: 16rem;
		height: 4.4rem;

		.wrapper {
			width: 6rem;
			height: 3rem;
			border-radius: 9999.9rem;
		}

		.option {
			font-size: 1.6rem;
		}
	}
`;

const S = { CampusToggle };

export default S;
