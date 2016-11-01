import React from 'react'

import YearMonthDropDown from 'js/components/Ledger/YearMonthDropDown'
import LedgerTypeFilter from 'js/components/Ledger/LedgerTypeFilter'

import baseStyles from 'styles/base.css'

export default class LedgerFilter extends React.Component {
  componentWillMount () {
  }


  render () {
   
    const {...other } = this.props

    return <div className={baseStyles.cf}>
        <h4> Filter Ledger: </h4>
        <YearMonthDropDown {...other} /> 
        <LedgerTypeFilter {...other} />
      </div>
  }
}


LedgerFilter.propTypes = {
  
}
