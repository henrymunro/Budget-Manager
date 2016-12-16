import React from 'react'

import { 
  updateTestMappingText,
  getTestMappingData
}  from 'js/actions/mappingsActions'


import styles from 'styles/components/Mappings.css'
import baseStyles from 'styles/base.css'


export default class TestMappings extends React.Component {
  componentWillMount () {

  }
  updateTestMappingText(e){
    const text = e.target.value
    this.props.dispatch(updateTestMappingText(text))
    this.props.dispatch(getTestMappingData(text, this.props.axios))
  }

  render () {

    const { testMappingText,
            testMappingCollision,
            testMappingOverviewCount,
            testMappingRowHits
     } = this.props

     const testMappingCollisionCount = testMappingCollision.length

     const { DistinctDescriptions, TotalCount } = testMappingOverviewCount[0]

     const rowHitsTableBody = testMappingRowHits.map((row, key)=>{
        return <tr key={key}>
          <td className={baseStyles.tableRow + ' ' + styles.mappingCol} >{row.Description}</td>
          <td className={baseStyles.tableRow + ' ' + styles.mappingCol} >{row.Count}</td>
          <td className={baseStyles.tableRow + ' ' + styles.mappingCol} >{row.Sum}</td>
        </tr>

     })
    
    return (
      <div className='col s12 l12'>
        <div className="card">
              <p>Test new mapping: </p> 
              <input placeholder="Test Mapping" value={testMappingText} onChange={this.updateTestMappingText.bind(this)}/>
              <p>
                Mapping Collisions: {testMappingCollisionCount}
                Distinct Description: {DistinctDescriptions}
                Total Count: {TotalCount}
              </p> 

              <table className='striped'>
                <tr>
                  <th className={baseStyles.white}>Description</th>
                  <th className={baseStyles.white}>Count</th>
                  <th className={baseStyles.white}>Sum</th>
                </tr>
                <tbody>
                  {rowHitsTableBody}
                </tbody>
              </table>
        </div>
      </div>
    )
  }
}


TestMappings.propTypes = {

}

