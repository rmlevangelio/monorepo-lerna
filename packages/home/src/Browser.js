import React, { Fragment } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './browser.css';

const prefix = '/monorepo'  //github-pages

export default function Browser({ appsList }) {
  return (
    <Router>
      <Fragment>
        <nav>
          {appsList.map(([id], idx) =>
            <Link to={`${prefix}/${id}`} key={idx}>{id}</Link>
          )}
        </nav>
        <div>
          {appsList.map(([id, Component], idx) =>
            <Route path={`${prefix}/${id}`} key={idx} component={Component} />
          )}
        </div>
      </Fragment>
    </Router>
  )
}
