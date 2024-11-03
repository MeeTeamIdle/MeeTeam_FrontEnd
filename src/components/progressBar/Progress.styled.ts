import styled from 'styled-components';

interface Progression {
	$progression: number;
}

const ProgressBackground = styled.section`
	/* padding: 0 1.6rem; */
	box-sizing: border-box;
	width: 100%;
	height: 1.4rem;
	background-color: #ccc;
	border-radius: 5rem;
	margin-left: 2rem;
	margin-bottom: 1rem;
`;

const Progress = styled.div<Progression>`
	width: ${props => (props.$progression ? props.$progression.toString() + '%' : '0%')};
	height: 100%;
	background-color: #5877fc;
	border-radius: 5rem;
`;

const S = { ProgressBackground, Progress };

export default S;
