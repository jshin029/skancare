import React from 'react'
import './Results.css'
import { Pie, Bar } from 'react-chartjs-2'
import { NavLink } from 'react-router-dom'

const logo = require('../assets/logo.png')

const chooseDescription = name => {
  let desc = ""

  switch (name) {
    case "akiec":
      desc = "Actinic Keratosis (AK), also known as a solar keratosis, is a crusty, scaly growth caused by damage from exposure to ultraviolet (UV) radiation. AK is considered a precancer because if left alone, it could develop into a skin cancer."
      break;
    case "bcc":
      desc = "BCCs are abnormal, uncontrolled growths or lesions that arise in the skin’s basal cells, which line the deepest layer of the epidermis (the outermost layer of the skin). More than one out of every three new cancers is a skin cancer, and the vast majority are BCCs."
      break;
    case "bkl":
      desc = "Benign keratoses are noncancerous skin growths that some people develop as they age. They often appear on the back or chest, but can occur on any part of the body. The most common texture is rough, with a bumpy, grainy surface that crumbles easily."
      break;
    case "df":
      desc = "Dermatofibromas are harmless growths within the skin that usually have a small diameter. They can vary in color, and the color may change over the years. Dermatofibromas are firm to the touch. They are very dense, and many people say they feel like a small stone underneath or raised above the skin."
      break;
    case "nv":
      desc = "Melanocytic nevus is a usually noncancerous disorder of pigment-producing skin cells commonly called birth marks or moles. The majority of moles appear during the first two decades of a person's life, with about one in every 100 babies being born with moles."
      break;
    case "vasc":
      desc = "Vascular lesions are relatively common abnormalities of the skin and underlying tissues, more commonly known as birthmarks. Oftentimes, these vascular birthmarks are stand-alone lesions, without association with other findings."
      break;
    default:
      desc = "Melanoma is a form of skin cancer that arises when pigment-producing cells—known as melanocytes—mutate and become cancerous. Most pigment cells are found in the skin, but melanoma can also occur in the eyes (ocular melanoma) and other parts of the body, including, rarely, the intestines."
      break;
  }

  return desc
}

const chooseNums = name => {
  let nums = []

  switch (name) {
    case "akiec":
      nums = [0,0,4,9,49,52,114,161,125,0]
      break;
    case "bcc":
      nums = [0,0,4,9,49,52,114,161,125,0]
      break;
    case "bkl":
      nums = [2,0,0,11,53,79,124,150,95,0]
      break;
    case "df":
      nums = [0,0,2,16,23,31,27,13,3,0]
      break;
    case "nv":
      nums = [0,0,6,42,51,96,91,153,75,0]
      break;
    case "vasc":
      nums = [0,0,5,34,242,193,26,12,1,0]
      break;
    default:
      nums = [7,6,9,13,19,33,14,25,16,0]
      break;
  }

  return nums
}

const Results = props => {
  return (
    <div className="results-container">
      <div className="container-fluid">
        <div className="row">
          <div className="logo-container">
            <NavLink to="/">
              <img src={ logo } id="logo" alt=""/>
            </NavLink>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="left-inner-container">
              <div className="left-box">
                <div className="accuracy-container">
                  <p className="headings">Accuracy</p>
                </div>
                <div className="chart-container">
                  <Pie
                    data={{
                      datasets: [{
                        data: [props.location.state.score * 100, (100 - props.location.state.score * 100)],
                        backgroundColor: [
                        '#f66383', '#ffffff'
                        ],
                        hoverBackgroundColor: [
                        '#FF6384', '#ffffff'
                        ]
                      }]
                    }}
                    options={{
                      legend: {
                        display: false
                      },
                      tooltips: {
                        enabled: false
                      }
                    }}
                  />
                </div>
                <div className="score-container">
                  { props.location.state.score && <p className="score">{ (props.location.state.score).toFixed(2) * 100 }%</p> }
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="right-inner-container">
              <div className="row justify-content-center">
                <div className="col">
                  <div className="right-box-1">
                    <Bar
                      data={{
                        labels: ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-100"],
                        datasets: [
                          {
                            label: 'Age Group & Frequencies',
                            backgroundColor: '#f66383',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: '#FF6384',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: chooseNums(props.location.state.displayName),
                          }
                        ]
                      }}
                      width={50}
                      height={45}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col">
                  <div className="right-box-2">
                    <div className="desc-title">
                      <p className="headings">Classification</p>
                    </div>
                    <div className="row justify-content-center">
                      <div className="display-container">
                        { props.location.state.displayName && <p class="display-caption">{ chooseDescription(props.location.state.displayName) }</p> }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results