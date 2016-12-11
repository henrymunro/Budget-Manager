import React from 'react'
import * as d3 from 'd3'

import styles from 'styles/components/graphStyles/Legend.css'
import baseStyles from 'styles/base.css'

import { toggleLineVisibility, getGraphGroupedBySubType, getGraphGroupedByType, makeLineBoldOnHover } from 'js/actions/graphActions'

export default class LegendElement extends React.Component {

  onLegendClick(e){
    const type = e.target.closest('.'+styles.LegendElement).attributes.getNamedItem('data-type').value
    this.props.dispatch(toggleLineVisibility(type))
  }

  onShowSubTypeClick(e){
    const type = e.target.closest('.'+styles.LegendElement).attributes.getNamedItem('data-type').value
    if ( type == this.props.subTypeParent){
      this.props.dispatch(getGraphGroupedByType(this.props.axios))
    }else{
      this.props.dispatch(getGraphGroupedBySubType(type, this.props.axios))
    }
  }

  onMouseEnter(e){
    //Action to make the line of the hovered type bold
    const type = e.target.closest('.'+styles.LegendElement).attributes.getNamedItem('data-type').value
    this.props.dispatch(makeLineBoldOnHover(type))
  }

  onMouseLeave(e){
    this.props.dispatch(makeLineBoldOnHover(''))
  }

  //Used to define the backgroud colour of the tooltip
  colourLightener(h){
    let lightener = 150;
      let r = parseInt((cutHex(h)).substring(0,2),16)+lightener;
      let g = parseInt((cutHex(h)).substring(2,4),16)+lightener;
      let b = parseInt((cutHex(h)).substring(4,6),16)+lightener;
    function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h};
    let lighter = 'rgb('+r+','+g+','+b+')';
      return lighter;
  }

  render () {

    const {type, colour, show, legendType, subTypeParent} = this.props

    const showColour = show?colour: this.colourLightener(colour) 
    const showText = show? 'white' : 'black'
    const subTypeToggle = <div data-type={type}  
        style={{background: showColour, padding: '0px', margin: '0px'}}       
        className={styles.SubTypeToggleDiv}    
        onClick={this.onShowSubTypeClick.bind(this)}>
                <p style={{background: showColour, padding: '0px', margin: '0px'}}  className={baseStyles.cf}>
                  <input class="with-gap" name="group3" type="radio" id="test5" checked={(subTypeParent==type)} />
                  <label for="test5"></label>
                </p>
        </div>
    const showSubTypeToggle = (legendType=='TYPE')? subTypeToggle : <div />
    
    return (
    	<div 
      className={styles.LegendElement+' '+baseStyles.cf} 
      data-type={type}
      style={{background: showColour}} >
          <div 
          className={styles.LegendTextDiv} 
          style={{ background: showColour,  color: showText}}
          onClick={this.onLegendClick.bind(this)}
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}
          data-type={type}>  
            {type} 
          </div>
          {showSubTypeToggle}
      </div>
    )
  }
}

LegendElement.propTypes = {
  type: React.PropTypes.string.isRequired, 
  colour: React.PropTypes.string.isRequired,
  show: React.PropTypes.bool.isRequired,
  // subTypeParent: React.PropType.string.isRequired
} 

