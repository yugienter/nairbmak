import Home from 'views/pages/Home';
import KambriaComponents from 'views/pages/KambriaComponents';
import BootstrapComponents from 'views/pages/BootstrapComponents';
import Redux from 'views/pages/Redux';
import Report from 'views/pages/Report';

export default [
  { path: "/", component: Home, type: 'public' },
  { path: "/report", component: Report, type: 'public' }
];
