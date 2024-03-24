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
};
