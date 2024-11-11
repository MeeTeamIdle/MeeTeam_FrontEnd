import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../atom';

const PrivateRouter = () => {
	const isLogin = useRecoilValue(loginState);
	const location = useLocation();

	if (location.pathname === '/account') {
		return isLogin ? <Outlet /> : <Navigate to='/' />;
	}

	if (location.pathname === '/campus') {
		return isLogin ? <Outlet /> : <Navigate to='/' />;
	}

	return isLogin ? <Outlet /> : <Navigate to='/signin' />;
};

export default PrivateRouter;
