import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard';
import Form from './scenes/forms/form';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { UserDataProvider } from './data/UserDataContext'; // Import the UserDataProvider

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
              </Routes>
            </main>
          </div>
        </UserDataProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
