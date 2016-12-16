import React from 'react'

import NewMappingTypeDropDown from 'js/components/Type/NewMappingTypeDropDown'

import { 
  updateTestMappingText,
  getTestMappingData,
  updateNewMappingTextBox,
  saveNewMapping,
  updateNewMapToTextBox,
  getMappings,
  applyMappings
}  from 'js/actions/mappingsActions'

import {
  updateAddNewMappingType
} from 'js/actions/typeActions'


import { getGraphGroupedByType } from 'js/actions/graphActions'


import styles from 'styles/components/Mappings.css'
import baseStyles from 'styles/base.css'


export default class TestMappings extends React.Component {
  componentWillMount () {
    this.props.dispatch(getTestMappingData('', this.props.axios))

  }

  updateNewMapToText(e){
    const text = e.target.value
    this.props.dispatch(updateNewMapToTextBox(text))
  }
  saveNewMapping(e){
    console.log('BUTTON CLICKED ')
    const { addNewMappingText, addNewMapToText } = this.props.mappings
    const { selectedType, selectedSubType} = this.props.types.addNewMapping
    console.log(addNewMappingText, addNewMapToText)
    if ( addNewMappingText!='' && addNewMapToText!='' ) {
      this.props.dispatch(saveNewMapping(addNewMappingText, addNewMapToText, selectedType, selectedSubType, this.props.axios))
        .then((res)=>{            
            this.props.dispatch(updateAddNewMappingType('other', 'other'))
            this.props.dispatch(applyMappings(0, this.props.axios))
                .then((res)=>{
                  this.props.dispatch(getMappings(this.props.axios))
                  this.props.dispatch(getTestMappingData('', this.props.axios))
                  this.props.dispatch(getGraphGroupedByType(this.props.axios))
                })
          })
    }
  }

  updateTestMappingText(e){
    const text = e.target.value
    this.props.dispatch(updateNewMappingTextBox(text))
    this.props.dispatch(getTestMappingData(text, this.props.axios))
  }

  render () {

    const { 
            addNewMapToText,
            addNewMappingText,
            testMappingCollision,
            testMappingOverviewCount,
            testMappingRowHits
     } = this.props.mappings

     const testMappingCollisionCount = testMappingCollision.length

     const { DistinctDescriptions, TotalCount } = testMappingOverviewCount[0]

     const {...typesProps } = { 
                                types: this.props.types,
                                axios: this.props.axios
                              }

     const rowHitsTableBody = testMappingRowHits.map((row, key)=>{
        return <tr key={key}>
          <td className={baseStyles.tableRow + ' ' + styles.mappingCol} >{row.Description}</td>
          <td className={baseStyles.tableRow + ' ' + styles.mappingCol} >{row.Count}</td>
          <td className={baseStyles.tableRow + ' ' + styles.mappingCol} >{row.CountNotMapped}</td>
          <td className={baseStyles.tableRow + ' ' + styles.mappingCol} >{row.Sum}</td>
        </tr>

     })
    
    return (
      <div className='col s12 l12'>
        <div className="card">
              <p>Test new mapping: </p> 
              <div className={styles.addNewMappingDiv}>
                <div className="row">
                  <div className='col s6 l3'>
                    <input placeholder="Mapping" value={addNewMappingText} onChange={this.updateTestMappingText.bind(this)}/>     
                  </div>
                  <div className='col s6 l3'>
                    <input placeholder="Map To" value={addNewMapToText} onChange={this.updateNewMapToText.bind(this)} />
                  </div>
                  <div className='col s6 l3'>
                    <NewMappingTypeDropDown {...typesProps } dispatch={this.props.dispatch} />
                  </div>
                  <div className='col s2 l1'>
                    <a class="waves-effect waves-light btn" onClick={this.saveNewMapping.bind(this)}>Save</a>
                  </div>
                </div>
              </div>
              <p>
                Mapping Collisions: {testMappingCollisionCount}
                Distinct Description: {DistinctDescriptions}
                Total Count: {TotalCount}
              </p> 

              <table className='striped'>
                <tr>
                  <th className={baseStyles.white}>Description</th>
                  <th className={baseStyles.white}>Count</th>
                  <th className={baseStyles.white}>Count Not Mapped</th>
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

