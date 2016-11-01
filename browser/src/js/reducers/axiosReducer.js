import axios from 'axios'

export default function reducer (state = {
    axios: {
      request: axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 5000

      }),
      URLS: {
        baseURL: 'http://localhost:3000/',
        // file Uploads 
        fileUpload: 'fileUpload',
        saveFile: 'fileUpload/save',
        // Mappings 
        mappings: 'mappings',
        addMapping: 'mappings/add',
        deleteMapping: 'mappings/delete',        
        updateMappingType: 'mappings/type',
        // Account
        accounts: 'accounts',
        addAccount: 'accounts/add',
        // Ledger 
        ledger: 'ledger',
        yearMonth:'ledger/yearMonth',
        saveDescription: 'ledger/description',
        updateLedgerType: 'ledger/type',
        updateLedgerSplit: 'ledger/split',
        // Type 
        type: 'type',
        addType: 'type/addType',
        addSubType: 'type/addSubType',
        ceaseType: 'type/ceaseType',
        ceaseSubType: 'type/ceaseSubType',
        // Graph 
        graphType: 'graph/type',
        graphSubType: 'graph/subType',
        // Log
        logError: 'log/browserError'
      }
    }
  } , action) {
  return state
}
