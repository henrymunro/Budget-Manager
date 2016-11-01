import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import {spring, Motion } from 'react-motion'
import { StickyContainer, Sticky } from 'react-sticky';

import PlottedData from './OverviewGraph/PlottedData'
import Axis from './OverviewGraph/Axis'
import YAxisGrid from './OverviewGraph/YAxisGrid'
import Legend from './OverviewGraph/Legend'

import styles from 'styles/components/graphStyles/GraphOverview.css'
import baseStyles from 'styles/base.css'

import {
        updateInnerGraphDimensions
        , updateMaxXYValue
        , getGraphGroupedByType
        , updateGraphElement
      } from 'js/actions/graphActions'


@connect((store) => {
  return {
    axios: store.axios.axios,
    graph: store.graph
  }
})

export default class OverviewGraph extends React.Component {
  componentWillMount () {
    //Gets graph data from database 
    this.props.dispatch(getGraphGroupedByType(this.props.axios))
        .then((res)=>{
            this.preRender()
        }).catch((err)=>{
          // alert('unable to connect to DB')
          throw Error(err)
        })

  }

  componentDidUpdate() {
    if (this.props.graph.shouldGraphRender == 1 ){
      this.preRender()
    }
  }

  preRender () {
    const { 
      lines,
      extent_X, 
      extent_Y,       
      distinctTypesShow,
      distinctSubTypesShow,
      showSubType,
      distinctDates,
      margin,      
      linesSubType, 
      svgWidth, 
      svgHeight, 
      circleRadius,
      lineWidth,
      springDefault, 
      subTypeParent,
      lineToMakeBold
      } = this.props.graph // Define the graph space 


    const { axios } = this.props
    
    const   innerWidth = svgWidth - (margin.left + margin.right),
            innerHeight = svgHeight - (margin.top + margin.bottom),
            transform='translate(' + margin.left + ',' + margin.top + ')'

    // Sets the X scale based on the min and max X
    const xScale = d3.scaleTime()
              .domain(extent_X)
              .rangeRound([0, innerWidth])
   


    // Sets up colour ordinal scale 
    const colourScale = d3.scaleOrdinal(d3.schemeCategory20)
                          .domain(distinctTypesShow.map(el=> el.type))

    const colourScaleSubType = d3.scaleOrdinal(d3.schemeCategory20b)
                             .domain(distinctSubTypesShow.map(el=> el.type))

    const {...legendProps} = {colourScale, colourScaleSubType, distinctTypesShow, showSubType, subTypeParent, distinctSubTypesShow, axios}

    const graphElement = 
      <div >
          <Sticky>
            <div style={{width:'100%', background:'white'}} className={baseStyles.cf}>
              <div className="container">
                <svg className={styles.graphArea} id='chartID' width={svgWidth} height={svgHeight}>
                     <g transform={transform}>
                        <Motion style={{
                              minY:spring(extent_Y[0]),
                              maxY:spring(extent_Y[1])
                            }}>
                          {interpolatedStyles=>{
                            const { minY, maxY } = interpolatedStyles
                            // Sets the Y scale based on max Y 
                            const yScale = d3.scaleLinear() 
                                    .domain([minY, maxY]) //Used to allow Y < 0 
                                    .range([innerHeight, 0])
                            //Toggles for if the type or subType graph is showing
                            const linesPlot = showSubType ? linesSubType: lines 
                            const distinctTypesShowPlot = showSubType ? distinctSubTypesShow: distinctTypesShow                        
                            const colourScalePlot = showSubType ? colourScaleSubType: colourScale
                            const reactMotionKey = showSubType ? 'SubType' : 'Type'
                            // Props to send down to the lines 
                            const {...linesProps} = { linesPlot, xScale, yScale, circleRadius, lineWidth, colourScalePlot, reactMotionKey, distinctTypesShowPlot, springDefault, lineToMakeBold }
                            const {...axisProps} = { xScale, yScale, innerHeight }
                            return <g>
                                     <Axis {...axisProps} axisType='x'/>     
                                     <Axis {...axisProps} maxY={maxY} minY={minY} axisType='y'/>
                                    <PlottedData {...linesProps} />  
                                  </g>
                           }
                          }
                        </Motion>
                      </g>
                  </svg>
                <div className ={styles.Legend}>
                    <Legend {...legendProps} dispatch={this.props.dispatch}/> 
                </div> 
              </div>
            </div>
          </Sticky>
      </div>

    this.props.dispatch(updateGraphElement(graphElement)) 

  }

  render () {

    const { graphElement } = this.props.graph

    return (
      <div style={{width: '100%'}} className={baseStyles.cf}> 
        {graphElement}
      </div>
    )
  }
}


OverviewGraph.propTypes = {

}




