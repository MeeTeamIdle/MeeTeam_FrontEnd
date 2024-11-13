import styled from 'styled-components';
import Account from '../Account.styled';
import { ResponsiveProps } from '../../../types';

const SchoolCertificationLayout = styled(Account.AccountLayout)<ResponsiveProps>`
	${props =>
		props.$isMobile &&
		`
			white-space: pre-wrap;
		`}
`;

const SchoolCertificationPageForm = styled(Account.AccountForm)<{ $submitEmail?: boolean }>`
	align-items: center;
	justify-content: center;
	${props => props.$submitEmail && 'row-gap: 3.35rem; width: auto;'}
`;

const SchoolCertificationMark = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1.06rem 2.25rem;
	border-radius: 0.6rem;
	color: var(--text-color, #151515);
	background: var(--sub2-color, #f3f5ff);
	font-size: 1.2rem;
	cursor: pointer;
`;

const SchoolCertificationEmailDomain = styled.div`
	display: flex;
	flex: 1;
	margin-bottom: 1.45rem;
	align-items: flex-end;
`;

const SchoolCertificationRow = styled.div`
	display: flex;
	flex-direction: row;
	column-gap: 1rem;
	width: 34.8rem;
`;

const S = {
	SchoolCertificationLayout,
	SchoolCertificationPageForm,
	SchoolCertificationMark,
	SchoolCertificationEmailDomain,
	SchoolCertificationRow,
};

export default S;
