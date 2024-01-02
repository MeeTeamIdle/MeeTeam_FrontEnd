import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	MainPage,
	RecruitPage,
	GalaryPage,
	MemberPage,
	InformationUsePage,
	MeeTeamCreatePage,
	ManagementPage,
	ManagePage,
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
				path: 'galary',
				element: <GalaryPage />,
			},
			{
				path: 'member',
				element: <MemberPage />,
			},
			{
				path: 'information',
				element: <InformationUsePage />,
			},
			{
				path: 'create', // meeteam/create
				element: <MeeTeamCreatePage />,
			},
			{
				path: 'meeteam/:meeteamId?',
				element: <ManagementPage />,
			},
			{
				path: 'manage',
				element: <ManagePage />,
				children: [],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
