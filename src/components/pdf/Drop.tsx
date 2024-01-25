import './Drop.css';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export const Drop: React.FC<{ onLoaded: (files: Blob[]) => void }> = ({
	onLoaded,
}) => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		onLoaded(acceptedFiles);
		// Do something with the files
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'application/pdf': ['.pdf'],
		},
	});

	return (
		<div {...getRootProps()} className="container">
			<input {...getInputProps()} />
			{isDragActive ? <p>Drop a PDF here</p> : <p>Drag a PDF here</p>}
		</div>
	);
};
