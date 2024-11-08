import Store from '@/redux/Store';

class AppManager {
  flushCache() {
    let appState = Store.getState().app;
    if (appState.isStarted === false) {

    }

    appState.isStarted = true;
  }

  flushDataCache() {

  }

  flushImageCache() {

  }
};

export default (new AppManager());