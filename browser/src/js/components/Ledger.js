import React from 'react'
import { connect } from 'react-redux'
import { StickyContainer, Sticky } from 'react-sticky';

import { getAccounts } from 'js/actions/accountsActions'
import { getYearMonth, getLedger, updateDescription, saveDescription } from 'js/actions/ledgerActions'
import { getType } from 'js/actions/typeActions'

import AccountsDropDown from 'js/components/Accounts/AccountsDropDown'
import UploadedFileTable from 'js/components/FileUpload/UploadedFileTable'
import LedgerFilter from 'js/components/Ledger/LedgerFilter'
import LedgerTableTitle from 'js/components/Ledger/LedgerTableTitle'
import LedgerTable from 'js/components/Ledger/LedgerTable'
import YearMonthSideMenu from 'js/components/Ledger/YearMonthSideMenu'

import baseStyles from 'styles/base.css'


@connect((store) => {
  return {
    axios: store.axios.axios, 
    accounts: store.accounts.accounts,
    ledger: store.ledger,
    types: store.types
  }
})
export default class Ledger extends React.Component {
  componentWillMount () {
    this.props.dispatch(getYearMonth(this.props.axios))
    this.props.dispatch(getAccounts(this.props.axios))
    this.props.dispatch(getType(this.props.axios))
    this.props.dispatch(getLedger(this.props.axios))
  }

  componentDidUpdate(){

  }

  filterLedgerItems(YearMonth){
    const { ledgerItems } = this.props.ledger    
    const { typeFilter, accountFilter, updatedFilter }= this.props.ledger.filters
    // Grabs the Ledger items to diplay 
    const filteredLedger = ledgerItems.filter((row, yearMonth)=> { 
        return (
          row.YearMonth === YearMonth
          && (row.BudgetType === typeFilter || typeFilter==='false' )
          && (row.AccountName === accountFilter || accountFilter==='false' )  
          && (updatedFilter==='false' || row.Updated===0)
          )
      })

    return filteredLedger
  }


  render () {
    const { ...other } = this.props // also passes dispatch
    const yearMonthArray = this.props.ledger.yearMonth.array
    const ledgerItemsYearMonth1 = this.filterLedgerItems(this.props.ledger.yearMonth.selectedValue)
    const ledgerItemsYearMonth2 = this.filterLedgerItems("2016-Sep")
    const ledgerItemsYearMonth3 = this.filterLedgerItems("2016-Aug")

    const ledgerTables = yearMonthArray.map((row, key)=>{
      return <div id={row.YearMonth+'yearMonthKey'} class="section scrollspy" key={key}>
            <LedgerTable {...other} data={this.filterLedgerItems(row.YearMonth)}/>
        </div>
    })


    return (
      <StickyContainer>
        <div className={'row '+ baseStyles.cf} >        
          <div className='col s12 l2'>
            <Sticky>
              <div className="card">
                col1
              </div>
            </Sticky>  
          </div>
          <div className='col s12 l7'>  
              <Sticky>        
                <div className="">  
                  <LedgerTableTitle />     
                </div> 
              </Sticky>  
              <div className="card" style={{height: '500px', overflowY: 'auto'}}>
                {ledgerTables}   
              </div>
          </div>
          <div className='col s12 l3'>               
            <Sticky>
              <LedgerFilter {...other} />
              <div className="card">
                <YearMonthSideMenu {...other} />
              </div>
            </Sticky> 
          </div>
        </div>
      </StickyContainer>
    )
  }
}
/*
<StickyContainer>
          <div className='row'>        
        <Sticky>
            <div className='col s12 l2 card'>
              col1
            </div>
            <div className='col s12 l7 card hoverable z-depth-2'>          
                <LedgerFilter {...other} />
                <LedgerTableTitle />      
            </div>
            <div className='col s12 l3 card'>
                <YearMonthSideMenu {...other} />
            </div>
       
        </Sticky>     
          <div className='col s12 l2'>
          </div>
          <div className='col s12 l7 card z-depth-1'>     
            {ledgerTables}         
          </div>
          <div className='col s12 l3'>
          </div>
        </div>
      </StickyContainer>
*/

Ledger.propTypes = {

}

