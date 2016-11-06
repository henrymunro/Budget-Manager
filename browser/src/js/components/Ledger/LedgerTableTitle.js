import React from 'react'


import styles from 'styles/components/LedgerTable.css'
import baseStyles from 'styles/base.css'

export default class LedgerTableTitle extends React.Component {

  render () {
       return (

        <div>    
            <table className={'striped '+ styles.tableHead}>
              <thead>
                <tr>
                  <th className={styles.dateCol}>
                    Date
                  </th>
                  <th className={styles.amountCol}>
                    Ammount
                  </th>
                  <th className={styles.descriptionCol}>
                    Description
                  </th>
                  <th className={styles.typeCol}>
                    Type
                  </th>
                  <th className={styles.splitCol}> 
                    Split
                  </th>
                </tr>
              </thead>
            </table>
        </div>
      )
    }

}

LedgerTableTitle.propTypes = {

}
