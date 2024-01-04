import styled from 'styled-components';

interface IFilter {
	$checked: boolean;
}

const Filter = styled.div`
	display: flex;
	margin-top: 4.65rem;
	.container-filter_area {
		display: flex;
		margin-right: 2.6rem;
		.area {
			display: flex;
			width: 6.675rem;
			height: 3.6rem;
			padding: 0.75rem;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 0.75rem;
			flex-shrink: 0;
			border-radius: 7.5rem;
			background-color: #5f5cec;
			color: #fff;
			font-family: Apple SD Gothic Neo;
			font-size: 1.8rem;
			font-style: normal;
			font-weight: 400;
			line-height: 2.1rem; /* 100% */
			letter-spacing: 0.015rem;
			cursor: pointer;
		}

		.no {
			background-color: #fff;
			color: #000;
		}
	}
	.container-filter_menu {
		display: flex;
		gap: 1.5rem;
		.menu {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #373f41;
			font-family: Apple SD Gothic Neo;
			font-size: 1.8rem;
			font-style: normal;
			font-weight: 400;
			line-height: 2.1rem; /* 233.333% */
			letter-spacing: 0.015rem;
			cursor: pointer;
		}
		.filter {
			content: '⌵';
		}
	}
`;

const S = { Filter };

export default S;
