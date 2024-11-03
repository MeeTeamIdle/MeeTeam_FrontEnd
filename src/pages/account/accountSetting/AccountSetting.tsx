import React, { useEffect } from 'react';
import S from './AccountSetting.styled';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { warningModalWithdrawState } from '../../../atom';
import { AccountDelete } from '../../../components';
import { fixModalBackground } from '../../../utils';

const AccountSetting = () => {
	const [isWithdraw, setIsWithdraw] = useRecoilState(warningModalWithdrawState);

	const withdrawHandler = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	const withdrawModalHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setIsWithdraw(true);
	};

	useEffect(() => {
		fixModalBackground(isWithdraw);
	}, [isWithdraw]);

	return (
		<S.AccountSettingStyled>
			<h2>계정 설정</h2>
			<hr className='title-underbar' />
			<section className='wrapper-menu'>
				<article className='container' onClick={withdrawHandler}>
					<section className='container-account'>
						<section className='container-account__title'>
							<h4 className='red'>회원 탈퇴</h4>
							<span className='body1-medium description'>개인 정보와 설정이 모두 삭제됩니다.</span>
						</section>
					</section>
					<section className='container-hidden'>
						<hr />
						<section className='container-hidden__withdraw'>
							<span className='body1-medium semi-bold'>탈퇴 시 유의사항</span>
							<ul className='container-list'>
								<li className='body1-medium paragraph'>
									계정 탈퇴 시, 밋팀의 서비스에서 모두 탈퇴됩니다.
								</li>
								<li className='body1-medium paragraph'>
									탈퇴 시 계정과 관련된 모든 권한이 사라지며 복구할 수 없습니다.
								</li>
								<li className='body1-medium paragraph'>
									서비스를 이용하며 남긴 리뷰와 게시글은 삭제됩니다.
								</li>
								<li className='body1-medium paragraph'>
									탈퇴 후 동일한 메일로 재가입이 가능하나, 탈퇴한 계정과 연동되지 않습니다.
								</li>
								<li className='body1-medium paragraph'>
									탈퇴 후 연동된 소셜 계정 정보도 사라지며 소셜 로그인으로 기존 계정 이용이
									불가능합니다.
								</li>
							</ul>
						</section>
						<section className='container-btn'>
							<button
								type='button'
								className='btn-withdraw txt-big withdraw'
								onClick={withdrawModalHandler}
							>
								회원탈퇴
							</button>
						</section>
					</section>
				</article>
			</section>
			<section
				className='wrapper-personal'
				onClick={() =>
					window.open('https://www.notion.so/10e6ef13aebb42e5b87d4bd873eef04f?pvs=4', '_blank')
				}
			>
				<span>개인정보 처리방침</span>
				<span className='icon'>
					<RiArrowRightSLine />
				</span>
			</section>
			{isWithdraw && (
				<section className='modal-background'>
					<AccountDelete />
				</section>
			)}
		</S.AccountSettingStyled>
	);
};

export default AccountSetting;
