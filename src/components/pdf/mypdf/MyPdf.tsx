import './MyPdf.css';
import { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, rgb } from 'pdf-lib';
import dayjs from 'dayjs';
import { AddSigDialog } from './mypdfComponents/addSigDialog/AddSigDialog';
import { Drop } from '../Drop';
import { blobToURL } from '../../../utils/Utils';
import { BigButton } from './mypdfComponents/BigButton';
import DraggableText from './mypdfComponents/draggableText/DraggableText';
import DraggableSignature from './mypdfComponents/draggableSignature/DraggableSignature';
import PagingControl from './mypdfComponents/pagingControl/PagingControl';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const downloadURI = (uri: string | ArrayBuffer, name: string) => {
	const link = document.createElement('a');
	link.download = name;
	link.href = uri as string;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const MyPdf = () => {
	const [pdf, setPdf] = useState(null);
	const [originalPdfFilename, setOriginalPdfFilename] = useState<string | null>(
		null,
	);
	const [autoDate, setAutoDate] = useState<boolean>(false);
	const [signatureURL, setSignatureURL] = useState(null);
	const [position, setPosition] = useState(null);
	const [signatureDialogVisible, setSignatureDialogVisible] =
		useState<boolean>(false);
	const [textInputVisible, setTextInputVisible] = useState<
		boolean | string | null
	>(false);
	const [pageNum, setPageNum] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [pageDetails, setPageDetails] = useState(null);
	const documentRef = useRef(null);

	return (
		<div>
			<div id="container-mypdf">
				{signatureDialogVisible ? (
					<AddSigDialog
						autoDate={autoDate}
						setAutoDate={setAutoDate}
						onClose={() => setSignatureDialogVisible(false)}
						onConfirm={(url) => {
							setSignatureURL(url);
							setSignatureDialogVisible(false);
						}}
					/>
				) : null}

				{!pdf ? (
					<Drop
						onLoaded={async (files) => {
							const URL = await blobToURL(files[0]);
							setOriginalPdfFilename(files[0].name);
							setPdf(URL);
						}}
					/>
				) : null}
				{pdf ? (
					<div id="container-pdf">
						<div id="document-controls">
							{!signatureURL ? (
								<BigButton
									marginRight={8}
									title={'Add signature'}
									onClick={() => setSignatureDialogVisible(true)}
								/>
							) : null}

							<BigButton
								marginRight={8}
								title={'Add Date'}
								onClick={() => setTextInputVisible('date')}
							/>

							<BigButton
								marginRight={8}
								title={'Add Text'}
								onClick={() => setTextInputVisible(true)}
							/>
							<BigButton
								marginRight={8}
								title={'Reset'}
								onClick={() => {
									setTextInputVisible(false);
									setSignatureDialogVisible(false);
									setSignatureURL(null);
									setPdf(null);
									setTotalPages(0);
									setPageNum(0);
									setPageDetails(null);
								}}
							/>
							{pdf ? (
								<BigButton
									marginRight={8}
									inverted={true}
									title={'Download'}
									onClick={() => {
										downloadURI(pdf, `${originalPdfFilename}`);
									}}
								/>
							) : null}
						</div>
						<div ref={documentRef} id="document-block">
							{textInputVisible ? (
								<DraggableText
									initialText={
										textInputVisible === 'date'
											? dayjs().format('M/d/YYYY')
											: null
									}
									onCancel={() => setTextInputVisible(false)}
									onEnd={setPosition}
									onSet={async (text) => {
										const { originalHeight, originalWidth } = pageDetails;
										const scale =
											originalWidth / documentRef.current.clientWidth;

										const y =
											documentRef.current.clientHeight -
											(position.y +
												12 * scale -
												position.offsetY -
												documentRef.current.offsetTop);
										const x =
											position.x -
											166 -
											position.offsetX -
											documentRef.current.offsetLeft;

										// new XY in relation to actual document size
										const newY =
											(y * originalHeight) / documentRef.current.clientHeight;
										const newX =
											(x * originalWidth) / documentRef.current.clientWidth;

										const pdfDoc = await PDFDocument.load(pdf);

										const pages = pdfDoc.getPages();
										const firstPage = pages[pageNum];

										firstPage.drawText(text, {
											x: newX,
											y: newY,
											size: 20 * scale,
										});

										const pdfBytes = await pdfDoc.save();
										const blob = new Blob([new Uint8Array(pdfBytes)]);

										const URL = await blobToURL(blob);
										setPdf(URL);
										setPosition(null);
										setTextInputVisible(false);
									}}
								/>
							) : null}
							{signatureURL ? (
								<DraggableSignature
									url={signatureURL}
									onCancel={() => {
										setSignatureURL(null);
									}}
									onSet={async () => {
										const { originalHeight, originalWidth } = pageDetails;
										const scale =
											originalWidth / documentRef.current.clientWidth;

										const y =
											documentRef.current.clientHeight -
											(position.y -
												position.offsetY +
												64 -
												documentRef.current.offsetTop);
										const x =
											position.x -
											160 -
											position.offsetX -
											documentRef.current.offsetLeft;

										// new XY in relation to actual document size
										const newY =
											(y * originalHeight) / documentRef.current.clientHeight;
										const newX =
											(x * originalWidth) / documentRef.current.clientWidth;

										const pdfDoc = await PDFDocument.load(pdf);

										const pages = pdfDoc.getPages();
										const firstPage = pages[pageNum];

										const pngImage = await pdfDoc.embedPng(signatureURL);
										const pngDims = pngImage.scale(scale * 0.3);

										firstPage.drawImage(pngImage, {
											x: newX,
											y: newY,
											width: pngDims.width,
											height: pngDims.height,
										});

										if (autoDate) {
											firstPage.drawText(
												`Signed ${dayjs().format('M/d/YYYY HH:mm:ss ZZ')}`,
												{
													x: newX,
													y: newY - 10,
													size: 14 * scale,
													color: rgb(0, 0, 0),
												},
											);
										}

										const pdfBytes = await pdfDoc.save();
										const blob = new Blob([new Uint8Array(pdfBytes)]);

										const URL = await blobToURL(blob);
										setPdf(URL);
										setPosition(null);
										setSignatureURL(null);
									}}
									onEnd={setPosition}
								/>
							) : null}
							<Document
								file={pdf}
								onLoadSuccess={(data) => {
									setTotalPages(data.numPages);
								}}
							>
								<Page
									width={700}
									pageNumber={pageNum + 1}
									renderAnnotationLayer={false}
									renderTextLayer={false}
									onLoadSuccess={(data) => {
										setPageDetails(data);
									}}
								/>
							</Document>
						</div>
						<PagingControl
							pageNum={pageNum}
							setPageNum={setPageNum}
							totalPages={totalPages}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default MyPdf;
