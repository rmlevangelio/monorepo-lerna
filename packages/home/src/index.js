import React from 'react'
import { render } from 'react-dom'
import Loadable from 'react-loadable'

const loading = () => <h1>Loading...</h1>

const Browser = Loadable({
  loader: () => import(/* webpackChunkName: "browser" */ './Browser'),
  loading
});

// Normal async app ( "ramda": "0.20.0" )
const App0 = Loadable({
  loader: () => import(/* webpackChunkName: 'app0' */ 'app0/lib'),
  loading
})

// Normal async app ( "ramda": "0.16.0" --> global root )
const App1 = Loadable({
  loader: () => import(/* webpackChunkName: 'app1' */ 'app1/lib'),
  loading
})

// NPM async app ( "ramda": "0.25.0" )
const App2Npm = Loadable({
  loader: () => import(/* webpackChunkName: 'app2-npm' */ '@nzbiegien/app2-npm'),
  loading
})

// NPM async app ( "ramda": "0.20.0" )
const App3Npm = Loadable({
  loader: () => import(/* webpackChunkName: 'app3-npm' */ '@nzbiegien/app3-npm'),
  loading
})

// NPM async app ( "ramda": "0.16.0" --> same version defined local and global )
const App4Npm = Loadable({
  loader: () => import(/* webpackChunkName: 'app4-npm' */ '@nzbiegien/app4-npm'),
  loading
})

const appsMap = {
  'app0': App0,
  'app1': App1,
  'app2-npm': App2Npm,
  'app3-npm': App3Npm,
  'app4-npm': App4Npm,
}

const appsList = Object.entries(appsMap)

function extractNodeProps(node) {
  let props;
  try {
    props = JSON.parse(node.innerText)
  } catch (e) {
    props = {}
  }
  node.innerText = ''
  node.style.display = ''
  return props
}

function runProduction(componentsList) {
  for (const [id, Component] of componentsList) {
    const rootNode = document.querySelector(`[data-react-app="${id}"]`)
    if (!rootNode) continue
    const props = extractNodeProps(rootNode)
    render(<Component {...props} />, rootNode)
  }
}

function runDevelopment(appsList) {
  const rootNode = document.createElement('div')
  document.body.appendChild(rootNode)
  render(<Browser appsList={appsList} />, rootNode)
}

const run =
  process.env.NODE_ENV === 'production'
    ? runProduction
    : runDevelopment;

run(appsList)
