import '@mantine/core/styles.css';
import './App.css';
import HomePage from '../pages/HomePage/HomePage';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VacancyDetails from '../features/vacancy/vacancyDetails/VacancyDetails';
import AppLayout from '../layouts/AppLayout';

function App() {

  return (
    <MantineProvider>
      <BrowserRouter basename="/jobs-site">
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Navigate to='//vacancies/moscow' replace />} />
            <Route path='vacancies/:city' element={<HomePage />} />
            <Route path='vacancy/:city/:id' element={<VacancyDetails />} />
            <Route path="*" />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
