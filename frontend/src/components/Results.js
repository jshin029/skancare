import React, { Component } from 'react'
import './Results.css'

const Results = props => {


    return (
      <div className="results-container">
        <div className="container-fluid">
          <div className="row justify-content-center">
            { props.location.state.score && <div>{props.location.state.score}</div> }
          </div>
        </div>
      </div>
    )
}

export default Results