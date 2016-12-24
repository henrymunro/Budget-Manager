import React from 'react'
import * as d3 from 'd3'

import LegendElement from 'js/components/HomePage/OverviewGraph/LegendElement'

import styles from 'styles/components/graphStyles/Legend.css'


export default class Legend extends React.Component {
  render () {

    const { colourScale, colourScaleSubType, distinctTypesShow, showSubType, subTypeParent, distinctSubTypesShow, axios} = this.props

    const Legend = distinctTypesShow.map((el, key)=>{
      const { type, show } = el
      const colour = colourScale(type)
      const {...legendElementProps} = {type, show, colour, subTypeParent, axios}
      return <LegendElement {...legendElementProps} dispatch={this.props.dispatch} legendType='TYPE' key={key}/> 
    }) 


    const LegendSubType = showSubType? distinctSubTypesShow.map((el, key)=>{
      const { type, show } = el
      const colour = colourScaleSubType(type)
      const {...legendElementProps} = {type, show, colour, subTypeParent, axios}
      return <LegendElement {...legendElementProps} dispatch={this.props.dispatch} legendType='SUBTYPE' key={key}/> 
    }) : <div /> 




    return (
      <div className={styles.Legend}>
      	<div className='collection' id={styles.LegendType}>
  	      {Legend} 
  	   	</div>
        <div className={styles.LegendSubType}>
          {LegendSubType}
        </div>
      </div>
    )
  }
}

Legend.propTypes = {
  distinctTypesShow: React.PropTypes.arrayOf(React.PropTypes.shape({
    type:React.PropTypes.string.isRequired,
    show:React.PropTypes.bool.isRequired
  })).isRequired,
  colourScale: React.PropTypes.func.isRequired
}
