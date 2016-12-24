import React from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'

// Beware the DOM will be updated by D3 in this class! 

export default class YAxisGrid extends React.Component {
 
    componentDidUpdate() { this.renderGrid() }
    componentDidMount() { this.renderGrid() }
    renderGrid() {
        const grid = d3.axisLeft(this.props.yScale)
                        .tickSize(-innerWidth, 0, 0)
                        .tickFormat("")
        var node = ReactDOM.findDOMNode(this)
        d3.select(node).call(grid)
 
    }
    render() {       
 
        return (
            <g className="axis">
            </g>
        );
    }
 
}

