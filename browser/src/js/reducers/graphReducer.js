import React from 'react'
import * as d3 from 'd3'

export default function reducer(state={

	    lines: [],
	    linesSubType: [],
	    subTypeParent: '',
	    showSubType: false, 
	    svgWidth: 800,
	    svgHeight: 300,
	    svgHeightMax: 300, //constant
	    svgHeightMin: 150, //constant
        // innerHeight: 10, 
        // innerWidth: 10,
        transform: '',
        margin: {top: 5, right: 50, bottom: 20, left: 100},
        rangeXValue: [d3.timeParse("%m-%d-%Y")('2016-10-10'),d3.timeParse("%m-%d-%Y")('2016-10-11')],
        rangeYValue: [0, 10],
        xScale: d3.scaleTime(), 
        yScale: d3.scaleLinear(), 
        extent_X: [0, 0],
        extent_Y: [0, 0],
        distinctTypes: [],
        distinctTypesShow: [],
        distinctSubTypesShow: [],
        distinctDates: [],
        circleRadius: 4,
        lineWidth: 3,
        graphElement: <div />,
        shouldGraphRender: 1 ,
        springDefault: {stiffness: 200, damping: 13},
        lineToMakeBold:'' //makes line bold when legend is hovered

	}, action){

	switch(action.type) {

		case "UPDATE_MAX_XY_VALUE": {
        	return {...state, 
        		rangeXValue: action.payload.rangeXValue, 
        		rangeYValue: action.payload.rangeYValue,
        		xScale: action.payload.xScale, 
        		yScale: action.payload.yScale
        	}
      	}
      	case "UPDATE_INNER_GRAPH_DIMENSIONS": {
      		const { innerHeight, innerWidth, transform } = action.payload
			return {
				...state,
				innerHeight: innerHeight,
				innerWidth: innerWidth,
				transform: transform
			}
		}
		case "GET_GRAPH_GROUPED_BY_TYPE_PENDING":{
			return {
				...state,
				shouldGraphRender: 1
			}
		}
		case "GET_GRAPH_GROUPED_BY_TYPE_FULFILLED":{
		
			const { data, distinctTypesShow, distinctDates } = action.payload.data
			//find if any new types have been added 
			let newTypesShow = []
			const currentTypesShow = state.distinctTypesShow
			// concats new types onto end of arrage to ensure legend colours remain same 
			// for exiting types when a new one is added 
			distinctTypesShow.map((row)=>{
				if(currentTypesShow.map(el=>el.type).indexOf(row.type)===-1){
					newTypesShow.push({type: row.type, show: true})
				}
			})			
			// Adds new types added 
			const newDisctinctTypesShow = currentTypesShow.concat(newTypesShow)

			// Works out the extent of X and Y base on visible data, 
			let dataToShow  = []
			// Grabs the new data to show
      		data.map((typeData)=>{
      			const distinctTypesShowIndex = newDisctinctTypesShow.map(el=>el.type).indexOf(typeData.type) 
      			const show = newDisctinctTypesShow[distinctTypesShowIndex].show
      			// Adds the data for the visible types 
      			if (show){
      					dataToShow = dataToShow.concat(typeData.data) 
      				}
      		})
      		// Calculates the ranges for the visible data
      		const { extent_X, extent_Y } = calculateRangeFromShowData(dataToShow) 
			return {
				...state,
				lines: data, 
				showSubType: false,
	    		subTypeParent: '',
				extent_X: extent_X,//[d3.timeParse("%d-%m-%Y")(extent_X[0]), d3.timeParse("%d-%m-%Y")(extent_X[1])] ,
				extent_Y:extent_Y,
				distinctTypesShow: newDisctinctTypesShow,
				distinctDates: distinctDates,
				shouldGraphRender: 1
			}
		}

		case "GET_GRAPH_GROUPED_BY_SUB_TYPE_FULFILLED": {
			const { data, distinctTypesShow, distinctDates } = action.payload.data.data
			const { parentType } = action.payload.data

			// Determins if a new parent type has been selected, if not determines if any new subtypes have been added to the data 
			let newDisctinctTypesShow 
			if (parentType == state.subTypeParent){
				//find if any new types have been added 
				let newTypesShow = []
				const currentTypesShow = state.distinctSubTypesShow
				// concats new types onto end of arrage to ensure legend colours remain same 
				// for exiting types when a new one is added 
				distinctTypesShow.map((row)=>{
					if(currentTypesShow.map(el=>el.type).indexOf(row.type)===-1){
						newTypesShow.push({type: row.type, show: true})
					}
				})			
				// Adds new types added 
				newDisctinctTypesShow = currentTypesShow.concat(newTypesShow)				
			} else {
			// If a new parent type has been selected, flush the current subtypes and show only new
				newDisctinctTypesShow = distinctTypesShow
			}

			// Works out the extent of X and Y base on visible data, 
			let dataToShow  = []
			// Grabs the new data to show
      		data.map((typeData)=>{
      			const distinctTypesShowIndex = newDisctinctTypesShow.map(el=>el.type).indexOf(typeData.type) 
      			const show = newDisctinctTypesShow[distinctTypesShowIndex].show
      			// Adds the data for the visible types 
      			if (show){
      					dataToShow = dataToShow.concat(typeData.data) 
      				}
      		})
      		// Calculates the ranges for the visible data
      		const { extent_X, extent_Y } = calculateRangeFromShowData(dataToShow) 
			return {
				...state,
				linesSubType: data, 				
				showSubType: true,
				subTypeParent: parentType,
				extent_X: extent_X,//[d3.timeParse("%d-%m-%Y")(extent_X[0]), d3.timeParse("%d-%m-%Y")(extent_X[1])] ,
				extent_Y:extent_Y,
				distinctSubTypesShow: newDisctinctTypesShow,
				distinctDates: distinctDates,
				shouldGraphRender: 1
			}
		}

		// Updates the graph entire graph element in the store
		case "UPDATE_GRAPH_ELEMENT":{
			return {
				...state, 
				graphElement: action.payload,
				shouldGraphRender: 0
			}
		}

		// Toggles the visibility of a line when the legend is clicked and rescales graph
		case "TOGGLE_LINE_VISIBILITY":{
			const type = action.payload
			const index = _.findIndex(state.lines, function (obj) {return obj.type == type })
      		const updatedType = Object.assign({}, state.lines[index], {show: state.lines[index].show?false:true})
      		let dataToShow  = []


      		const typeIndex = _.findIndex(state.distinctTypesShow, function (obj) {return obj.type == type })
      		const updatedTypeElement = Object.assign({}, state.distinctTypesShow[typeIndex], {show: state.distinctTypesShow[typeIndex].show?false:true})
      		
      		// Grabs the new data to show
      		state.lines.map((typeData)=>{
      			const distinctTypesShowIndex = state.distinctTypesShow.map(el=>el.type).indexOf(typeData.type) 
      			const show = state.distinctTypesShow[distinctTypesShowIndex].show
      			// For types not being altered by this event 
      			if (show && typeData.type !=type){
      				dataToShow = dataToShow.concat(typeData.data) 
      			}
      			// For type being updated this event 
      			else if ((typeData.type ===type) && (show?false:true)){
      				dataToShow = dataToShow.concat(typeData.data) 
      			}
      		})

	        // Calculates the ranges for the visible data
      		const { extent_X, extent_Y } = calculateRangeFromShowData(dataToShow)
      		return {
		        ...state,
		        shouldGraphRender: 1,		        				
				showSubType: false,
		        extent_X: extent_X,
		        extent_Y: extent_Y,
		        lines: [
		          ...state.lines.slice(0, index),
		          updatedType,
		          ...state.lines.slice(index + 1)
		      	],
		  		 distinctTypesShow: [
		          ...state.distinctTypesShow.slice(0, typeIndex),
		          updatedTypeElement,
		          ...state.distinctTypesShow.slice(typeIndex + 1)
		      ]}

		}

		case "MAKE_LINE_BOLD_ON_LEGEND_HOVER":{
			return {
				...state, 
				lineToMakeBold: action.payload,
				shouldGraphRender: 1
			}
		}

		case "UPDATE_GRAPH_WIDTH":{
			return {
				...state, 
				svgWidth: action.payload * 0.65,
				shouldGraphRender: 1 
			}
		}

		case "UPDATE_GRAPH_HEIGHT":{
			return {
				...state,
				svgHeight: action.payload,
				shouldGraphRender: 1
			}
		}

  }

	return state
}

function calculateRangeFromShowData(dataToShow){
	// Calculates the new range of the visible data
	dataToShow.forEach(function (d) {
        d.date = d3.timeParse("%d-%m-%Y")(d.YearMonth)
    })
	// Works out the max and min X of each data set
	const x = d3.extent(dataToShow, function (d) {
		    return d.date;
	    })
	// Works out the max and min Y of each data set
	const y = d3.extent(dataToShow, function (d) {
	        return Number(d.Amount);
	    })
	const  extent_X = [x[0], x[1]]
    const   extent_Y = [y[0], y[1]*1.1]
    return{ extent_X, extent_Y}
}