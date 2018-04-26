import React from 'react';

const Final = ({ finalHash }) => {
  return (
    <div>
      <div className="container final">
        <h1>Thank you for completing the formulary!</h1>
        <div className="container text-center">
          Here is the hash of your formulary that you need to present in order
          to finish your postulation:
          <div>
            {finalHash}
          </div>
          <div>
            Link to your postulation recap on ipfs:
            <a href={'https://ipfs.io/ipfs/' + finalHash}>
              {'https://ipfs.io/ipfs/' + finalHash}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Final;
