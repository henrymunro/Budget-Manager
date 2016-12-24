import React from 'react'
import { connect } from 'react-redux'
import { StickyContainer, Sticky } from 'react-sticky';

import { getAccounts } from 'js/actions/accountsActions'
import { getYearMonth, getLedger, updateDescription, saveDescription } from 'js/actions/ledgerActions'
import { getType } from 'js/actions/typeActions'

import NavBar from 'js/components/HomePage/NavBar'
import AccountsDropDown from 'js/components/Accounts/AccountsDropDown'
import UploadedFileTable from 'js/components/FileUpload/UploadedFileTable'
import LedgerFilter from 'js/components/Ledger/LedgerFilter'
import LedgerTableTitle from 'js/components/Ledger/LedgerTableTitle'
import LedgerTable from 'js/components/Ledger/LedgerTable'
import YearMonthSideMenu from 'js/components/Ledger/YearMonthSideMenu'

import baseStyles from 'styles/base.css'


export default class Ledger extends React.Component {
  componentWillMount () {
    const axios = this.props
    console.log('This is axiso: ', axios)
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

    const ledgerTables = yearMonthArray.map((row, key)=>{
      return <div 
              id={row.YearMonth+'yearMonthKey'} 
              className="section scrollspy" 
              key={key}
              style={{paddingTop:0, position:'relative'}}>
            <LedgerTable {...other} data={this.filterLedgerItems(row.YearMonth)}/>
        </div>
    })


    return (
        <div>
          <div className='col s12 l9'> 
            <div className="card"> 
              <Sticky>        
                <div className="">  
                  <LedgerTableTitle />     
                </div> 
              </Sticky>  
              <div 
              id='scrollableLedgerTable'
              className=""
              style={{height: '450px', overflowY: 'auto', overflowX: 'hidden', position:'relative'}}>
                {ledgerTables}   
              </div>
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
    )
  }
}


Ledger.propTypes = {

}

