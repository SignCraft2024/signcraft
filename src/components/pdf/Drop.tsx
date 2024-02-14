import './Drop.css';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

export const Drop: React.FC<{ onLoaded: (files: Blob[]) => void }> = ({
	onLoaded,
}) => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		const storageRef = ref(storage, `/files/${acceptedFiles[0].name}`);
		const uploadTask = uploadBytesResumable(storageRef, acceptedFiles[0]);
		uploadTask.on(
			'state_changed',
			(err) => console.log(err),
			() => {
				// download url
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					console.log(url);
				});
			},
		);
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
