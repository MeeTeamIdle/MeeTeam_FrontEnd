/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecruitPage, SignInPage } from './pages/index.ts';
import './globalStyle.css';
import './styles/fonts/font.css';

import { LoadingBackground } from './components/index.ts';

const RecruitCreatePage = React.lazy(
	() => import('./pages/recruit/recruitCreatePage/RecruitCreatePage')
);
const RecruitDetailPage = React.lazy(
	() => import('./pages/recruit/recruitDetailPage/RecruitDetailPage')
);
const ApplierManagePage = React.lazy(
	() => import('./pages/recruit/applierManagePage/ApplierManagePage')
);
const SchoolCertificationPage = React.lazy(
	() => import('./pages/account/schoolCertification/SchoolCertificationPage')
);
const NicknameSettingPage = React.lazy(
	() => import('./pages/account/nicknameSetting/NicknameSettingPage')
);
const PassWordFindingPage = React.lazy(
	() => import('./pages/account/passWordFindingPage/PassWordFindingPage')
);
const CompleteSignUpPage = React.lazy(() => import('./pages/account/complete/CompleteSignUpPage'));
const ProfileDetailsPage = React.lazy(() => import('./pages/profile/details/ProfileDetailsPage'));
const ProfileEditPage = React.lazy(() => import('./pages/profile/edit/ProfileEditPage'));
const NotFound = React.lazy(() => import('./pages/notFound/NotFound'));
const AccountSetting = React.lazy(() => import('./pages/account/accountSetting/AccountSetting'));
const PrivateRouter = React.lazy(() => import('./pages/routes/PrivateRouter'));
const RecruitManageWrapper = React.lazy(
	() => import('./pages/recruit/recruitManagePage/RecruitManageWrapper')
);
const RecruitPostingBookmark = React.lazy(
	() => import('./pages/recruit/recruitManagePage/RecruitPostingBookmark')
);
const RecruitPostingApply = React.lazy(
	() => import('./pages/recruit/recruitManagePage/RecruitPostingApply')
);
const RecruitMyPostings = React.lazy(
	() => import('./pages/recruit/recruitManagePage/RecruitMyPostings')
);
const PortfolioDetailsPage = React.lazy(
	() => import('./pages/portfolio/details/PortfolioDetailsPage')
);
const PortfolioEditPage = React.lazy(() => import('./pages/portfolio/edit/PortfolioEditPage'));
const PortfolioManagementPage = React.lazy(
	() => import('./pages/portfolio/management/PortfolioManagementPage')
);

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <RecruitPage />,
			},
			{
				path: 'campus',
				element: <PrivateRouter />,
				children: [
					{
						path: '',
						element: <RecruitPage />,
					},
					{
						path: 'recruitment/postings/:id',
						element: <RecruitDetailPage />,
					},
				],
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
		<Suspense fallback={<LoadingBackground />}>
			<RouterProvider router={router} />
		</Suspense>
	</React.StrictMode>
);
