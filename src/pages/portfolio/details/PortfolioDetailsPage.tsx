import React, { useEffect, useState } from 'react';
import S from './PortfolioDetails.styled';
import {
	DefaultBtn,
	IconBtn,
	ImageCarousel,
	LinkDetails,
	PortfolioInformation,
	PortfolioList,
	Modal,
	ModalPortal,
} from '../../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { useReadPortfolio, useDeletePortfolio, useCheckDevice } from '../../../hooks';
import { Image, BlobFile } from '../../../types';
import { addClassToEmptyPTags, fixModalBackground, unzipFile } from '../../../utils';
import { useRecoilState } from 'recoil';
import { uploadImageListState } from '../../../atom';
import { TrashCan } from '../../../assets';
import DOMPurify from 'dompurify';

const PortfolioDetailsPage = () => {
	const { portfolioId } = useParams() as { portfolioId: string };
	const { data: portfolio, isSuccess } = useReadPortfolio(portfolioId);

	const navigate = useNavigate();

	const [uploadImageList, setUploadImageList] = useRecoilState(uploadImageListState); // 추후에 받아온 정보 reduce로 조합해서 초기화

	const extractPromise = (imageList: BlobFile[]) =>
		new Promise<Image[]>(resolve => {
			let extractedImageList: Image[] = [];
			for (let i = 0; i < imageList.length; i++) {
				const urlReader = new FileReader();
				urlReader.readAsDataURL(imageList[i].blob as Blob);
				urlReader.onload = () => {
					const extractedImage = {
						fileName: imageList[i].fileName,
						url: urlReader.result,
						file: imageList[i].blob,
					} as Image;
					extractedImageList = [...extractedImageList, extractedImage];
					if (i === imageList.length - 1) {
						resolve(extractedImageList);
					}
				};
			}
		});

	const reorderPromise = (extractedImageList: Image[]) =>
		new Promise<BlobFile[]>(() => {
			if (portfolio?.fileOrder) {
				let reorderedImageList: Image[] = [];
				for (let i = 0; i < portfolio?.fileOrder.length; i++) {
					const reorderedImage = extractedImageList.find(
						extractedImage => extractedImage.fileName === portfolio?.fileOrder[i]
					) as Image;
					reorderedImageList = [...reorderedImageList, reorderedImage];
					if (i === portfolio?.fileOrder.length - 1) {
						setUploadImageList(reorderedImageList);
					}
				}
			}
		});

	useEffect(() => {
		if (portfolio?.zipFileUrl && portfolio?.fileOrder) {
			// 이미지 리사이징 추후 적용
			unzipFile(portfolio?.zipFileUrl)
				.then(imageList => {
					return extractPromise(imageList);
				})
				.then(extractedImageList => {
					return reorderPromise(extractedImageList);
				});
		}
	}, [portfolio?.zipFileUrl]);

	const { mutate: deletePortfolio } = useDeletePortfolio();

	const handleDeletePortfoilo = () => {
		setModalOpen(true);
	};

	const [modalOpen, setModalOpen] = useState(false);
	useEffect(() => {
		fixModalBackground(modalOpen);
	}, [modalOpen]);

	const modalProps = {
		title: '포트폴리오 삭제',
		content:
			'삭제된 포트폴리오는 더이상\n프로필에서 확인할 수 없습니다.\n해당 포트폴리오를 완전히 삭제할까요?',
		defaultBtn: {
			title: '취소',
			small: true,
			handleClick: () => {
				setModalOpen(false);
			},
		},
		primaryBtn: {
			title: '삭제',
			small: true,
			handleClick: () => {
				deletePortfolio(portfolioId);
				setModalOpen(false);
				navigate('/portfolio/management');
			},
		},
	};

	// 반응형
	const { isMobile, isTablet } = useCheckDevice();

	return (
		isSuccess && (
			<S.PortfolioDetailsLayout>
				<S.PortfolioDetailsContainer>
					<S.PortfolioDetailsHeader $isTablet={isTablet} $isMobile={isMobile}>
						<S.PortfolioDetailsColumn $gap='1rem'>
							<h1>{portfolio?.title}</h1>
							<h5>{portfolio?.description}</h5>
						</S.PortfolioDetailsColumn>
						{portfolio?.isWriter && (
							<S.PortfolioDetailsButtonContainer $isTablet={isTablet} $isMobile={isMobile}>
								<IconBtn icon={TrashCan} handleClick={handleDeletePortfoilo} />
								{modalOpen && (
									<ModalPortal>
										<Modal {...modalProps} />
									</ModalPortal>
								)}
								<DefaultBtn
									type='button'
									title='편집'
									handleClick={() => navigate(`/portfolio/edit/${portfolioId}`)}
								/>
							</S.PortfolioDetailsButtonContainer>
						)}
					</S.PortfolioDetailsHeader>

					<S.PortfolioDetailsColumn $gap='8rem'>
						<S.PortfolioDetailsColumn $gap='4rem'>
							<ImageCarousel images={uploadImageList} />
							<PortfolioInformation {...portfolio} />
						</S.PortfolioDetailsColumn>

						<S.PortfolioDetailsColumn>
							<S.PortfolioDetailsArticle>
								<S.PortfolioDetailsTitle>상세내용</S.PortfolioDetailsTitle>
								<hr />
								<S.PortfolioDetailsContent
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(addClassToEmptyPTags(portfolio?.content as string)),
									}}
								/>
							</S.PortfolioDetailsArticle>

							<S.PortfolioDetailsArticle>
								<S.PortfolioDetailsTitle>링크</S.PortfolioDetailsTitle>
								<hr />
								<S.PortfolioDetailsColumn>
									{portfolio?.links?.map((link, index) => (
										<S.PortfolioDetailsRow key={index} $gap='3.65rem'>
											<LinkDetails {...link} />
										</S.PortfolioDetailsRow>
									))}
								</S.PortfolioDetailsColumn>
							</S.PortfolioDetailsArticle>
						</S.PortfolioDetailsColumn>
					</S.PortfolioDetailsColumn>
				</S.PortfolioDetailsContainer>
				<PortfolioList
					nickname={portfolio?.writerNickname as string}
					portfolios={portfolio?.otherPortfolios ?? []}
				/>
			</S.PortfolioDetailsLayout>
		)
	);
};

export default PortfolioDetailsPage;
