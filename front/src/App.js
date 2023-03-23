import './App.css';
import React from 'react';
import Application from './appManegament/application';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  
  document.title = "Project";
  document.cookie = "flavor=choco; SameSite=None; Secure"
  document.cookie = "_gcl_au";
  document.cookie = "_gid";
  document.cookie = "_ga";
  document.cookie = "_ga_WQGX7PLP73";

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
      <Application />
    </div>
  </ThemeProvider>
  );
}





export default App;
