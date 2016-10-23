import React from 'react'
import * as d3 from 'd3'


import styles from 'styles/components/graphStyles/LineStyles.css'

export default class Line extends React.Component {
  render () {

  	const { data, innerWidth, innerHeight } = this.props

  	 data.forEach(function (d) {
            d.date = d3.timeParse("%m-%d-%Y")(d.day)
        });
 
        var x = d3.scaleTime()
            .domain(d3.extent(data, function (d) {
                return d.date;
            }))
            .rangeRound([0, innerWidth]);
 

        var y = d3.scaleLinear()
            .domain([0,d3.max(data,function(d){
                return d.count+100;
            })])
            .range([innerHeight, 0]);
 
        var line = d3.line()
            .x(function (d) {
            	console.log('X: ', d)
                return x(d.date);
            })
            .y(function (d) {              
                return y(d.count);
            }).curve(d3.curveCatmullRom.alpha(0.5))

        console.log(data)

    return (
      <path className={styles.line} d={line(data)} strokeLinecap="round"/>
    )
  }
}


Line.propTypes = {

};