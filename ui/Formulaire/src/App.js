import React, { Component } from 'react';
import IPFS from 'ipfs';
import jsPDF from 'jspdf';
import "./lib/bootstrap.min.css";
import Formulary from './Formulary';
import Summary from './Summary';
import Final from './Final';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedFileHash: '',
      finalHash: '',
      info1: '',
      info2: 0,
      phase: 'formulary'
    }
    this.node = new IPFS();
    this.node.once('ready', () => {
      console.log('IPFS node is ready!');
      this.node.version((err, version) => {
        err ? console.error(err) : console.log('Version: ' + version.version);
      });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFileChange = e => {
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.onloadend = () => this.saveToIpfs(reader);
    reader.readAsArrayBuffer(file);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      phase: 'summary'
    });
  }

  handleGoBack = e => {
    this.setState({
      phase: 'formulary'
    });
  }

  handlePublish = e => {
    const doc = new jsPDF();
    const source = document.getElementsByTagName('body')[0];
    const reader = new window.FileReader();
    const specialElementHandlers = {
    	'#editor': function(element, renderer){
    		return true;
    	},
    	'.controls': function(element, renderer){
    		return true;
    	}
    };
    doc.fromHTML(source, 15, 15, {
    	'width': 170,
    	'elementHandlers': specialElementHandlers
    });
    const file = doc.output('blob');
    reader.onloadend = () => this.saveToIpfs(reader);
    reader.readAsArrayBuffer(file);
  }

  saveToIpfs(reader) {
    let ipfsId;
    const buffer = Buffer.from(reader.result);
    this.node.files.add(buffer)
      .then((response) => {
        ipfsId = response[0].hash;
        if (this.state.phase === 'formulary') {
          this.setState({
            addedFileHash: ipfsId
          });
        } else if (this.state.phase === 'summary') {
          this.setState({
            finalHash: ipfsId,
            phase: 'final'
          });
        }
      }).catch((err) => {
        console.error(err);
      });
  }

  render() {
    const displayElement = this.state.phase === 'formulary' ?
      <Formulary
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleFileChange={this.handleFileChange}
      /> : this.state.phase === 'summary' ?
        <Summary
          {...this.state}
          handleGoBack={this.handleGoBack}
          handlePublish={this.handlePublish}
        /> : <Final finalHash={this.state.finalHash} /> ;
    return (
      <div className="App">
        {displayElement}
      </div>
    );
  }
}

export default App;
