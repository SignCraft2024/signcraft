import { useState } from 'react';
import PdfViewerComponent from './PdfViewerComponent';
import { blobToURL } from '../../../utils/Utils';
import { Drop } from '../Drop';

const DocumentViewerComponent = () => {
	const [pdf, setPdf] = useState<null | string | ArrayBuffer>(null);
	const onLoadedDrop = async (files: Blob[]) => {
		const URL: string | null = await blobToURL(files[0]);
		setPdf(URL);
	};
	return (
		<div>
			<div className="document-viewer">
				{!pdf ? <Drop onLoaded={onLoadedDrop} /> : null}
				{pdf ? <PdfViewerComponent document={pdf} /> : null}
			</div>
		</div>
	);
};

export default DocumentViewerComponent;
