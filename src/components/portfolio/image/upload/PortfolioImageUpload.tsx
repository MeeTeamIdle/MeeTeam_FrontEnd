import React, { useRef, useEffect } from 'react';
import S from './PortfolioImageUpload.styled';
import { Plus } from '../../../../assets';
import { useRecoilState } from 'recoil';
import { uploadImageListState } from '../../../../atom';
import { PortfolioCard } from '../../..';
import { BlobFile, Image } from '../../../../types';
import { unzipFile } from '../../../../utils';
import { UseFormRegister, FieldValues, FormState, UseFormSetValue } from 'react-hook-form';
import { INPUT_VALIDATION } from '../../../../constant';

const MAX_IMAGE_SIZE_BYTES = 30 * 1024 * 1024; // 30MB
const MAX_IMAGE_COUNT = 15;

interface PortfolioImage {
	register: UseFormRegister<FieldValues>;
	formState: FormState<FieldValues>;
	setValue: UseFormSetValue<FieldValues>;
	zipFileUrl?: string;
	fileOrder?: string[];
}

const PortfolioImageUpload = ({
	register,
	formState,
	setValue,
	zipFileUrl,
	fileOrder,
}: PortfolioImage) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const addImageList = () => {
		inputRef.current?.click();
	};

	const [uploadImageList, setUploadImageList] = useRecoilState(uploadImageListState);

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
			if (fileOrder) {
				let reorderedImageList: Image[] = [];
				for (let i = 0; i < fileOrder.length; i++) {
					const reorderedImage = extractedImageList.find(
						extractedImage => extractedImage.fileName === fileOrder[i]
					) as Image;
					reorderedImageList = [...reorderedImageList, reorderedImage];
					if (i === fileOrder.length - 1) {
						setUploadImageList(reorderedImageList);
						setValue('mainImage', reorderedImageList[0], {
							shouldValidate: true,
							shouldDirty: true,
							shouldTouch: true,
						});
					}
				}
			}
		});

	useEffect(() => {
		if (zipFileUrl && fileOrder) {
			// 이미지 리사이징 추후 적용
			unzipFile(zipFileUrl)
				.then(imageList => {
					return extractPromise(imageList);
				})
				.then(extractedImageList => {
					return reorderPromise(extractedImageList);
				});
		} else if (!(zipFileUrl || fileOrder)) {
			setUploadImageList([]);
		}
	}, [zipFileUrl]);

	const changeImageList = (event: React.BaseSyntheticEvent) => {
		const imageList = event.target?.files;
		for (let i = 0; i < imageList.length && uploadImageList.length + i < MAX_IMAGE_COUNT; i++) {
			if (imageList[i].size > MAX_IMAGE_SIZE_BYTES) {
				continue;
			}
			if (
				uploadImageList.find(image => image.fileName === imageList[i].name) ||
				[...imageList].find((image, index) => index !== i && image.name === imageList[i].name)
			) {
				let uniqueFileName = imageList[i].name;
				let idx = 1;
				while (
					uploadImageList.find(image => image.fileName === uniqueFileName) ||
					[...imageList].find((image, index) => index !== i && image.name === uniqueFileName)
				) {
					const { fileNameWithoutExt, fileExt } = splitExt(imageList[i].name);
					uniqueFileName = `${fileNameWithoutExt}(${idx})${fileExt}`;
					idx++;
				}

				const newFile = new File([imageList[i]], uniqueFileName, { type: imageList[i].type });
				const urlReader = new FileReader();
				urlReader.readAsDataURL(newFile);
				urlReader.onload = () => {
					const uploadImage = {
						fileName: newFile.name,
						url: urlReader.result,
						file: newFile,
					} as Image;
					setUploadImageList(prev => [...prev, uploadImage]);
					i === 0 &&
						uploadImageList.length === 0 &&
						setValue('mainImage', uploadImage, {
							shouldValidate: true,
							shouldDirty: true,
							shouldTouch: true,
						});
					event.target.value = ''; // 같은 이름 파일 있을 때만 input value 초기화
				};
				continue;
			}

			const urlReader = new FileReader();
			urlReader.readAsDataURL(imageList[i]);
			urlReader.onload = () => {
				const uploadImage = {
					fileName: imageList[i].name,
					url: urlReader.result,
					file: imageList[i],
				} as Image;
				setUploadImageList(prev => [...prev, uploadImage]);
				i === 0 &&
					uploadImageList.length === 0 &&
					setValue('mainImage', uploadImage, {
						shouldValidate: true,
						shouldDirty: true,
						shouldTouch: true,
					});
			};
		}
	};

	const splitExt = (fileName: string) => {
		const lastDotIndex = fileName.lastIndexOf('.');

		const fileNameWithoutExt = lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
		const fileExt = lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';

		return { fileNameWithoutExt, fileExt };
	};

	return (
		<S.PortfolioImageUploadLayout>
			<S.PortfolioImageGrid>
				{[...uploadImageList].map((uploadImage, index) => (
					<PortfolioCard
						key={uploadImage.fileName}
						isMainImage={index === 0}
						mainImageUrl={uploadImage.url}
						isEditable={true}
						isImageEditable={true}
						clickNumber={index + 1}
						setValue={setValue}
					/>
				))}
				{/* 이미지 추가 버튼 */}
				<S.PortfolioImageUploadContainer>
					<S.PortfolioImageUpload onClick={addImageList} $invalid={!!formState.errors['mainImage']}>
						<S.PortfolioImageUploadColumn>
							<S.PortfolioImageUploadRow>
								<img src={Plus} alt='포트폴리오 이미지 추가' />
								이미지 추가 (최대 15장)
							</S.PortfolioImageUploadRow>
							<small>(1920px X 1080px)</small>
						</S.PortfolioImageUploadColumn>
						<S.PortfolioImageInput
							{...register('mainImage', INPUT_VALIDATION.portfolioImage)}
							multiple
							ref={inputRef}
							type='file'
							accept='image/*'
							onChange={changeImageList}
						/>
					</S.PortfolioImageUpload>
					<S.PortfolioImageUploadErrorMessage>
						{formState?.errors['mainImage']?.message as string}
					</S.PortfolioImageUploadErrorMessage>
				</S.PortfolioImageUploadContainer>
			</S.PortfolioImageGrid>
		</S.PortfolioImageUploadLayout>
	);
};

export default PortfolioImageUpload;
