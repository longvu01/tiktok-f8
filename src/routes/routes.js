import config from '~/config';
// Layouts
import { HeaderOnly } from '~/layouts';
// Pages
import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Upload from '~/pages/Upload';

const privateRoutes = [];

const publicRoutes = [
  { path: config.routes.root, component: Home },
  { path: config.routes.following, component: Following },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
  { path: config.routes.search, component: Search, layout: null },
];

export { publicRoutes, privateRoutes };
