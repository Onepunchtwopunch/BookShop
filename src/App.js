import React from 'react';
import Routes from './Routes';
import StoreContextProvider from './contexts/StoreContext';
import AuthContextProvider from './contexts/AuthContext'

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ConfirmProvider } from 'material-ui-confirm';

toast.configure();

const defaultConfirmOptions = {
  title: 'Вы уверены?',
  confirmationText: 'Да',
  cancellationText: 'Отмена',
};

function App() {
  return (
    <ConfirmProvider defaultOptions={defaultConfirmOptions}>
      <StoreContextProvider>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </StoreContextProvider>
    </ConfirmProvider>
  );
}

export default App;
