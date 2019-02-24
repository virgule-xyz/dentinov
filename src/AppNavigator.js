import React from "react";

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import { Sign, Dashboard, Editor, Resume } from "@screens";

const DashboardStack = createStackNavigator(
  { Dashboard, Editor, Resume },
  {
    initialRouteName: "Resume",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const SignNavigator = createSwitchNavigator(
  { Sign, DashboardStack },
  {
    initialRouteName: "DashboardStack",
    navigationOptions: {
      header: null
    }
  }
);

const AppContainer = createAppContainer(SignNavigator);

export default AppContainer;
