import React, { Component } from 'react'
import './Upload.css'
import Dropzone from 'react-dropzone'
import { ToastContainer, toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

const uploadIcon = require('../assets/up-arrow.png')
const url = `http://0e1f0eca.ngrok.io`
const spinner = require('../assets/spinner.svg')

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

    console.log(acceptedFiles)

    let file = acceptedFiles[0]
    if (file.type != "image/jpeg") {
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

    this.setState({ isLoading: true })

    if (this.state.file && this.state.fileName) {
      let data = new FormData()
      data.append('file', this.state.file)
      data.append('fileName', this.state.fileName)

      axios.post(`https://cors-anywhere.herokuapp.com/` + `${url}/foo`, data).then(res => {
        this.setState({
          displayName: res.data.displayName,
          score: res.data.score,
          isLoading: false
        })
      }).catch(err => {
        console.log(err)
        this.setState({ isLoading: false })
      })

    }
  }

  render() {
    if (this.state.displayName && this.state.score) {
      return  <Redirect
                to={{
                  pathname: '/results',
                  state: { 
                    displayName: this.state.displayName,
                    score: this.state.score
                  }
                }} />
    }

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
        <div className="spinner-container">
          { this.state.isLoading && <img src={ spinner } id="spinner"/> }
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
