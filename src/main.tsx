import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	MainPage,
	RecruitPage,
	GalaryPage,
	RecruitCreatePage,
	OutputCreatePage,
	RecruitDetailPage,
	SignInPage,
	SchoolCertificationPage,
	NicknameSettingPage,
	SignUpPage,
	PassWordFindingPage,
	ProfileDetailsPage,
} from './pages/index.ts';
import './globalStyle.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <MainPage />,
			},
			{
				path: 'recruit',
				element: <RecruitPage />,
			},
			{
				path: 'recruit/:id',
				element: <RecruitDetailPage />,
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
					{ path: '', element: <SignUpPage /> },
					{ path: 'school?', element: <SchoolCertificationPage /> },
					{ path: 'nickname', element: <NicknameSettingPage /> },
				],
			},
			{
				path: 'recruitment/postings',
				element: <RecruitCreatePage />,
			},
			{
				path: 'create/output',
				element: <OutputCreatePage />,
			},
			{
				path: 'profile/:nickname?',
				element: <ProfileDetailsPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
