import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export async function navigate(routeName: string, params?: object) {
  navigationRef.isReady();
  console.log("getting navigationRef");

  if (navigationRef.isReady()) {
    console.log("getting navigationRef isReady");

    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
}

export async function replace(routeName: string, params?: object) {
  navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(routeName, params));
  }
}

export async function resetAndNavigate(routeName: string) {
  navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      })
    );
  }
}

export async function goBack() {
  navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}

export async function push(routeName: string, params?: object) {
  navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  }
}

export async function prepareNavigation() {
  navigationRef.isReady();
}

/**
  navigate
    Replaces the current screen if it's already in the navigation stack.
    If navigating to the same screen with different parameters, it does not push a new instance; instead, it updates the existing one.
        navigation.navigate('Profile', { userId: 1 });
        navigation.navigate('Profile', { userId: 2 }); // Updates the existing Profile screen



push
    Always pushes a new instance of the screen onto the stack, even if it's the same screen.
    It allows multiple instances of the same screen in the stack.
        navigation.push('Profile', { userId: 1 });
        navigation.push('Profile', { userId: 2 }); // Creates a new Profile screen

 */
