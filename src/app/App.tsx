import '@mantine/core/styles.css';
import './App.css';
import HomePage from '../pages/HomePage/HomePage';
import { MantineProvider } from '@mantine/core';
import { Routes, Route, Navigate, BrowserRouter, HashRouter } from 'react-router-dom';
import VacancyDetails from '../features/vacancy/vacancyDetails/VacancyDetails';
import AppLayout from '../layouts/AppLayout';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ErrorPage from '../pages/ErrorPage';
import AboutPage from '../pages/AboutPage';

function App() {

  return (
    <MantineProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<AppLayout />} errorElement={<ErrorPage />}>
            <Route index element={<Navigate to='/vacancies/moscow' replace />} />
            <Route path='vacancies/:city' element={<HomePage />} />
            <Route path='vacancies/:city/:id' element={<VacancyDetails />} />
            <Route path='about' element={<AboutPage />}/>
            <Route path="*" element={<NotFoundPage />}/>
          </Route>
        </Routes>
      </HashRouter>
    </MantineProvider>
  )
}

export default App
