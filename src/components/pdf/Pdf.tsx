/* eslint-disable @typescript-eslint/no-explicit-any */
import './Pdf.css';
import { useRef, useState } from 'react';
import Header from './header/Header';
import { Drop } from './Drop';
import { blobToURL } from '../../utils/Utils';
import { Document, Page, pdfjs } from 'react-pdf';
import { PagingControl } from './PagingControl/PagingControl';
import { AddSignDialog } from './AddSignDialog/AddSignDialog';
import { Button } from './Button/Button';
import { DraggableText } from './DraggableText/DraggableText';
import dayjs from 'dayjs';
import { PDFDocument, rgb } from 'pdf-lib';
import { DraggableSignature } from './DraggableSignature/DraggableSignature';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const downloadURI = (uri: string | ArrayBuffer, name: string) => {
	const link = document.createElement('a');
	link.download = name;
	link.href = uri as string;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const Pdf = () => {
	const [pdf, setPdf] = useState<null | string | ArrayBuffer>(null);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [pageDetails, setPageDetails] = useState<any>(null);
	const [pageNum, setPageNum] = useState<number>(0);
	const documentRef = useRef(null);
	const [signatureDialogVisible, setSignatureDialogVisible] =
		useState<boolean>(false);
	const [textInputVisible, setTextInputVisible] = useState<boolean | string>(
		false,
	);
	const [autoDate, setAutoDate] = useState<boolean>(true);
	const [signatureURL, setSignatureURL] = useState<string | null>(null);
	const [position, setPosition] = useState<any>(null);

	const onLoadedDrop = async (files: Blob[]) => {
		const URL: string | null = await blobToURL(files[0]);
		setPdf(URL);
	};

	return (
		<div>
			<Header />
			<div className="pdf-container">
				{signatureDialogVisible ? (
					<AddSignDialog
						autoDate={autoDate}
						setAutoDate={setAutoDate}
						onClose={() => setSignatureDialogVisible(false)}
						onConfirm={(url) => {
							setSignatureURL(url);
							setSignatureDialogVisible(false);
						}}
					/>
				) : null}
				{!pdf ? <Drop onLoaded={onLoadedDrop} /> : null}
				{pdf ? (
					<div>
						<div className="pdf-controls">
							{!signatureURL ? (
								<Button
									marginRight={8}
									title={'Add signature'}
									onClick={() => setSignatureDialogVisible(true)}
								/>
							) : null}
							<Button
								marginRight={8}
								title={'Add Date'}
								onClick={() => setTextInputVisible('date')}
							/>

							<Button
								marginRight={8}
								title={'Add Text'}
								onClick={() => setTextInputVisible(true)}
							/>
							<Button
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
								<Button
									marginRight={8}
									inverted={true}
									title={'Download'}
									onClick={() => {
										downloadURI(pdf, 'file.pdf');
									}}
								/>
							) : null}
						</div>
						<div ref={documentRef} className="pdf-document-block">
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
									onCancel={() => setSignatureURL(null)}
									onEnd={setPosition}
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
													color: rgb(0.074, 0.545, 0.262),
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
								/>
							) : null}
							<Document
								file={pdf}
								onLoadSuccess={(document: any) => {
									setTotalPages(document.numPages);
								}}
							>
								<Page
									pageNumber={pageNum + 1}
									width={800}
									onLoadSuccess={(page: any) => {
										setPageDetails(page);
									}}
								/>
							</Document>
						</div>
						<PagingControl
							totalPages={totalPages}
							pageNum={pageNum}
							setPageNum={setPageNum}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Pdf;
