import { Outlet } from 'react-router-dom';
import Header from '../widgets/header/Header';

export default function AppLayout() {
  return (
    <>
        <Header />
        <Outlet />
    </>
  );
}