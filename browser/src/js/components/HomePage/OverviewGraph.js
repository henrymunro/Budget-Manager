import React from 'react'
import { connect } from 'react-redux'

import * as d3 from 'd3'

import Lines from './OverviewGraph/Lines'


@connect((store) => {
  return {
    graph: store.graph
  }
})

export default class OverviewGraph extends React.Component {
  componentWillMount () {

  }


  render () {

    const { lines, svgWidth, svgHeight, margin } = this.props.graph

    const   innerWidth = svgWidth - (margin.left + margin.right),
            innerHeight = svgHeight - (margin.top + margin.bottom);




 
    const transform='translate(' + margin.left + ',' + margin.top + ')'
 
    const {...linesProps} = { lines, innerWidth, innerHeight }

    return (
      <div className='container'>
          <h2>OverviewGraph</h2>
          <div>
            <svg id='chartID' width={svgWidth} height={svgHeight}>
                 <g transform={transform}>
                    <Lines {...linesProps} />                    
                </g>
            </svg>
         </div>
      </div>
    )
  }
}

                 // <Lines lines={this.props.lines} />



OverviewGraph.propTypes = {

}




