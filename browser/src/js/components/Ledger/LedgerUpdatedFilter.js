import React from 'react'

import { updateUpdatedFilter } from 'js/actions/ledgerActions'

import baseStyles from 'styles/base.css'

export default class LedgerUpdatedFilter extends React.Component {
  componentWillMount () {

  }

  updateUpdatedFilter(e){
  	const { updatedFilter } = this.props.ledger.filters
    const send = (updatedFilter==='true')?'false':'true' 
  	this.props.dispatch(updateUpdatedFilter(send))
  }


  render () {
   
    const { updatedFilter } = this.props.ledger.filters

    return <input type='radio' checked={updatedFilter==='true'} onChange={this.updateUpdatedFilter.bind(this)}/> 
  }
}


LedgerUpdatedFilter.propTypes = {
  distinctTypes: React.PropTypes.array.isRequired, 
  typeFilter: React.PropTypes.string.isRequired
}
