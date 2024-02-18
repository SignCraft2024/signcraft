import './Drop.css';
import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { AuthContext } from '../../security/AuthProvider';
import { uploadDocument } from '../../firebase/uploadFile';

export const Drop: React.FC<{ onLoaded: (files: File[]) => void }> = ({
	onLoaded,
}) => {
	const { currentUser } = useContext(AuthContext);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		uploadDocument(currentUser, acceptedFiles[0]);
		onLoaded(acceptedFiles);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'application/pdf': ['.pdf'],
		},
	});

	return (
		<div {...getRootProps()} className="drop-container">
			<input {...getInputProps()} />
			{isDragActive ? <p>Drop a PDF here</p> : <p>Drag a PDF here</p>}
		</div>
	);
};
