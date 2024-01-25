import './Pdf.css';
import { useState } from 'react';
import Header from './header/Header';
import { Drop } from './Drop';
import { blobToURL } from '../../utils/Utils';

function Pdf() {
	const [pdf, setPdf] = useState<null | string | ArrayBuffer>(null);

	const onLoaded = async (files: Blob[]) => {
		const URL: any = await blobToURL(files[0]);
		setPdf(URL);
	};

	return (
		<div>
			<Header />
			<div className="container">
				{!pdf ? <Drop onLoaded={onLoaded} /> : null}
			</div>
		</div>
	);
}

export default Pdf;
