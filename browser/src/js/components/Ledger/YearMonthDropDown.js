import React from 'react'


import { updateYearMonth } from 'js/actions/ledgerActions'

// var $ = require( 'jquery')


export default class YearMonthDropDown extends React.Component {
  componentWillMount () {
  }

  componentDidUpdate(){
    console.log('UPDATE: ', $('select'))
    $('select').material_select();
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

    return   <div className='input-field col s12' onChange={this.updatedYearMonth.bind(this)}>
              <select           
                    value={yearMonth.selectedValue} 
                    data-id='' 
                    onChange={this.updatedYearMonth.bind(this)}>
                  {yearMonthSelectList}
              </select>
          </div>
  }
}


YearMonthDropDown.propTypes = {
  yearMonth: React.PropTypes.object
}


