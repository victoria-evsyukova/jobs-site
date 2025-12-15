import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import './style.css';
import App from './app/App.tsx';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store/store.ts';

const store = setupStore()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
