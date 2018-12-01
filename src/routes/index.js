import Home from 'views/pages/Home';
import Report from 'views/pages/Report';
import ViewReport from 'views/pages/Report';
import AdrSharing from 'views/pages/AdrSharing';

export default [
  { path: "/", component: Home, type: 'public' },
  { path: "/report", component: Report, type: 'public' },
  { path: "/adr-sharing", component: AdrSharing, type: 'public' },
  { path: "/view-report", component: ViewReport, type: 'public' }
];
