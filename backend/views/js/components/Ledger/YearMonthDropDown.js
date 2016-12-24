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

    return    <div className='col s12' onChange={this.updatedYearMonth.bind(this)}>
              <select    
                    className='browser-default'       
                    value={yearMonth.selectedValue} 
                    data-id='' 
                    onChange={this.updatedYearMonth.bind(this)}>
                  {yearMonthSelectList}
              </select>
          </div>
  }
}
                    // value={yearMonth.selectedValue} 
                    // data-id='' 
                    // onChange={this.updatedYearMonth.bind(this)}>


YearMonthDropDown.propTypes = {
  yearMonth: React.PropTypes.object
}


