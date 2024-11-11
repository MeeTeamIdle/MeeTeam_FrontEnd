import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SetterOrUpdater } from 'recoil';
import {
	checkExist,
	signUp,
	certificateSchool,
	checkDuplicateNickname,
	readUniversityList,
	readDepartmentList,
	signOut,
} from '../service';
import { User } from '../types';
import secureLocalStorage from 'react-secure-storage';

const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY;

const PLATFORM_ID = import.meta.env.VITE_PLATFORM_ID;

interface AuthProps {
	onSuccess?: () => void;
	setUserState?: SetterOrUpdater<User | null>;
	setLoginState?: SetterOrUpdater<boolean>;
}

const authKeys = {
	readUniversityList: ['readUniversityList'] as const,
	readDepartmentList: (universityId: string) => ['readDepartmentList', universityId],
};

/**
 * @description 네이버 연동 여부 체크 API를 호출하는 hook입니다.
 * 기존 회원인 경우 access token 을 로컬 스토리지에 저장합니다. 그리고 메인 페이지로 이동합니다.
 * 회원이 아닌 경우, platformId 를 로컬 스토리지에 저장합니다. 그리고 회원가입 페이지로 이동합니다.
 */
export const useCheckExist = ({ onSuccess, setUserState, setLoginState }: AuthProps = {}) => {
	return useMutation({
		mutationFn: checkExist,
		onSuccess: data => {
			if (data?.accessToken && data?.refreshToken) {
				secureLocalStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
				secureLocalStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
				setUserState?.({
					userId: data.userId,
					nickname: data.nickname,
					imageUrl: data.imageUrl,
					university: data.university,
				});
				setLoginState?.(true);
			}
			if (data?.platformId) {
				secureLocalStorage.setItem(PLATFORM_ID, data.platformId);
			}
			onSuccess?.();
		},
	});
};

/**
 * @description 네이버 연동 회원가입 API를 호출하는 hook입니다. 성공 시 access token을 로컬 스토리지에 저장합니다.
 */
export const useNaverSignUp = ({ onSuccess, setUserState, setLoginState }: AuthProps = {}) => {
	return useMutation({
		mutationFn: signUp,
		onSuccess: data => {
			if (data?.accessToken && data?.refreshToken) {
				secureLocalStorage.removeItem(PLATFORM_ID);
				secureLocalStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
				secureLocalStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
				setUserState?.({
					userId: data.userId,
					nickname: data.nickname,
					imageUrl: data.imageUrl,
				});
				setLoginState?.(true);
				onSuccess?.();
			}
		},
	});
};

/**
 * @description 학사 인증 API를 호출하는 hook입니다. 학사 인증 이메일을 전송합니다.
 */
export const useCertificateSchool = ({ onSuccess }: AuthProps = {}) => {
	return useMutation({
		mutationFn: certificateSchool,
		onSuccess: () => {
			onSuccess?.();
		},
	});
};

/**
 * @description 닉네임 중복 체크 API를 호출하는 hook입니다.
 */
export const useCheckDuplicateNickname = (authKeys: string[], isEnabled: boolean) => {
	return useQuery({
		queryKey: authKeys,
		queryFn: isEnabled => isEnabled && checkDuplicateNickname(authKeys[1]),
		enabled: isEnabled,
	});
};

/**
 * @description 대학교 목록 조회 API를 호출하는 hook입니다.
 */
export const useReadUniversityList = () => {
	return useQuery({
		queryKey: authKeys.readUniversityList,
		queryFn: readUniversityList,
		enabled: false,
	});
};

/**
 * @description 학과 목록 조회 API를 호출하는 hook입니다.
 */
export const useReadDepartmentList = (universityId: string) => {
	return useQuery({
		queryKey: authKeys.readDepartmentList(universityId),
		queryFn: () => readDepartmentList(universityId),
		enabled: false,
	});
};

/**
 * @description 로그아웃 API를 호출하는 hook입니다. 성공 시 access token을 로컬 스토리지에서 제거합니다.
 */
export const useSignOut = ({ onSuccess, setUserState, setLoginState }: AuthProps = {}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: signOut,
		onSuccess: () => {
			secureLocalStorage.removeItem(ACCESS_TOKEN_KEY);
			secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
			setUserState?.(null);
			setLoginState?.(false);
			onSuccess?.();
			queryClient.invalidateQueries({ queryKey: ['recruit_board'] });
		},
	});
};
