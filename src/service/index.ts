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
import { readProfile } from './user/Profile';
import {
	postingRecruit,
	getRoleKeyword,
	getSkillKeyword,
	getCourseKeyword,
	getProfessorKeyword,
	getTagKeyword,
} from './recruit/posting';

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
	postingRecruit,
	getRoleKeyword,
	getSkillKeyword,
	getCourseKeyword,
	getProfessorKeyword,
	getTagKeyword,
};
