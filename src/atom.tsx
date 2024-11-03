import { atom } from 'recoil';
import { SessionStorageEffect, simpleDate } from './utils';
import { User, InputState, ApplyRole, RecruitFilter, DetailedFilter, Image } from './types';
import { LocalStorageEffect } from './utils';
import { Account } from './pages';
import { SAFE_DEFAULT_VALUE } from './constant';

export const userState = atom<User | null>({
	key: 'userState',
	default: null,
	effects: [LocalStorageEffect<User | null>('userState')],
});

export const loginState = atom<boolean>({
	key: 'loginState',
	default: false,
	effects: [LocalStorageEffect<boolean>('loginState')],
});

export const pageState = atom({
	key: 'pageState',
	default: 1,
});

export const naverSignUpState = atom<Account | null>({
	key: 'naverSignUpState',
	default: null,
	effects: [LocalStorageEffect<Account | null>('naverSignUpState')],
});

export const preUrlState = atom({
	key: 'preUrlState',
	default: '',
	effects: [SessionStorageEffect('preUrlState')],
});

export const contentState = atom({
	key: 'contentState',
	default: '대시보드',
	effects: [SessionStorageEffect('contentState')],
});

export const recruitmentState = atom({
	key: 'recruitmentState',
	default: true,
});

export const recruitmentInformationEditState = atom({
	key: 'recruitmentInformationEditState',
	default: false,
});

export const deadlineState = atom({
	key: 'deadlineState',
	default: new Date(),
});

export const applyModalState = atom({
	key: 'applyModalState',
	default: false,
});

export const applyCancelModalState = atom({
	key: 'applyCancelModalState',
	default: false,
});

export const applyCloseModalState = atom({
	key: 'applyCloseModalState',
	default: false,
});

export const recruitPostingDeleteModalState = atom({
	key: 'recruitPostingDeleteModalState',
	default: false,
});

export const commentDeleteModalState = atom({
	key: 'commentDeleteModalState',
	default: {
		id: -1,
		isDelete: false,
	},
});

export const replyDeleteModalState = atom({
	key: 'replyDeleteModalState',
	default: {
		id: -1,
		isDelete: false,
	},
});

export const waitModalState = atom({
	key: 'waitModalState',
	default: false,
});

export const applicantModalState = atom({
	key: 'refuseApplicantModalState',
	default: {
		approve: false,
		refuse: false,
	},
});

export const warnRoleDeleteModalState = atom({
	key: 'warnRoleDeleteModalState',
	default: false,
});

export const recruitInputState = atom<InputState>({
	key: 'recruitInputState',
	default: {
		scope: '',
		category: '',
		fieldId: 1,
		deadline: simpleDate(new Date()),
		proceedType: '',
		proceedingStart: simpleDate(new Date()),
		proceedingEnd: simpleDate(new Date()),
		courseTag: {
			isCourse: false,
			courseTagName: '',
			courseProfessor: '',
		},
		recruitmentRoles: [{ roleName: '', roleId: null, count: null, skillIds: [], skills: [] }],
		tags: [],
		title: '',
		content: SAFE_DEFAULT_VALUE,
	},
});

export const validMessageState = atom({
	key: 'validMessageState',
	default: {
		scope: '',
		category: '',
		deadline: '',
		endDate: '',
		content: '',
		procedure: '',
		recruitRole: '',
		title: '',
		roleName: '',
		roleCount: '',
	},
});

export const validState = atom({
	key: 'validState',
	default: {
		isSubmitted: false,
		isScope: false,
		isCategory: false,
		isDeadline: false,
		isEndDate: false,
		isProcedure: false,
		isTitle: false,
		isContent: false,
		isRole: false,
		isRoleSubmitted: false,
		isRoleName: false,
		isRoleCount: false,
	},
});

export const applyStepState = atom({
	key: 'applyStepState',
	default: 0,
});

export const goProfileState = atom({
	key: 'goProfileState',
	default: false,
});

export const applyUserInfo = atom<ApplyRole>({
	key: 'applyUserInfo',
	default: {
		name: '',
		score: 0,
		universityName: '',
		departmentName: '',
		email: '',
		year: 0,
		role: {
			applyRoleId: 0,
			name: '',
		},
		message: '' as string | undefined,
	},
});

export const detailedFilterState = atom<DetailedFilter>({
	key: 'detailedFilterState',
	default: {
		skill: [],
		role: [],
		tag: [],
	},
});

export const previousLocationState = atom({
	key: 'previousLocationState',
	default: '/',
});

export const recruitFilterState = atom<RecruitFilter>({
	key: 'recruitFilter',
	default: {
		scope: 1,
		category: null,
		field: null,
		skill: [],
		role: [],
		tag: [],
		keyword: '',
		course: null,
		professor: null,
	},
});

export const recruitFilterStateAuth = atom<RecruitFilter>({
	key: 'recruitFilterAuth',
	default: {
		scope: 2,
		category: null,
		field: null,
		skill: [],
		role: [],
		tag: [],
		keyword: '',
		course: null,
		professor: null,
	},
});

export const applicantHolder = atom({
	key: 'applicantApproved',
	default: [] as number[],
});

export const applicantFilter = atom({
	key: 'applicantFilter',
	default: null as number | null,
});

export const uploadImageListState = atom<Image[]>({
	key: 'uploadImageListState',
	default: [],
});

export const uploadImageState = atom<Image | null>({
	key: 'uploadImageState',
	default: null,
});

export const openChatModalState = atom({
	key: 'openChatModalState',
	default: false,
});

export const toastState = atom({
	key: 'toastState',
	default: false,
});

export const needLoginModalState = atom({
	key: 'needLoginModalState',
	default: {
		isOpen: false,
		type: '',
	},
});

export const signupModalState = atom({
	key: 'signupModalState',
	default: false,
});

export const warningModalRoleCountState = atom({
	key: 'warningRoleCountState',
	default: false,
});

export const warningModalWithdrawState = atom({
	key: 'warningModalWithdrawState',
	default: false,
});
