import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../layout/layout';
import MainPage from '../../pages/main-page/main-page';
import AboutPage from '../../pages/about-page/about-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute } from '../../const';
import '../../sass/variables.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.About} element={<AboutPage />} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
