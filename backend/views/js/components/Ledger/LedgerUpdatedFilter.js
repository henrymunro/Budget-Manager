import React from 'react'

import { updateUpdatedFilter } from 'js/actions/ledgerActions'

import baseStyles from 'styles/base.css'

export default class LedgerUpdatedFilter extends React.Component {
  componentWillMount () {

  }

  updateUpdatedFilter(e){
  	const { updatedFilter } = this.props.ledger.filters
    const send = (updatedFilter==='true')?'false':'true' 
    console.log('UPDATING: ', send)
  	this.props.dispatch(updateUpdatedFilter(send))
  }


  render () {
   
    const { updatedFilter } = this.props.ledger.filters

    return <div className="input-field">
              <form action="#">
                <p style={{ paddingBottom: '25px', paddingTop: 0, paddingLeft:'50px', top: 0 }}>
                  <input id="updatedFilter" type='checkbox' checked={updatedFilter==='true'} onChange={this.updateUpdatedFilter.bind(this)}/> 
                  <label for="updatedFilter">Still To Update</label>
                </p>
              </form>
            </div>
  }
}


LedgerUpdatedFilter.propTypes = {
  // distinctTypes: React.PropTypes.array.isRequired, 
  // typeFilter: React.PropTypes.string.isRequired
}
