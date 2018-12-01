import Home from 'views/pages/Home';
import BootstrapComponents from 'views/pages/BootstrapComponents';
import Redux from 'views/pages/Redux';
import Report from 'views/pages/Report';
import AdrSharing from 'views/pages/AdrSharing';
import Explorer from 'views/pages/Explorer';

export default [
  { path: "/", component: Home, type: 'public' },
  { path: "/bootstrap-components", component: BootstrapComponents, type: 'private' },
  { path: "/redux", component: Redux, type: 'private' },
  { path: "/report", component: Report, type: 'public' },
  { path: "/adr-sharing", component: AdrSharing, type: 'public' },
  { path: "/explorer", component: Explorer, type: 'public' }
];
