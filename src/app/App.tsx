import '@mantine/core/styles.css';
import './App.css';
import Page from '../pages/Page';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VacancyDetails from '../features/vacancyDetails/VacancyDetails';
import MainPage from '../pages/mainPage/MainPage';
import AppLayout from '../layout/AppLayout';

function App() {

  return (
    <MantineProvider>
      <BrowserRouter basename="/jobs-site">
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route path='/vacancies' element={
              <Page> 
                <MainPage />
              </Page>
              } />
            <Route path='/vacancies/:id' element={<VacancyDetails />} />
            <Route path="*" />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
