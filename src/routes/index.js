import Home from 'views/pages/Home';
import KambriaComponents from 'views/pages/KambriaComponents';
import BootstrapComponents from 'views/pages/BootstrapComponents';
import Redux from 'views/pages/Redux';
import Report from 'views/pages/Report';
import AdrSharing from 'views/pages/AdrSharing';

export default [
  { path: "/", component: Home, type: 'public' },
  { path: "/kambria-components", component: KambriaComponents, type: 'private' },
  { path: "/bootstrap-components", component: BootstrapComponents, type: 'private' },
  { path: "/redux", component: Redux, type: 'private' },
  { path: "/report", component: Report, type: 'public' },
  { path: "/adr-sharing", component: AdrSharing, type: 'public' }
];
