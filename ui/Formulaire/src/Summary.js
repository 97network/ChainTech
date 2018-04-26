import React from 'react';
import './Summary.css';

const Summary = ({
  info1,
  info2,
  addedFileHash,
  handlePublish,
  handleGoBack
}) => {
  const displayInfo1 = info1 ?
    <li><strong>Info1:</strong> {info1}</li> : '';
  const displayInfo2 = info2 ?
    <li><strong>Info2:</strong> {info2}</li> : '';
  const displayInfoFile = addedFileHash ? (
    <div>
      <strong>Uploaded file: </strong>
      <a href={'https://ipfs.io/ipfs/' + addedFileHash}>
        {'https://ipfs.io/ipfs/' + addedFileHash}
      </a>
    </div>
  ) : '';
  return (
    <div className="container summary">
      <h1>Summary</h1>
      <div className="container text-center">
        <ul>
          {displayInfo1}
          {displayInfo2}
        </ul>
        <div>
          {displayInfoFile}
        </div>
        <div id="editor">
          <button className="btn btn-primary" onClick={handlePublish}>
            Publish to IPFS
          </button>
          <button className="btn btn-info" onClick={handleGoBack}>
            Change the informations
          </button>
        </div>
      </div>
    </div>
  );
}

export default Summary;
