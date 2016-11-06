import React from 'react'

import { updateYearMonth } from 'js/actions/ledgerActions'



export default class YearMonthSideMenu extends React.Component {
  componentWillMount () {
  }

  componentDidUpdate(){
    $('.scrollspy').scrollSpy({
        scrollParent: '#scrollableLedgerTable',
        offsetTop: 0
    })
  }

  componentDidMount(){
     
  }


  render () {
    const { yearMonth } = this.props.ledger
    const yearMonthList = yearMonth.array.map((yearMonth, key)=>{
      return <li key={key}><a href={"#"+yearMonth.YearMonth+'yearMonthKey'}>{yearMonth.YearMonth}</a></li>
    })

    return <ul class="section table-of-contents">
        {yearMonthList}
      </ul>
    
  }
}
                    // value={yearMonth.selectedValue} 
                    // data-id='' 
                    // onChange={this.updatedYearMonth.bind(this)}>


YearMonthSideMenu.propTypes = {
  yearMonth: React.PropTypes.object
}


