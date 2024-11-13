import styled from 'styled-components';

interface ProfileImage {
	$size: string;
	$url?: boolean;
}

const ProfileImageLayout = styled.div`
	position: relative;
	width: fit-content;
	display: flex;
	cursor: pointer;
`;

const ProfileImageWrapper = styled.div<ProfileImage>`
	width: ${props => props.$size};
	height: ${props => props.$size};
	border-radius: 70%;
	overflow: hidden;
	border: ${props => props.$url && '0.075rem solid #b9b9b9'};
	cursor: pointer;
`;

const ProfileImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const ProfileAddIcon = styled.img`
	position: absolute;
	right: 0;
	top: 10.6rem;
`;

const ProfileImageInput = styled.input`
	position: absolute;
	width: 100%;
	height: 100%;
	display: none;
`;

const S = {
	ProfileImageLayout,
	ProfileImageWrapper,
	ProfileImage,
	ProfileAddIcon,
	ProfileImageInput,
};

export default S;
