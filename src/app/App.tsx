import '@mantine/core/styles.css';
import './App.css';
import HomePage from '../pages/HomePage/HomePage';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VacancyDetails from '../features/vacancy/vacancyDetails/VacancyDetails';
import AppLayout from '../layouts/AppLayout';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ErrorPage from '../pages/ErrorPage';

function App() {

  return (
    <MantineProvider>
      <BrowserRouter basename="/jobs-site">
        <Routes>
          <Route path='/' element={<AppLayout />} errorElement={<ErrorPage />}>
            <Route index element={<Navigate to='/vacancies/moscow' replace />} />
            <Route path='vacancies/:city' element={<HomePage />} />
            <Route path='vacancies/:city/:id' element={<VacancyDetails />} />
            <Route path="*" element={<NotFoundPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
