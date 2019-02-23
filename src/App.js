import React from "react";
import { Root } from "native-base";
import { ApplicationContextProvider } from "./AppContext";
import AppContainer from "./AppNavigator";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.navigator = null;
  }

  render() {
    return (
      <Root>
        <ApplicationContextProvider>
          <AppContainer />
        </ApplicationContextProvider>
      </Root>
    );
  }
}

export default App;
