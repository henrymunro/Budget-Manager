import React from 'react'
import * as d3 from 'd3'

import Line from './Line'


export default class Lines extends React.Component {
  render () {

  	const { lines, innerWidth, innerHeight } = this.props

    
    const plottedLines = lines.map((row, key)=>{
    	const data = row
    	const {...lineProps} = { data, innerWidth, innerHeight } 
    	return  <Line {...lineProps}  key={key}/> 
    })



    return (
    	<g>
	      	{plottedLines}
	   	</g>
    )
  }
}

	      // <Line />

Lines.propTypes = {

};