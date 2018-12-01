import Home from 'views/pages/Home';
import Report from 'views/pages/Report';
import ViewReport from 'views/pages/ViewReport';
import AdrSharing from 'views/pages/AdrSharing';
import Explorer from 'views/pages/Explorer';

export default [
  { path: "/", component: Home, type: 'public' },
  { path: "/report", component: Report, type: 'public' },
  { path: "/adr-sharing", component: AdrSharing, type: 'public' },
  { path: "/explorer", component: Explorer, type: 'public' },
  { path: "/view-report", component: ViewReport, type: 'public' },
  { path: "/share", component: AdrSharing, type: 'public' }
];
