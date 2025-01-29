import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import { ThemeProvider } from './context/ThemeContext';
import store from './redux/store.jsx'; 
import './styles/global.scss';
import App from './App/App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
