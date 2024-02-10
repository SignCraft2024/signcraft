import { useEffect, useRef } from 'react';

type PdfViewerComponentProps = {
	document: string | ArrayBuffer | null;
};
const PdfViewerComponent = (props: PdfViewerComponentProps) => {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		let PSPDFKit;

		(async function () {
			PSPDFKit = await import('pspdfkit');
			await PSPDFKit.load({
				// Container where PSPDFKit should be mounted.
				container,
				// The document to open.
				document: props.document,
				// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
				baseUrl: `${window.location.protocol}//${window.location.host}/public/`,
			});
		})();

		return () => PSPDFKit && PSPDFKit.unload(container);
	}, [props.document]);

	return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default PdfViewerComponent;
