import { Colors } from "./Colors";
import { Config } from "./Config";

const config: any = [
  {
    name: Config.mainRoute.replace('/', ''),
  },
  {
    name: 'index',
  },
  {
    name: 'welcome',
  },
  {
    name: 'login',
  },
  {
    name: 'signup',
  },
  {
    name: 'about',
  },
  {
    name: 'legal',
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

class RouteConfig {
  build(segments?: any) {
    return config.map((o: any) => {
      let options: any = { ...defaults, ...o };

      if (['login', 'signup', 'about', 'legal'].includes(o.name)) {
        o.animation = !segments?.length ? o.animation :'fade';
      }

      return options;
    });
  }
};

export default (new RouteConfig());
