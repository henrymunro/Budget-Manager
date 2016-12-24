import React from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'

// Beware the DOM will be updated by D3 in this class! 

export default class Axis extends React.Component {
 
    componentDidUpdate() { this.renderAxis() }
    componentDidMount() { this.renderAxis() }
    renderAxis() {
      let axis = ''
        if(this.props.axisType=='x'){
          axis = d3.axisBottom(this.props.xScale)
                    .ticks(4)
        } else {
            const { yScale, minY, maxY } = this.props
            const yScaleAmimated = yScale.domain([minY, maxY])
            axis =  d3.axisLeft(yScaleAmimated)
        }
        var node = ReactDOM.findDOMNode(this)
        d3.select(node).call(axis)
 
    }
    render() {        
        const innerHeight = this.props.innerHeight// * -1 
        var translate = "translate(0,"+innerHeight+")";
 
        return (
            <g className="axis" transform={this.props.axisType=='x'?translate:""} >
            </g>
        );
    }
 
}

