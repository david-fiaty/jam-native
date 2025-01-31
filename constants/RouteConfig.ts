import { Colors } from "./Colors";
import { Config } from "./Config";

const mainRoute = () => {
  return Config.mainRoute.replace('/', '');
};

const routes: any = [
  {
    name: mainRoute(),
  },
  {
    name: 'index',
    showHeader: false,
    showFooter: false,
  },
  {
    name: 'login',
    showHeader: false,
    showFooter: false,
  },
  {
    name: 'signup',
    showHeader: false,
    showFooter: false,
  },
  {
    name: 'about',
    showHeader: true,
    showFooter: false,
    showHeaderSearch: false,
    showHeaderButtons: true,
  },
  {
    name: 'legal',
    showHeader: true,
    showFooter: false,
    showHeaderSearch: false,
    showHeaderButtons: true,
  },
  {
    name: 'account',
    showHeaderSearch: false,
  },
  {
    name: 'profile',
    animation: 'default',
    showHeaderSearch: false,
  },
  {
    name: 'password',
    showHeaderSearch: false,
  },
  {
    name: 'language',
    showHeaderSearch: false,
  },
  {
    name: 'notification',
    showHeaderSearch: false,
  },
  {
    name: 'jam',
  },
  {
    name: 'project',
  },
];

const defaults: any = { 
  statusBarStyle: 'dark',
  animation: 'fade',
  headerShown: false,
  statusBarBackgroundColor: Colors.white,
  headerTintColor: Colors.white,    
  headerStyle: {
    backgroundColor: Colors.white, 
  },
};

const navigation: any = {
  showHeader: true,
  showFooter: true,
  showHeaderButtons: true,
  showHeaderSearch: true,
};

class RouteConfig {
  getRoutes(segments?: any) {
    return routes.map((o: any) => {
      let options: any = { ...defaults, ...navigation, ...o };

      if (['login', 'signup', 'about', 'legal'].includes(o.name)) {
        o.animation = !segments?.length ? o.animation :'fade';
      }

      return options;
    });
  }

  isMainRoute(routeName: string) {
    return routeName == mainRoute();
  }

  getMainRoute() {
    return mainRoute();
  }
};

export default (new RouteConfig());
