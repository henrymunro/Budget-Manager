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
                  <th>
                    Date
                  </th>
                  <th>
                    Ammount
                  </th>
                  <th>
                    Description
                  </th>
                  <th>
                    Type
                  </th>
                  <th> 
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
