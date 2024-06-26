import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import Routers from './router/Routers.tsx'
import '../src/css/warning.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <Routers />
    </Provider>
)
