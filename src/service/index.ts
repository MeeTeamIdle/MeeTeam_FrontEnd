import { EndPoint } from './endPoint';
import { axiosInstance, axiosAuthInstance } from './axiosInstance';
import {
	checkExist,
	signUp,
	certificateSchool,
	checkDuplicateNickname,
	readUniversityList,
	readDepartmentList,
} from './auth/auth';
import {
	getPostingData,
	getApplyData,
	applyRole,
	cancelApply,
	closeRecruitPost,
} from './recruit/detail';
import { readProfile, updateProfile } from './user/Profile';
import { readSkillList, readRoleList } from './search/search';
import { readPortfolio, readPortfolioList } from './portfolio/portfolio';
import {
	postingRecruit,
	getRoleKeyword,
	getSkillKeyword,
	getCourseKeyword,
	getProfessorKeyword,
	getTagKeyword,
	editPostingRecruit,
	deletePostingRecruit,
} from './recruit/posting';
import { getApplicantsList } from './recruit/applicant';

export {
	EndPoint,
	axiosInstance,
	axiosAuthInstance,
	checkExist,
	signUp,
	certificateSchool,
	checkDuplicateNickname,
	readUniversityList,
	readDepartmentList,
	readProfile,
	updateProfile,
	readSkillList,
	readRoleList,
	readPortfolio,
	readPortfolioList,
	getPostingData,
	getApplyData,
	applyRole,
	postingRecruit,
	getRoleKeyword,
	getSkillKeyword,
	getCourseKeyword,
	getProfessorKeyword,
	getTagKeyword,
	closeRecruitPost,
	cancelApply,
	editPostingRecruit,
	getApplicantsList,
	deletePostingRecruit,
};
