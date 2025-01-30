import { Colors } from "./Colors";

const config: any = [
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
    name: 'jams',
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
    return config.map((item: any) => ({...defaults, ...item}));
  }
};

export default (new RouteConfig());
