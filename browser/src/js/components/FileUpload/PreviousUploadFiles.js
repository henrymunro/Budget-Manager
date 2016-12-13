import React from 'react'

import moment from 'moment'

import baseStyles from 'styles/base.css'
import styles from 'styles/components/PreviousUploadFiles.css'

export default class PreviousUploadFiles extends React.Component {
  componentWillMount () {

  }

  render () {
    const { previouslyUploadedFiles } = this.props
    const tableRows = previouslyUploadedFiles.map((row, key) => {
      return <tr key={key}>
                 <td className={baseStyles.tableRow + ' ' + styles.uploadDateRow}>
                   {moment(row.UploadDate).format('YYYY-MM-DD')}
                 </td>
                 <td className={baseStyles.tableRow + ' ' + styles.fileNameRow}>
                    <span title={'Total positive entries £'+row.PositiveTotal+'\nTotal negative entries £'+row.NegativeTotal }> 
                      {row.FileName}
                    </span>
                 </td>
                 <td className={baseStyles.tableRow + ' ' + styles.accountNameRow}>
                    {row.AccountName} 
                 </td>   
                 <td className= {baseStyles.tableRow + ' ' + styles.rowCountRow}>
                   {row.NumberOfRecords}
                 </td>    
                 <td className= {baseStyles.tableRow + ' ' + styles.minDateRow}>
                   {moment(row.MinEntryDate).format('YYYY-MM-DD')}
                 </td>  
                 <td className= {baseStyles.tableRow + ' ' + styles.maxDateRow}>
                   {moment(row.MaxEntryDate).format('YYYY-MM-DD')}
                 </td>          
               </tr>
    })

    return (
      <div className="col s12 l12 card">
        <table className={'striped ' + baseStyles.tableHead}>
          <tbody className={baseStyles.tableHead}>
            <tr className={baseStyles.tableHead}>
              <th className={baseStyles.white + ' ' + styles.uploadDateRow  }>Upload Date</th>
              <th className={baseStyles.white + ' ' + styles.fileNameRow    }>File Name</th>
              <th className={baseStyles.white + ' ' + styles.accountNameRow }>Account</th>
              <th className={baseStyles.white + ' ' + styles.rowCountRow    }>Row Count</th>
              <th className={baseStyles.white + ' ' + styles.minDateRow     }>Min Date</th>
              <th className={baseStyles.white + ' ' + styles.maxDateRow     }>Max Date</th>
            </tr>
          </tbody>
        </table>
        <div style={{height: '150px', overflowY: 'auto', overflowX: 'hidden', position:'relative'}}>
          <table className='striped'>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}


PreviousUploadFiles.propTypes = {

}
