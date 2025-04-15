import { Colors } from "./Colors";
import { Config } from "./Config";
import { Platform } from 'react-native';

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
    isRoot: true,
  },
  {
    name: 'login',
    showHeader: false,
    showFooter: false,
    isRoot: true,
  },
  {
    name: 'signup',
    showHeader: false,
    showFooter: false,
    isRoot: true,
  },
  {
    name: 'about',
    showHeader: true,
    showFooter: false,
    showHeaderSearch: false,
    showHeaderButtons: true,
    isRoot: true,
  },
  {
    name: 'legal',
    showHeader: true,
    showFooter: false,
    showHeaderSearch: false,
    showHeaderButtons: true,
    isRoot: true,
    animation: 'default',
  },
  {
    name: 'account',
    showHeaderSearch: false,
    animation: 'default',
  },
  {
    name: 'profile',
    animation: 'default',
    showHeaderSearch: false,
  },
  {
    name: 'password',
    showHeaderSearch: false,
    animation: 'default',
  },
  {
    name: 'language',
    showHeaderSearch: false,
    animation: 'default',
  },
  {
    name: 'notification',
    showHeaderSearch: false,
    animation: 'default',
  },
  {
    name: 'jam',
    animation: 'default',
  },
  {
    name: 'project',
    animation: 'default',
  },
];

const defaults: any = Platform.OS == 'ios' ? {
  headerShown: false,
} : { 
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
  isRoot: false,
};

class RouteConfig {
  getRoute(routeName: string) {
    return routes.find((o: any) => o.name === routeName);
  }

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
