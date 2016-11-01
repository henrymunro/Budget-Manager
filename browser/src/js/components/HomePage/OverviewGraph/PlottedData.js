import React from 'react'
import * as d3 from 'd3'
import {spring, TransitionMotion } from 'react-motion'

import Lines from './Lines'
// import Circles from './Circles'


import { updateTypeFilter, resetAllFilters, updateYearMonth } from 'js/actions/ledgerActions'


import CSSstyles from 'styles/components/graphStyles/CirclesStyles.css'


var _ = require('lodash')


export default class PlottedData extends React.Component {

  // Determines the behaviour of new items added 
  transitionWillEnter(key, style){
    const { springDefault, circleRadius, lineWidth } = this.props
    return Object.assign({}, style, {
      Radius: spring(circleRadius, springDefault),
      Width: spring(lineWidth, springDefault)
    })
  }

  // Determines the behaviour of items that have been removed
  transitionWillLeave(){
    return {
      Amount: spring(0, this.props.springDefault),
      Radius: spring(0, this.props.springDefault),
      Width: spring(0, this.props.springDefault)
    }
  }

  updateTypeFilterOnCircleClick(e){    
    const filterType = e.target.attributes.getNamedItem('data-type').value    
    const yearMonth = e.target.attributes.getNamedItem('data-year-month').value  
    this.props.dispatch(resetAllFilters())
    this.props.dispatch(updateTypeFilter(filterType))    
    this.props.dispatch(updateYearMonth(yearMonth))
  }

  render () {

  	const { linesPlot, xScale, yScale, colourScalePlot, circleRadius, reactMotionKey, lineWidth, distinctTypesShowPlot, springDefault, lineToMakeBold } = this.props
  	const plottedLines = []

            
    let transitionStyles = []
    // Loops over all the data pushes to rendered if type is set to show
    linesPlot.map((item)=>{
      // Determines if type should be showing
      const distinctTypesShowPlotIndex = distinctTypesShowPlot.map(el=>el.type).indexOf(item.type) 
      const show = distinctTypesShowPlot[distinctTypesShowPlotIndex].show
      if(show){
        const data = item.data
        // Loops over the data points for each type and pushes to a single array for all types (so react motion can keep track)
        data.map((row, key)=>{
          transitionStyles.push({
            key: reactMotionKey+item.type+key, 
            // Data is constants we can to keep with the element 
            data: {
              YearMonthOrigionalFormat: row.YearMonthOrigionalFormat,
              YearMonth: row.YearMonth,
              type: item.type,
              plotType: item.plotType
            },
            // Styles is the dynamic components
            style:{            
              Amount: spring(Number(row.Amount), springDefault),
              Radius: (item.type==lineToMakeBold)?spring(circleRadius*1.5, springDefault):spring(circleRadius, springDefault),
              Width: (item.type==lineToMakeBold)?spring(lineWidth*1.5, springDefault):spring(lineWidth, springDefault)
            }
          })
        })
      }
    })                          

    const {...circleProps} = { xScale, yScale, colourScalePlot }
            // willEnter={this.transitionWillEnter.bind(this)}
    return (
      <g>
          {plottedLines}
          
        <TransitionMotion 
            willLeave={this.transitionWillLeave.bind(this)}
            styles={transitionStyles}>
            {interpolatedStyles=>
               <g>              
                  <Lines  
                    data={interpolatedStyles}
                    xScale={xScale}
                    yScale={yScale}
                    colourScale={colourScalePlot} 
                    distinctTypes={distinctTypesShowPlot.map(el=> el.type)}
                    reactMotionKey={reactMotionKey}
                    key={reactMotionKey}
                    />
                  
                 {
                    interpolatedStyles.map((config)=>{
                      const {style, data, key} = config
                      return <circle 
                            className={CSSstyles.circle} 
                            data-type={data.type}
                            data-year-month={data.YearMonthOrigionalFormat}
                            onClick={this.updateTypeFilterOnCircleClick.bind(this)}
                            style={{fill: colourScalePlot(data.type)}}
                            r={(style.Radius<0)?0:style.Radius}
                            cx={xScale(d3.timeParse("%d-%m-%Y")(data.YearMonth))} 
                            cy={yScale(style.Amount)} 
                            key={key} />
                    
                    })
                  }               

              </g>

            }
        </TransitionMotion>
      </g>
    )
  }
}


PlottedData.propTypes = {
  linesPlot: React.PropTypes.arrayOf(React.PropTypes.shape({
        data: React.PropTypes.array.isRequired,
        type: React.PropTypes.string.isRequired
    })).isRequired,
  circleRadius: React.PropTypes.number.isRequired,
  lineWidth: React.PropTypes.number.isRequired,
  distinctTypesShowPlot: React.PropTypes.arrayOf(React.PropTypes.shape({
      type: React.PropTypes.string.isRequired,
      show: React.PropTypes.bool.isRequired
    })).isRequired

}
