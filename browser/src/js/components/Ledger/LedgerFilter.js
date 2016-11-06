import React from 'react'

import YearMonthDropDown from 'js/components/Ledger/YearMonthDropDown'
import LedgerTypeFilter from 'js/components/Ledger/LedgerTypeFilter'
import LedgerAccountFilter from 'js/components/Ledger/LedgerAccountFilter'
import LedgerUpdatedFilter from 'js/components/Ledger/LedgerUpdatedFilter'

import { resetAllFilters } from 'js/actions/ledgerActions'

import baseStyles from 'styles/base.css'
import styles from 'styles/components/LedgerFilter.css'

export default class LedgerFilter extends React.Component {
  componentWillMount () {
  }

  resetAllFilters(){
    this.props.dispatch(resetAllFilters())
  }

  render () {
   
    const {...other } = this.props

    const { updatedFilter, accountFilter, typeFilter } = this.props.ledger.filters

    console.log(updatedFilter, accountFilter, typeFilter )

    const resetFilterButton = <p>      
                <a class="waves-effect waves-light btn" onClick={this.resetAllFilters.bind(this)}> Reset Filters</a>     
              </p>
    const noReset = <div />
    const showReset = (updatedFilter|| accountFilter|| typeFilter)=='true'? resetFilterButton:noReset

    return <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header"><i className="material-icons">filter_drama</i>Filter</div>
            <div className="collapsible-body">
              <p style={{ paddingBottom: 0, paddingTop: '15px' }}>
                Type:
                <LedgerTypeFilter {...other} />
              </p>
              <p style={{ paddingBottom: 0, paddingTop: 0 }}>
                Account: 
                <LedgerAccountFilter {...other} />
              </p>              
              <LedgerUpdatedFilter {...other} />  
              {showReset}          
            </div>
          </li>
        </ul>    
  }
}

/*<div className={styles.filter}>
          Type: 
          <LedgerTypeFilter {...other} />
        </div>
        <div className={styles.filter}>
          Account: 
          <LedgerAccountFilter {...other} />
        </div>
        <div className={styles.filter}>
          Updated: 
          <LedgerUpdatedFilter {...other} />
        </div>
        <div className={styles.filter}>
          <button className='btn btn-danger btn-sm' onClick={this.resetAllFilters.bind(this)}> Reset Filters</button>
        </div>*/

LedgerFilter.propTypes = {
  
}
