import { BrowserRouter as Router } from 'react-router-dom';
import { FoodProvider } from './hooks/useFood';

import { Routes } from './routes';

import { GlobalStyle } from './styles/global';

function App(){
  
  return(  
  <FoodProvider>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </FoodProvider>
  );
}

export { App };
