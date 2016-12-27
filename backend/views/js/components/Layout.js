import React from 'react'
import { connect } from 'react-redux'
import { StickyContainer, Sticky } from 'react-sticky'

import { fetchUser } from 'js/actions/userActions'
import { updateHASH } from 'js/actions/navActions'
import { updateGraphWidth, updateGraphHeight } from 'js/actions/graphActions'


import HomePage from './HomePage'
import LowerHome from 'js/components/LowerHome'
import OverviewGraph from './HomePage/OverviewGraph'
import NavBar from 'js/components/HomePage/NavBar'

import baseStyles from 'styles/base.css'


@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    hash: store.nav.hash,
    axios: store.axios.axios,
    graph: store.graph
  }
})
export default class Layout extends React.Component {
  componentWillMount () {
    // this.props.dispatch(fetchUser())
  }

  onHashChange() {
    // Do something appropriate with `window.location.hash`
    this.props.dispatch(updateHASH(window.location.hash))
  }

  onWindowResize(e){
    const newGraphWidth = e.target.innerWidth * 0.65
    const graphWidth = this.props.graph.svgWidth
    if ( newGraphWidth > graphWidth + 10 || newGraphWidth < graphWidth - 10){
      this.props.dispatch(updateGraphWidth(newGraphWidth))
    }
  }
  onScroll(e){
    const {svgHeightMin, svgHeightMax, svgHeight } = this.props.graph
    const scroll = window.scrollY
    const newHeight = svgHeightMax - scroll * 2
    if (newHeight < svgHeightMax && newHeight > svgHeightMin && (newHeight>svgHeight+1 ||newHeight<svgHeight-1)){
      this.props.dispatch(updateGraphHeight(newHeight))
    }
    if(newHeight < svgHeightMin && svgHeight > svgHeightMin){
      this.props.dispatch(updateGraphHeight(svgHeightMin))
    }
  }

// Handle browser navigation events

  render () {
  // Event handler to catch hash changes for simple routing
  window.addEventListener('hashchange', this.onHashChange.bind(this), false);
  window.addEventListener('resize', this.onWindowResize.bind(this), false)
  // window.addEventListener('scroll', this.onScroll.bind(this), true)

  // Global error event handeler, gather errors and send the info to be logged on the server
  window.addEventListener('error', (e) =>{
    let stack = e.error.stack 
    let message = e.error.message
    let log = { 
      stack: stack,
      message: message
    }
    let { baseURL, logError } = this.props.axios.URLS
    let xhr = new XMLHttpRequest()
    xhr.open('POST', baseURL+logError)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.send(JSON.stringify(log)) 
  })



    return <div>
              <StickyContainer>
               <div className={'col s12 l12 '+ baseStyles.cf}>
                  <NavBar dispatch={this.props.dispatch} axios={this.props.axios} hash={this.props.hash}/> 
              </div>
              <div className="row">
                <div className='col s12 l3'></div>
                <div className='col s12 l9'>
                  <OverviewGraph />
                </div>               
              </div>
               
                <LowerHome />
              </StickyContainer>
           </div>
  }
}
                // <NavBar />
             // <FileUpload />
             // <Accounts />
             // <Mappings />
              // <Type /> 
            // <HomePage />
