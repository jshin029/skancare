import React, { Component } from 'react'
import './Upload.css'
import Dropzone from 'react-dropzone'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const uploadIcon = require('../assets/up-arrow.png')

export default class Upload extends Component {
  state = {
    file: undefined,
    fileName: ""
  }

  handleFileDrop = acceptedFiles => {
    if (acceptedFiles.length > 1) {
      toast.error("Please upload only 1 file!")
      return
    }

    let file = acceptedFiles[0]
    if (file.type != "image/png") {
      toast.warn("Please upload a PNG file!")
      return
    }
    else {
      this.setState({ 
        file,
        fileName: file.name
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    if (this.state.file && this.state.fileName) {
      // Send file to backend
    }
  }

  render() {
    return (
      <div className="upload-container">
        <div className="upload-desc-container">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <p>Upload your file here</p>
            </div>
          </div>
        </div>
        <div className="dropzone-container">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-1">
                <Dropzone onDrop={ this.handleFileDrop }>
                  {({getRootProps, getInputProps}) => (
                    <section>
                      <div { ...getRootProps() }>
                        <input { ...getInputProps() } />
                        <div className="upload-icon-container">
                          <img src={ uploadIcon } id="upload-icon" alt=""/>
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
          </div>
          { this.state.file && this.state.fileName && <p id="filename">{ this.state.fileName }</p> }
        </div>
        <div className="upload-button-container">
          <button type="button" class="btn btn-primary">Upload</button>
        </div>
        <div className="toast-container">
          <div className="container-fluid">
            <ToastContainer
              position="bottom-center"
              autoClose={ 5000 }
              hideProgressBar={ false }
              newestOnTop={ false }
              closeOnClick
              rtl={ false }
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </div>
    )
  }
}
