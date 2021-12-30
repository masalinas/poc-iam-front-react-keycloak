import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// App views
const Products = React.lazy(() => import('./views/products/ProductsView'))

const loading = (
  <div>Loading...</div>
)

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={loading}>
          <Switch>
            <Route exact path="/" name="Products" component={Products} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
