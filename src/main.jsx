import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './components/app/store.jsx'
import Loading from './components/templates/Loading.jsx'

import React, { Suspense } from 'react';
const App = React.lazy(() => import('./App')); 

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
)
