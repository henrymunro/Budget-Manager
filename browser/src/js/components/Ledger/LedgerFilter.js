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

    return <div className={baseStyles.cf}>
        <h4> Filter Ledger: </h4>
        <div className={styles.filter}>
          <p> Month: </p>
          <YearMonthDropDown {...other} /> 
        </div>
        <div className={styles.filter}>
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
        </div>
      </div>
  }
}


LedgerFilter.propTypes = {
  
}
