import './Pdf.css';
import { useRef, useState } from 'react';
import Header from './header/Header';
import { Drop } from './Drop';
import { blobToURL } from '../../utils/Utils';
import { Document, Page, pdfjs } from 'react-pdf';
import { PagingControl } from './PagingControl/PagingControl';
import { AddSignDialog } from './AddSignDialog/AddSignDialog';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pdf = () => {
	const [pdf, setPdf] = useState<null | string | ArrayBuffer>(null);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [pageDetails, setPageDetails] = useState(null);
	const [pageNum, setPageNum] = useState<number>(0);
	const documentRef = useRef(null);
	const [signatureDialogVisible, setSignatureDialogVisible] =
		useState<boolean>(false);
	const [autoDate, setAutoDate] = useState<boolean>(true);
	const [signatureURL, setSignatureURL] = useState<string | null>(null);

	const onLoaded = async (files: Blob[]) => {
		const URL: string | null = await blobToURL(files[0]);
		setPdf(URL);
	};

	return (
		<div>
			<Header />
			<div className="container">
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
				{!pdf ? <Drop onLoaded={onLoaded} /> : null}
				{pdf ? (
					<div>
						<div ref={documentRef} className="document-block">
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
