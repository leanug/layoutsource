import { useState } from 'react';
import { Upload } from '@/api';

export default function UploadFilePage() {
  const uploadCtrl = new Upload();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }
  
    //const myImage = { files: selectedFile };
    const data = new FormData()
    data.append('files', selectedFile)

    try {
      const result = await uploadCtrl.upload(data);
      console.log('result', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="fileInput">Choose a file:</label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            name="files"
          />
        </div>
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
}
