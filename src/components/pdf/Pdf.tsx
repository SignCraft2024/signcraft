import './Pdf.css';
import { useRef, useState } from 'react';
import Header from './header/Header';
import { Drop } from './Drop';
import { blobToURL } from '../../utils/Utils';
import { Document, Page, pdfjs } from 'react-pdf';
import { PagingControl } from './PagingControl/PagingControl';
import { AddSignDialog } from './AddSignDialog/AddSignDialog';
import { Button } from './Button/Button';

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
	const [pageDetails, setPageDetails] = useState(null);
	const [pageNum, setPageNum] = useState<number>(0);
	const documentRef = useRef(null);
	const [signatureDialogVisible, setSignatureDialogVisible] =
		useState<boolean>(false);
	const [textInputVisible, setTextInputVisible] = useState<boolean | string>(
		false,
	);
	const [autoDate, setAutoDate] = useState<boolean>(true);
	const [signatureURL, setSignatureURL] = useState<string | null>(null);

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
