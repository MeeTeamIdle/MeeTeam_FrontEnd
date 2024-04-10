import React from 'react';
import RoleCard from '../../role/RoleCard';
import S from './RecruitRoles.styled';
import { RoleInfo } from '../../../../types';

const RecruitRoles = (props: { roles: RoleInfo[] }) => {
	return (
		<S.RecruitRoles>
			<h3>모집역할</h3>
			<section className='scroll'>
				<section className='container-roles'>
					{props.roles.map((role, index) => (
						<RoleCard key={index} {...role} />
					))}
				</section>
			</section>
		</S.RecruitRoles>
	);
};

export default RecruitRoles;
