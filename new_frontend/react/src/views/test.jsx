import React, { useState } from 'react';

const Test = () => {
  const [files, setFiles] = useState();
  const [upload, setUpload] = useState();
console.log(upload);

  const fileHandle = (event) => {
    setFiles(event.target.files[0]);
    if (!files)
      setUpload('uploading');
    else
      setUpload('not uploading')
  };

  return (
    <div>
      <input type="file" onChange={fileHandle} />
      {upload === 'uploading' ? <p>Uploading...</p> : <p>Not uploading</p>}
    </div>
  );
};

export default Test;
