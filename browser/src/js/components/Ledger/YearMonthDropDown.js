import React from 'react'


export default class YearMonthDropDown extends React.Component {
  componentWillMount () {
  }

  render () {
    const { yearMonth } = this.props.ledger
    const { onYearMonthChange } = this.props
    const yearMonthSelectList = yearMonth.array.map((yearMonth, key)=>{
      let selected = false
      return <option 
                key={key} 
                value={yearMonth.YearMonth}
              >
                {yearMonth.YearMonth}
              </option>
    })

    return <select defaultValue={yearMonth.selectedValue} data-id='' onChange={onYearMonthChange}>
        {yearMonthSelectList}
    </select>
  }
}


YearMonthDropDown.propTypes = {
  yearMonth: React.PropTypes.object,
  // onYearMonthChange: React.PropTypes.function
}
