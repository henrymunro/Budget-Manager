import React from 'react'
import * as d3 from 'd3'


import styles from 'styles/components/graphStyles/LineStyles.css'

export default class Lines extends React.Component {

  forceUpdate(){}

  render () {
  	
    const { data, xScale, yScale, colourScale, distinctTypes, reactMotionKey} = this.props

    //function to plot line for given input
    var line = d3.line()
        .x(function(d) {
            // console.log(d) 
            return xScale(d3.timeParse("%d-%m-%Y")(d.data.YearMonth))
          })
        .y((d)=> { return yScale(d.style.Amount)})
        .curve(d3.curveCatmullRom.alpha(0.5))

    // To plot the lines we have to re-aggragate the data 
    // react-motion required us to lump it all together previously
    const lines = distinctTypes.map((row, key)=>{
      // Initialises the line width 
      let Width = 0
      // Filtering based on distinct type 
      const filteredType = data.filter((item)=>{
          // console.log(item)
          if (item.data.type === row && item.data.plotType == reactMotionKey){
            // Setting the path width (will be the same for all points on the line as passed down)
            Width = item.style.Width+'px'
            return item
          }
        })
        return <path 
                  style={{stroke: colourScale(row), strokeWidth: Width }} 
                  className={styles.line} 
                  d={line(filteredType)} 
                  strokeLinecap="round" 
                  data-type={row} 
                  key={row+reactMotionKey}/>
    })
  

    return (
      <g>{lines}</g>
    )
  }
}


Lines.propTypes = {
  data: React.PropTypes.array.isRequired,
  distinctTypes: React.PropTypes.array.isRequired
};

