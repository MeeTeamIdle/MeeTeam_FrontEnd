import axios from 'axios';

export const getRoleKeyword = async (keyword: string) => {
	const response = await axios.get(`http://3.38.78.128/role/search?keyword=${keyword}&limit=5`);
	return response.data;
};

export const getSkillKeyword = async (keyword: string) => {
	const response = await axios.get(`http://3.38.78.128/skill/search?keyword=${keyword}&limit=5`);
	return response.data;
};

export const getCourseKeyword = async (keyword: string) => {
	const response = await axios.get(
		`http://3.38.78.128/tag/search/course?keyword=${keyword}&limit=5`
	);
	return response.data;
};

export const getProfessorKeyword = async (keyword: string) => {
	const response = await axios.get(
		`http://3.38.78.128/tag/search/professor?keyword=${keyword}&limit=5`
	);
	return response.data;
};

export const getTagKeyword = async (keyword: string) => {
	const response = await axios.get(`http://3.38.78.128/tag/search?keyword=${keyword}&limit=5`);
	return response.data;
};
