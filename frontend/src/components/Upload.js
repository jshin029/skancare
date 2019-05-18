import React, { Component } from 'react'
import './Upload.css'
import Dropzone from 'react-dropzone'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

const uploadIcon = require('../assets/up-arrow.png')
const url = `http://0e1f0eca.ngrok.io`

export default class Upload extends Component {
  state = {
    file: undefined,
    fileName: "",
    displayName: "",
    score: undefined
  }

  handleFileDrop = acceptedFiles => {
    if (acceptedFiles.length > 1) {
      toast.error("Please upload only 1 file!")
      return
    }

    let file = acceptedFiles[0]
    if (file.type != "image/jpeg") {
      toast.warn("Please upload a PNG file!")
      return
    }
    else {
      console.log(acceptedFiles)
      this.setState({ 
        file,
        fileName: file.name
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    if (this.state.file && this.state.fileName) {
      let data = new FormData()
      data.append('file', this.state.file)
      data.append('fileName', this.state.fileName)

      // fetch(`https://cors-anywhere.herokuapp.com/` + `${url}/foo`, {
      //   method: 'POST',
      //   body: data,
      // }).then(res => {
      //   // console.log(res.data)
      //   return res.json()
      // }).then(data => {
      //   console.log(data)
      // })

      axios.post(`https://cors-anywhere.herokuapp.com/` + `${url}/foo`, data).then(res => {
        this.setState({
          displayName: res.data.displayName,
          score: res.data.score
        })
      })

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
          <button type="button" class="btn btn-primary" onClick={ this.handleSubmit }>Upload</button>
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
