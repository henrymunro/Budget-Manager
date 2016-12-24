import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Login from 'js/components/Login'
import store from './loginStore'

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
                  <Login />
                </Provider>, app)
