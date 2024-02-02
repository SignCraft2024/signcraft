import { useState } from 'react';
import '../../styles/formUpload.css';

interface FileUploaderProps {
	onFileUpload: (file: File) => void;
}

const FormUpload: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];

		if (file) {
			onFileUpload(file);
			setUploadedFile(file);
		}
	};
	return (
		<div>
			<h1>Upload your files to add sign</h1>
			<div className="file-upload-container">
				<div>
					<input
						type="file"
						id="file"
						name="file"
						className="file-upload-input"
						onChange={handleFileChange}
					/>
					<label htmlFor="file" className="file-upload-label">
						Choose a file
					</label>
				</div>
			</div>

			{uploadedFile && (
				<p className="file-name">File selected: {uploadedFile.name}</p>
			)}
		</div>
	);
};

export default FormUpload;
