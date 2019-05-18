import React, { Component } from 'react'
import './Results.css'

export default class Results extends Component {
  render() {
    return (
      <div className="results-container">
        
      	<div className="container">
		  <div className="row">
		    

		    <div className="col-8 dropzone-container leftCol">
		      Left column
		    </div>

		    <div className="col-4 right-container rightCol">

		    	<div className="right-container">
			    
			    <div className="row">
			    	<div className="col dropzone-container topRight">
			      		Top Right
			    	</div>
			    </div>
			    <div className="row">
			    	<div className="col dropzone-container botRight">
			      		Bottom Right
			        </div>
			    </div>

			    </div>
		    </div>
		  

		  </div>
		</div>





      </div>
    )
  }
}
