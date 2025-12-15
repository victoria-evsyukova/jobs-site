import '@mantine/core/styles.css';
import './App.css';
import Page from '../pages/Page';
import { MantineProvider } from '@mantine/core';


function App() {

  return (
    <MantineProvider>
      <Page />
    </MantineProvider>
  )
  
}

export default App
