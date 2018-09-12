import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import Loadable from '../src'

function Error({ error, retry }) {
  return (
    <div>
      {error && <div onClick={retry}>error</div>}
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.string,
  retry: PropTypes.func,
}

Error.defaultProps = {
  error: '',
  retry: () => {},
}

const LoadableComponent = Loadable({
  loader: () => import('./Async'),
  loading: Error,
  doneCallback: () => { console.log('done') },
  timeout: 10000,
  errorCallback: () => { console.log('error') },
});

export default function App() {
  return (
    <div>
      <LoadableComponent />
    </div>
  )
}

render(<App />, document.getElementById('root'))
