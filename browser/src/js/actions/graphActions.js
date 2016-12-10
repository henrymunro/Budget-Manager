
// Updates the X and Y scales calculated from the data set 
export function updateMaxXYValue(rangeXValue, rangeYValue, xScale, yScale){
	return {
    	type: 'UPDATE_MAX_XY_VALUE',
 	   payload: {
 	   	rangeXValue: rangeXValue, 
 	   	rangeYValue:rangeYValue,
 	   	xScale: xScale, 
 	   	yScale: yScale

 	   }
  }
}
// Updates the inner dimesions of the graph space based on the margin
export function updateInnerGraphDimensions(innerHeight, innerWidth, transform){
	return {
		type: 'UPDATE_INNER_GRAPH_DIMENSIONS',
		payload: {
			innerHeight: innerHeight,
			innerWidth: innerWidth,
			transform: transform
		}
	}
}

// Returns data for the graph grouped by Type 
export function getGraphGroupedByType(axios){
	return {
		type: "GET_GRAPH_GROUPED_BY_TYPE",
		payload: axios.request.get(axios.URLS.graphType)
	}
}

// Returns data for the graph grouped by SubType for a given type 
export function getGraphGroupedBySubType(typeSelected, axios){
	return {
		type: "GET_GRAPH_GROUPED_BY_SUB_TYPE",
		payload: axios.request.post(axios.URLS.graphSubType, {type: typeSelected})
	}
}

// Stores the HTML graph element in the store 
export function updateGraphElement(elm){
	return { 
		type:"UPDATE_GRAPH_ELEMENT", 
		payload:elm
	}
}

export function toggleLineVisibility(type){
	return {
		type:"TOGGLE_LINE_VISIBILITY",
		payload: type
	}
}


//Makes the line bold when legend element is hovered over 
export function makeLineBoldOnHover(type){
	return{
		type:"MAKE_LINE_BOLD_ON_LEGEND_HOVER",
		payload: type
	}
}

// Used to update the width of the graph on window resize
export function updateGraphWidth(innerWidth){
	return{
		type:"UPDATE_GRAPH_WIDTH",
		payload: innerWidth 
	}
}

export function updateGraphHeight(height){
	return{
		type: "UPDATE_GRAPH_HEIGHT",
		payload: height
	}
}