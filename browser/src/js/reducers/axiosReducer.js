import axios from 'axios'

export default function reducer (state = {
    axios: {
      request: axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 5000

      }),
      URLS: {
        // file Uploads 
        fileUpload: 'fileUpload',
        saveFile: 'fileUpload/save',
        mappings: 'mappings',
        addMapping: 'mappings/add',
        deleteMapping: 'mappings/delete',        
        updateMappingType: 'mappings/type',
        accounts: 'accounts',
        addAccount: 'accounts/add',
        ledger: 'ledger',
        yearMonth:'ledger/yearMonth',
        saveDescription: 'ledger/description',
        updateLedgerType: 'ledger/type',
        type: 'type',
        addType: 'type/addType',
        addSubType: 'type/addSubType'
      }
    }
  } , action) {
  return state
}
