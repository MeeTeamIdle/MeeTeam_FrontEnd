import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	RecruitPage,
	GalaryPage,
	RecruitCreatePage,
	RecruitDetailPage,
	SignInPage,
	SchoolCertificationPage,
	NicknameSettingPage,
	PassWordFindingPage,
	ProfileDetailsPage,
	ProfileEditPage,
	PortfolioDetailsPage,
	PortfolioEditPage,
	ApplierManagePage,
	RecruitManageWrapper,
	RecruitPostingBookmark,
	RecruitPostingApply,
	RecruitMyPostings,
	CompleteSignUpPage,
	PrivateRouter,
	PortfolioManagementPage,
	NotFound,
	AccountSetting,
} from './pages/index.ts';
import './globalStyle.css';
import { getAuthPostList, getPostList } from './service/recruit/board.ts';
import { FilterData } from './types/index.ts';

const publicFilterState: FilterData = {
	field: null,
	scope: 1,
	category: null,
	keyword: null,
	skill: undefined,
	role: undefined,
	tag: undefined,
};

const authFilterState: FilterData = {
	field: null,
	scope: 2,
	category: null,
	keyword: null,
	skill: undefined,
	role: undefined,
	tag: undefined,
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <RecruitPage />,
				loader: () => {
					return getPostList({ filterState: publicFilterState, page: 1 });
				},
			},
			{
				path: 'school',
				element: <PrivateRouter />,
				children: [{ path: '', element: <RecruitPage /> }],
				id: 'school',
				loader: () => {
					return getAuthPostList({ filterState: authFilterState, page: 1 });
				},
			},
			{
				path: 'recruitment/postings/:id',
				element: <RecruitDetailPage />,
			},
			{
				path: 'recruitment/applicants/:id',
				element: <PrivateRouter />,
				children: [{ path: '', element: <ApplierManagePage /> }],
			},
			{
				path: 'galary',
				element: <GalaryPage />,
			},
			{
				path: 'signin',
				element: <SignInPage />,
			},
			{
				path: 'find/password',
				element: <PassWordFindingPage />,
			},
			{
				path: 'signup',
				children: [
					{ path: 'school?', element: <SchoolCertificationPage /> },
					{ path: 'nickname', element: <NicknameSettingPage /> },
					{ path: 'complete', element: <CompleteSignUpPage /> },
				],
			},
			{
				path: 'management',
				element: <PrivateRouter />,
				children: [
					{
						path: '',
						element: <RecruitManageWrapper />,
						children: [
							{
								path: 'bookmark',
								element: <RecruitPostingBookmark />,
							},
							{
								path: 'applied',
								element: <RecruitPostingApply />,
							},
							{
								path: 'my-post',
								element: <RecruitMyPostings />,
							},
						],
					},
				],
			},
			{
				path: 'recruitment/postings',
				element: <RecruitCreatePage />,
			},
			{
				path: 'recruitment/postings/edit/:id',
				element: <PrivateRouter />,
				children: [
					{
						path: '',
						element: <RecruitCreatePage />,
					},
				],
			},
			{
				path: 'profile/:userId?',
				element: <ProfileDetailsPage />,
			},
			{
				path: 'profile/edit',
				element: <PrivateRouter />,
				children: [{ path: '', element: <ProfileEditPage /> }],
			},
			{
				path: 'portfolio/:portfolioId?',
				element: <PortfolioDetailsPage />,
			},
			{
				path: 'portfolio/edit/:portfolioId?',
				element: <PrivateRouter />,
				children: [
					{
						path: '',
						element: <PortfolioEditPage />,
					},
				],
			},
			{
				path: 'portfolio/management',
				element: <PortfolioManagementPage />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
			{
				path: 'account',
				element: <PrivateRouter />,
				children: [
					{
						path: '',
						element: <AccountSetting />,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
