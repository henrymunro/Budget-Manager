export default function reducer(state={
		
	    particleIndex: 0,
	    particlesPerTick: 5,
	    svgWidth: 800,
	    svgHeight: 600,
	    tickerStarted: false,
	    generateParticles: false,
	    mousePos: [null, null],

	    lines: {
	    	 data1: {
	    	 	data:[
	            {day:'02-11-2016',count:0},
	            {day:'02-12-2016',count:250},
	            {day:'02-13-2016',count:150},
	            {day:'02-14-2016',count:496},
	            {day:'02-15-2016',count:140},
	            {day:'02-16-2016',count:380},
	            {day:'02-17-2016',count:100},
	            {day:'02-18-2016',count:200}]
	         },
	         data2:{
	         	data:[
	            {day:'02-11-2016',count:0},
	            {day:'02-12-2016',count:350},
	            {day:'02-13-2016',count:170},
	            {day:'02-14-2016',count:6},
	            {day:'02-15-2016',count:240},
	            {day:'02-16-2016',count:1000},
	            {day:'02-17-2016',count:130},
	            {day:'02-18-2016',count:200}]
	        },

	    },
        margin: {top: 5, right: 50, bottom: 20, left: 50},

	}, action){

	switch(action.type) {

		case "GET_ACCOUNTS_FULFILLED": {
        	return {...state, accounts: action.payload.data}
      	}

  }

	return state
}