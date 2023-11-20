import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard';
import Form from './scenes/forms/form'
import PatientInfo from './scenes/PatientInfo'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { UserDataProvider } from './data/UserDataContext'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

function App() {
  const [theme, colorMode] = useMode();
  const [setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserDataProvider>
          <div className="app">
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/form" element={<Form />} />
                <Route path="/patientInfo/:patientId" element={<PatientInfo />} />
              </Routes>
            </main>
          </div>
        </UserDataProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
