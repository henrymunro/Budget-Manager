import React from 'react'

import { updateTypeFilter } from 'js/actions/ledgerActions'

import baseStyles from 'styles/base.css'

export default class LedgerTypeFilter extends React.Component {
  componentWillMount () {

  }

  updateTypeFilterSelect(e){
  	const filterType = e.target.value
  	this.props.dispatch(updateTypeFilter(filterType))
  }


  render () {
   
    const { distinctTypes } = this.props.types
    const { typeFilter } = this.props.ledger.filters

    const typeList = distinctTypes.map((item, key)=> {
    	return <option 
                key={key} 
                value={item}
                data-type={item}
              >
                {item}
              </option>
    })

    const typeFilterList = typeList.concat(<option 
                key={'no filter'} 
                value={false}
                data-type={false}
              >
                {'No filter selected'}
              </option>)


    return <select value={typeFilter} data-id='typeFilter' onChange={this.updateTypeFilterSelect.bind(this)}>
        {typeFilterList}
    </select>
  }
}


LedgerTypeFilter.propTypes = {
  
}
