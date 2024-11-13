import styled from 'styled-components';

const CampusToggle = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 218px;
	height: 60px;
	flex-shrink: 0;
	border-radius: 999px;
	border: 0.75px solid #f6f6f6;
	background: #f8fafb;
	margin-top: 2rem;
	gap: 1rem;

	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 88px;
		height: 40px;
		flex-shrink: 0;
		border-radius: 99999px;
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
`;

const S = { CampusToggle };

export default S;
