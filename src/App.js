import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from './layouts';

function App() {
  return (
    <div>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout =
            route.layout === null ? Fragment : route.layout ?? DefaultLayout;

          const Page = route.component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
