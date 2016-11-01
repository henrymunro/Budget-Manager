import React from 'react'


import { updateYearMonth } from 'js/actions/ledgerActions'


export default class YearMonthDropDown extends React.Component {
  componentWillMount () {
  }

  updatedYearMonth(e){
    const yearMonth = e.target.value 
    this.props.dispatch(updateYearMonth(yearMonth))
  }

  render () {
    const { yearMonth } = this.props.ledger
    const yearMonthSelectList = yearMonth.array.map((yearMonth, key)=>{
      let selected = false
      return <option 
                key={key} 
                value={yearMonth.YearMonth}
              >
                {yearMonth.YearMonth}
              </option>
    })

    return <select value={yearMonth.selectedValue} data-id='' onChange={this.updatedYearMonth.bind(this)}>
        {yearMonthSelectList}
    </select>
  }
}


YearMonthDropDown.propTypes = {
  yearMonth: React.PropTypes.object
}
