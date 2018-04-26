import React from 'react';
import './Formulary.css';

const Formulary = ({
  info1,
  info2,
  handleSubmit,
  handleChange,
  handleFileChange
}) => {
  return (
    <div className="container formulary">
      <h1>Formulary</h1>
      <div className="container text-center" id="formulary">
        <form id="captureMedia" onSubmit={handleSubmit}>
          <div className="input-group">
            <label><strong>Info1</strong></label>
            <input
              className="form-control float-right"
              type="text"
              id="info1"
              name='info1'
              value={info1}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label><strong>Info2</strong></label>
            <input
              className="form-control float-right"
              type="number"
              id="info2"
              name='info2'
              value={info2}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label><strong>File</strong></label>
            <input
              className="float-right"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <button
            id="formularySubmit"
            className="btn btn-primary"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Formulary;
