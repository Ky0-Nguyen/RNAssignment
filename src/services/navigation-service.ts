import {get} from 'lodash';
import {
  NavigationState,
  PartialState,
  StackActions,
} from '@react-navigation/native';
class NavigationServices {
  navigator?: any;
  currentScreen = '';

  setTopLevelNavigator = (navigatorRef: any): void => {
    this.navigator = navigatorRef;
  };

  pushToScreen = (routeName: string, params?: any): void => {
    if (this.navigator && this.navigator.dispatch) {
      this.navigator.navigate(routeName, params);
    }
  };

  replace = (routeName: string, params?: any): void => {
    if (this.navigator && this.navigator.dispatch) {
      this.navigator.dispatch(StackActions.replace(routeName, params));
    }
  };

  back = (): void => {
    if (this.navigator && this.navigator.canGoBack()) {
      this.navigator.goBack();
    }
  };

  popToTop = (): void => {
    const popToTopAction = StackActions.popToTop();
    this.navigator.dispatch(popToTopAction);
  };

  getActiveRouteName(
    navigationState: NavigationState | PartialState<NavigationState>,
  ): string {
    const route = navigationState.routes[navigationState.index || 0];
    if (route.state) {
      return this.getActiveRouteName(route.state);
    }
    return get(route, 'name');
  }

  handleNavigationStateChange(state?: NavigationState): void {
    if (!state) {
      return;
    }

    const currentScreen = this.getActiveRouteName(state);
    this.currentScreen = currentScreen;
  }

  getNavigationParams = (props: any, key: string, defaultValue?: any): any => {
    const route = get(props, 'route');
    try {
      if (route) {
        const param = route.params[key];
        if (param) {
          return param;
        }
        return defaultValue;
      } else {
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  };
}
const navigationServices = new NavigationServices();
export {navigationServices};
