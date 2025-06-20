import React, { useState } from 'react';

// Interface for the expected success response from the server
interface UploadSuccessResponse {
  message: string;
  filePath: string;
  fileUrl: string; // A URL path to access the uploaded file
}

// Interface for a potential error response from the server
interface ErrorResponse {
    error: string;
}


const TestImageUpload = () => {
  // State for the selected file, typed as File or null.
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // State for the text message to display to the user.
  const [message, setMessage] = useState<string>('');
  
  // State to track the loading status during upload.
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // State to store the URL of the successfully uploaded image for preview.
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  /**
   * Handles the change event from the file input element.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // The files property can be null, so we check for its existence.
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      // Reset message and preview when a new file is selected.
      setMessage('');
      setUploadedFileUrl(null);
    }
  };

  /**
   * Handles the upload button click, sending the file to the server using the fetch API.
   */
  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    // Set loading state and clear previous messages/previews.
    setIsUploading(true);
    setMessage('Uploading...');
    setUploadedFileUrl(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // It's a good practice to store the base URL in an environment variable.
      const backendUrl = 'https://adminbackend-production-d76a.up.railway.app';
      
      const response = await fetch(`${backendUrl}/upload`, {
        method: 'POST',
        body: formData,
        
      });

 
      if (!response.ok) {
       
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || `Server responded with status: ${response.status}`);
      }

      // If successful, parse the success response.
      const successData: UploadSuccessResponse = await response.json();

      // On success, update the message and the URL for the image preview.
      setMessage(successData.message);
      // Construct the full URL for the image preview.
      setUploadedFileUrl(backendUrl + successData.fileUrl);

    } catch (error) {
        // Catch any errors from the fetch call or the error thrown above.
        if (error instanceof Error) {
            setMessage(`Upload failed: ${error.message}`);
        } else {
            setMessage('An unexpected error occurred during upload.');
        }
        console.error('Error uploading the file:', error);
    } finally {
      // Reset the loading state regardless of outcome.
      setIsUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
      <h2>Upload an Image</h2>
      <div style={{ marginBottom: '15px' }}>
        <input type="file" onChange={handleFileChange} accept="image/*" disabled={isUploading} />
      </div>
      <button onClick={handleUpload} disabled={!selectedFile || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      
      {message && <p style={{ marginTop: '15px', color: message.startsWith('Upload failed') ? 'red' : 'green' }}>{message}</p>}
      
      {uploadedFileUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Upload Successful!</h3>
          <img 
            src={uploadedFileUrl} 
            alt="Uploaded preview" 
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} 
          />
        </div>
      )}
    </div>
  );
};

export default TestImageUpload;
