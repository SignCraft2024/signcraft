import React, { useState } from 'react'
import FormUpload from './FormUpload';

export default function ShowFile() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleFileUpload = (file: File) => {
      setUploadedFile(file);
    };
  
    return (
      <div>
        <FormUpload onFileUpload={handleFileUpload} />
        {uploadedFile && (
          <div>
            {uploadedFile.type === 'application/pdf' ? (
              <iframe title="PDF Viewer" src={URL.createObjectURL(uploadedFile)} width="600" height="400"></iframe>
            ) : (
              <p>Unsupported file format</p>
            )}
          </div>
        )}
      </div>
    );
}
