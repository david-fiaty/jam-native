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
    name: 'welcome',
    showHeader: false,
  },
  {
    name: 'login',
  },
  {
    name: 'signup',
  },
  {
    name: 'about',
    showHeaderSearch: false,
  },
  {
    name: 'legal',
    showHeaderSearch: false,
  },
  {
    name: 'account',
  },
  {
    name: 'profile',
  },
  {
    name: 'password',
  },
  {
    name: 'language',
  },
  {
    name: 'notification',
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
